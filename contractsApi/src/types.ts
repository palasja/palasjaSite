import { JwtPayload, VerifyErrors } from "jsonwebtoken";

export interface UserType extends JwtPayload {
  login: string;
  password: string;
}
export type JwtDecoded = string | JwtPayload | undefined;
export type JwtError = VerifyErrors | null;