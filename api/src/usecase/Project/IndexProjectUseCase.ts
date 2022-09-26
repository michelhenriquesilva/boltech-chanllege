import Either, { left, right } from "../../core/Either"
import { ProjectInterface } from "../../core/entity/Project/Project"
import { AppError } from "../../core/errors/AppError"
import RepositoryInterface from "../../core/repository/RepositoryInterface"
import Result from "../../core/Result"

type Response =  Either<AppError.NotFound, Result<ProjectInterface[]>>

export default class IndexProjectUseCase{

    repository: RepositoryInterface<ProjectInterface>

    constructor(repository: RepositoryInterface<ProjectInterface>){
        this.repository = repository
    }

    async execute(criteria: any): Promise<Response> {
        try{
            const data = await this.repository.index(criteria)                
            return right(Result.ok(data))
        }catch(err: any){
            return left(AppError.UnexpectedError.create(err.message))
        }
    }
}