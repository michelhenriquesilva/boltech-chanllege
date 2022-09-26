import Either, { left, right } from "../../core/Either"
import { ProjectInterface } from "../../core/entity/Project/Project"
import { AppError } from "../../core/errors/AppError"
import RepositoryInterface from "../../core/repository/RepositoryInterface"
import Result from "../../core/Result"

type Response =  Either<AppError.NotFound, Result<ProjectInterface>>

export default class UpdateProjectUseCase{

    repository: RepositoryInterface<ProjectInterface>

    constructor(repository: RepositoryInterface<ProjectInterface>){
        this.repository = repository
    }

    async execute(data: ProjectInterface, id: string): Promise<Response> {
        try{
            const row = await this.repository.update(data, id)
            return right(Result.ok(row))
        }catch(err: any){
            return left(AppError.UnexpectedError.create(err.message))
        }
    }
}