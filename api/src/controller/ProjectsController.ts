import { HttpStatusCode } from "../infra/http/HttpStatusCode"
import ProjectRepositorySQL from "../infra/repository/Project/ProjectRepositorySQL"
import DestroyProjectUseCase from "../usecase/Project/DestroyProjectUseCase"
import IndexProjectUseCase from "../usecase/Project/IndexProjectUseCase"
import SaveProjectUseCase from "../usecase/Project/SaveProjectUseCase"
import ShowProjectUseCase from "../usecase/Project/ShowProjectUseCase"
import UpdateProjectUseCase from "../usecase/Project/UpdateProjectUseCase"
import GetUserDataFromJwt from "../utils/GetUserDataFromJwt"

export default class ProjectController {
    static async index(request: any, body: any) {

        const user = await GetUserDataFromJwt.execute(request.headers)

        const useCase = new IndexProjectUseCase(new ProjectRepositorySQL())
        const result = await useCase.execute({ user_id: user.id })
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
        const useCase = new ShowProjectUseCase(new ProjectRepositorySQL())
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
        body.user_id = user?.id

        const useCase = new SaveProjectUseCase(new ProjectRepositorySQL())
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

        const useCase = new UpdateProjectUseCase(new ProjectRepositorySQL())
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
        const useCase = new DestroyProjectUseCase(new ProjectRepositorySQL())
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