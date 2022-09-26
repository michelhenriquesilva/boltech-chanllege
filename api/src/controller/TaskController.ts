import { HttpStatusCode } from "../infra/http/HttpStatusCode"
import TaskRepositorySQL from "../infra/repository/Task/TaskRepositorySQL"
import DestroyTaskUseCase from "../usecase/Task/DestroyTaskUseCase"
import IndexTaskUseCase from "../usecase/Task/IndexTaskUseCase"
import SaveTaskUseCase from "../usecase/Task/SaveTaskUseCase"
import ShowTaskUseCase from "../usecase/Task/ShowTaskUseCase"
import UpdateTaskUseCase from "../usecase/Task/UpdateTaskUseCase"

export default class TaskController {
    static async index(request: any, body: any) {

        const useCase = new IndexTaskUseCase(new TaskRepositorySQL())
        const result = await useCase.execute()
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
        const useCase = new ShowTaskUseCase(new TaskRepositorySQL())
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

        const useCase = new SaveTaskUseCase(new TaskRepositorySQL())
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

        const useCase = new UpdateTaskUseCase(new TaskRepositorySQL())
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
        const useCase = new DestroyTaskUseCase(new TaskRepositorySQL())
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