import { UserType } from "./utente.type";

export type LoginRes = {
  tipoUtenteId: UserType;
  message: string;
  username?: string;
};
