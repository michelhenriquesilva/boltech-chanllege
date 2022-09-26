
import { UserInterface } from "../core/entity/User/User"
import AuthenticationProviderJWT from "../infra/jwt/AuthenticationProviderJWT"

export default class GetUserDataFromJwt {
    static async execute(headers: any): Promise<UserInterface>{          
        try{

            if(!headers?.authorization){
                throw new Error('Autentication header missing')
            }

            const [ , token ] = headers.authorization.split('Bearer ')
            const authProvider = new AuthenticationProviderJWT()
            const { username, sub } = await authProvider.extractToken(token)
            return {
                id: sub,
                email: username
            };
        }catch(err){
            throw err
        }        
    }
}