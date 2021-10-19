import "dotenv/config";
import express, { request, response } from "express";
import { Request, Response } from "express";
import http from "http";
import { Server } from "socket.io"

import { router } from "./routes";

const app = express();

app.use(express.json())

app.use(router);

app.get("/github", (request: Request, response: Response) => {
  const client_id = process.env.GITHUB_CLIENT_ID;
  response.redirect(
    `https://github.com/login/oauth/authorize?client_id=${client_id}`
  );
});

app.get("/signin/callback", (request, response) => {
  const { code } = request.query;
  response.json(code);
});

app.listen(4000, () => console.log("Server running on the port 4000"));
