import AuthenticationResponse from "../entity/Authentication/AuthenticationResponse";
import { UserInterface } from "../entity/User/User";

export default interface AuthenticationProvider {
    accessTokenGenerate(user: UserInterface): Promise<AuthenticationResponse>
    extractToken(token: string): Promise<any>
}