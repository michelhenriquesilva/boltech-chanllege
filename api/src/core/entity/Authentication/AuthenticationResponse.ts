import { UserAuthPayload } from "./UserAuthPayload"

export default interface AuthenticationResponse{
    access_token: string
    user: UserAuthPayload
    expire_at: number
}