import Either, { left, right } from "../../core/Either"
import { TaskInterface } from "../../core/entity/Task/Task"
import { AppError } from "../../core/errors/AppError"
import RepositoryInterface from "../../core/repository/RepositoryInterface"
import Result from "../../core/Result"

type Response =  Either<AppError.NotFound | AppError.UnprocessableEntity, Result<TaskInterface>>

export default class SaveTaskUseCase{

    repository: RepositoryInterface<TaskInterface> 

    constructor(repository: RepositoryInterface<TaskInterface>){
        this.repository = repository
    }

    async execute(data: TaskInterface): Promise<Response> {
        try{

            const validateErrors: string[] = [];

            if(!data.name){
                validateErrors.push('O nome da task é obrigatório')
            }

            if(!data.project_id){
                validateErrors.push('Não foi possível identificar o projeto vinculado')
            }
            
            if(validateErrors.length){
                return left(AppError.BadRequest.create(validateErrors))
            }
    
            const row = await this.repository.save(data)
            return right(Result.ok(row))
        }catch(err: any){
            return left(AppError.UnexpectedError.create(err.message))
        }
    }

}