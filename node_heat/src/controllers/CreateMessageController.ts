import { Request, Response } from "express";
import { CreateMessageService } from "../services/CreateMessageService";

import { IRequestWithUserID } from "../@types/express";


class CreateMessageController {
  async handle(request: IRequestWithUserID, response: Response) {
    const message: string = request.body.message;
    const user_id = request.user_id;
    const service = new CreateMessageService();
    const result = await service.execute(message, user_id);
    // console.log(message)

    return response.status(201).json(result);
  }
}

export { CreateMessageController };
