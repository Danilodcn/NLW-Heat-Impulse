import { Request } from "express";

interface IRequestWithUserID extends Request {
  user_id: string;
}

export { IRequestWithUserID };
