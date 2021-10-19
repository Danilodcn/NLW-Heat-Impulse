import { Request, Response } from "express";

import { IRequestWithUserID } from "../@types/express";
import { ProfileUserService } from "../services/ProfileUserService";

class ProfileUserController {
  async handle(request: IRequestWithUserID, response: Response) {
    const { user_id } = request;
    const result = await new ProfileUserService().execute(user_id);
    return response.status(200).json(result);
  }
}

export { ProfileUserController };
