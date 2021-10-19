import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface Ipayload {
  sub: string;
}
interface IRequestWithUserID extends Request {
  user_id: string;
}

export function ensureAuthenticated(
  request: IRequestWithUserID,
  response: Response,
  next: NextFunction
) {
  const authToken = request.headers.authorization;
  // console.log(authToken);

  if (!authToken) {
    return response.status(401).json({ error: "token no exists" });
  }

  const [, token] = authToken.split(" ");
  try {
    const { sub } = verify(token, process.env.JWT_SECRET_KEY) as Ipayload;
    request.user_id = sub;
    return next();
  } catch (error) {
    response.status(401).json({ error: "token expired or not invalid" });
  }
}
