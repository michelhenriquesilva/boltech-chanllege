import JWT, { JwtPayload } from 'jsonwebtoken'
import { left } from "../../core/Either"
import AuthenticationResponse from '../../core/entity/Authentication/AuthenticationResponse'
import { UserAuthPayload } from '../../core/entity/Authentication/UserAuthPayload'
import { AppError } from '../../core/errors/AppError'
import AuthenticationProvider from "../../core/provider/AuthenticationProvider"

export default class AuthenticationProviderJWT implements AuthenticationProvider{

    async accessTokenGenerate(user: UserAuthPayload): Promise<AuthenticationResponse>{
        return new Promise((resolve, reject) => {
            try{
                
                const payload = { username: user.email, sub: user.id };
                const token = JWT.sign(payload, `${process.env.JWT_PRIVATE_KEY}`, {
                    expiresIn: '2h',                    
                })

                const response: AuthenticationResponse = {
                    access_token: token,
                    user,
                    expire_at: Math.floor(Date.now() / 1000) + (60 * 60 * 2)
                }
                resolve(response)

            }catch(err: any){
                reject(left(AppError.Unauthorized.create))
            }
        })
    }

    async extractToken(token: string): Promise<JwtPayload>{
        return new Promise((resolve, reject) => {
            try{
                const decoded = JWT.decode(token)
                resolve(decoded as JwtPayload)
            }catch(err: any){
                reject(left(AppError.Unauthorized.create))
            }
        })
    }
    
}