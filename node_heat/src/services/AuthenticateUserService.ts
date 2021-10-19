import axios from "axios";
import prismaClient from "../prisma";
import { sign } from "jsonwebtoken";

/**
 * Receber code
 * Recuperar o acess_token no github
 * verificar de o usuário existe
 * ------SIM = gera o token,
 * ------NAO = cria no DB, gera um token
 * Retorna o token com as informações do usuário
 */

interface IAcessTokenResponse {
  access_token: string;
}

interface IUserResponse {
  avatar_url: string;
  login: string;
  id: number;
  name: string;
}

class AuthenticateUserService {
  async execute(code: string) {
    const url = "https://github.com/login/oauth/access_token";
    const { data: accessTokenResponse } = await axios.post<IAcessTokenResponse>(
      url,
      null,
      {
        params: {
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code,
        },
        headers: {
          Accept: "application/json",
        },
      }
    );
    // console.log(accessTokenResponse);

    const response = await axios.get<IUserResponse>(
      "https://api.github.com/user",
      {
        headers: {
          authorization: `Bearer ${accessTokenResponse.access_token}`,
        },
      }
    );

    const { login, id, name, avatar_url } = response.data;

    let user = await prismaClient.user.findFirst({
      where: {
        gitgub_id: id,
      },
    });

    if (!user) {
      user = await prismaClient.user.create({
        data: {
          gitgub_id: id,
          name,
          login,
          avatar_url,
        },
      });
    }
    const token = sign(
      {
        user: {
          name: user.name,
          avatar_url: user.avatar_url,
          id: user.id,
        },
      },
      process.env.JWT_SECRET_KEY,
      {
        subject: user.id,
        expiresIn: "1d",
      }
    );
    return {token, user};
    // return data.access_token;
  }
}

export { AuthenticateUserService };
