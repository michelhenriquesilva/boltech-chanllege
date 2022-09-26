import { HttpStatusCode } from "../infra/http/HttpStatusCode"
import AuthenticationProviderJWT from "../infra/jwt/AuthenticationProviderJWT"
import EncriptPasswordProviderBycript from "../infra/provider/EncriptPasswordProviderBycript"
import AuthenticatioRepositorySQL from "../infra/repository/Authentication/AuthenticationRepositorySQL"
import AuthenticationUseCase from "../usecase/Authentication/AuthenticationUseCase"

export default class AuthenticationController {
    static async signin(request: any, body: any) {

        const useCase = new AuthenticationUseCase(
            new AuthenticatioRepositorySQL(), 
            new AuthenticationProviderJWT(),
            new EncriptPasswordProviderBycript()
        )
        const result = await useCase.execute(body)
        const data = result.value.getValue()

        if(result.isRight()){
            return { 
                statusCode: HttpStatusCode.OK, 
                response: data
            }
        }else{
            return { 
                statusCode: data.status, 
                response: {
                    errors: data.message
                }
            }
        }
    }
}