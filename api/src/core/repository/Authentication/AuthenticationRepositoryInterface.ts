import { UserInterface } from "../../entity/User/User";

export default interface AuthenticationRepositoryInterface {
    findByEmail(email: string): Promise<UserInterface>
}