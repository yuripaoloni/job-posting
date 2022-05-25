import { UserType } from "../typings/utente.type";

export const isUserType = (x: any): x is UserType => [0, 1, 2].includes(x);
