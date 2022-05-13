export interface DataStoredInToken {
  cf: string;
  username: string;
  tipoUtenteId: number;
}

export interface TokenData {
  token: string;
  expiresIn: number;
}
