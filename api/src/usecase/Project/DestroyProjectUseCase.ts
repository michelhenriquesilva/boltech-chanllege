import Either, { left, right } from "../../core/Either"
import { ProjectInterface } from "../../core/entity/Project/Project"
import { AppError } from "../../core/errors/AppError"
import RepositoryInterface from "../../core/repository/RepositoryInterface"
import Result from "../../core/Result"

type Response = Either<AppError.NotFound, Result<void>>

export default class DestroyProjectUseCase{

    repository: RepositoryInterface<ProjectInterface>

    constructor(repository: RepositoryInterface<ProjectInterface>){
        this.repository = repository
    }

    async execute(id: string): Promise<Response> {
        try{
            await this.repository.destroy(id)
            return right(Result.ok())
        }catch(err: any){
            return left(AppError.UnexpectedError.create(err.message))
        }
    }
}