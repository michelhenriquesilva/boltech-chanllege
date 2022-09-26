import Either, { left, right } from "../../core/Either"
import { ProjectInterface } from "../../core/entity/Project/Project"
import { AppError } from "../../core/errors/AppError"
import RepositoryInterface from "../../core/repository/RepositoryInterface"
import Result from "../../core/Result"

type Response =  Either<AppError.NotFound | AppError.UnprocessableEntity, Result<ProjectInterface>>

export default class SaveProjectUseCase{

    repository: RepositoryInterface<ProjectInterface> 

    constructor(repository: RepositoryInterface<ProjectInterface>){
        this.repository = repository
    }

    async execute(data: ProjectInterface): Promise<Response> {
        try{

            const validateErrors: string[] = [];

            if(!data.user_id){
                validateErrors.push('Não foi possível identificar o usuário') 
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