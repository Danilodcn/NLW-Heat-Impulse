import { Request, Response } from "express";
import { GetLast3MessagesService } from "../services/GetLast3MessagesService";

import { IRequestWithUserID } from "../@types/express";

class GetLast3MessageController {
  async handle(request: IRequestWithUserID, response: Response) {
    const result = await new GetLast3MessagesService().execute();

    return response.status(200).json(result);
  }
}

export { GetLast3MessageController };
