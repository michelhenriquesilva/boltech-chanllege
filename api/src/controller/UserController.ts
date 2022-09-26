import { HttpStatusCode } from "../infra/http/HttpStatusCode"
import UserRepositorySQL from "../infra/repository/User/UserRepositorySQL"
import DestroyUserUseCase from "../usecase/User/DestroyUserUseCase"
import IndexUserUseCase from "../usecase/User/IndexUserUseCase"
import SaveUserUseCase from "../usecase/User/SaveUserUseCase"
import ShowUserUseCase from "../usecase/User/ShowUserUseCase"
import UpdateUserUseCase from "../usecase/User/UpdateUserUseCase"
import GetUserDataFromJwt from "../utils/GetUserDataFromJwt"

export default class UserController {
    static async index(request: any, body: any) {

        const useCase = new IndexUserUseCase(new UserRepositorySQL())
        const result = await useCase.execute(request.query)
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

    static async show(request: any, body: any){
        const useCase = new ShowUserUseCase(new UserRepositorySQL())
        const result = await useCase.execute(request.params.id)
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

    static async save(request: any, body: any){

        const user = await GetUserDataFromJwt.execute(request.headers)

        const useCase = new SaveUserUseCase(new UserRepositorySQL())
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

    static async update(request: any, body: any){

        const useCase = new UpdateUserUseCase(new UserRepositorySQL())
        const result = await useCase.execute(body, request.params.id)
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

    static async destroy(request: any, body: any){
        const useCase = new DestroyUserUseCase(new UserRepositorySQL())
        const result = await useCase.execute(request.params?.id)
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