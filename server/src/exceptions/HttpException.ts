export class HttpException extends Error {
  public status: number;
  public customMessage: string;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.customMessage = message;
  }
}
