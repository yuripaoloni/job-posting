import { rest, DefaultRequestBody, PathParams } from "msw";
import { LoginRes } from "../typings/auth.type";

export const handlers = [
  rest.post<DefaultRequestBody, PathParams, LoginRes>(
    "/api/auth/login",
    (req, res, ctx) =>
      res(
        ctx.status(200),
        ctx.json({ message: "Accesso Effettuato", tipoUtenteId: 1 })
      )
  ),
  rest.get("/api/auth/logout", (req, res, ctx) => res(ctx.status(200))),
  rest.get("/api/auth/validate", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        message: "Accesso Effettuato",
        tipoUtenteId: 1,
        username: "mario.rossi",
      })
    );
  }),
];
