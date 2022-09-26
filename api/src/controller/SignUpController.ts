import { HttpStatusCode } from "../infra/http/HttpStatusCode"
import EncriptPasswordProviderBycript from "../infra/provider/EncriptPasswordProviderBycript"
import SignUpRepositorySQL from "../infra/repository/SignUp/SignUpRepositorySQL"
import SignUpUseCase from "../usecase/SignUp/SignUpUseCase"

export default class SignUpController {
    
    static async execute(request: any, body: any) {        

        const useCase = new SignUpUseCase(new SignUpRepositorySQL(), new EncriptPasswordProviderBycript())
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