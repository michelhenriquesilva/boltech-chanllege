import Either, { left, right } from "../../core/Either"
import { TaskInterface } from "../../core/entity/Task/Task"
import { AppError } from "../../core/errors/AppError"
import RepositoryInterface from "../../core/repository/RepositoryInterface"
import Result from "../../core/Result"

type Response =  Either<AppError.NotFound, Result<TaskInterface>>

export default class IndexTaskUseCase{

    repository: RepositoryInterface<TaskInterface>

    constructor(repository: RepositoryInterface<TaskInterface>){
        this.repository = repository
    }

    async execute(id: string): Promise<Response> {
        try{
            const row = await this.repository.show(id)
            return right(Result.ok(row))
        }catch(err: any){
            return left(AppError.UnexpectedError.create(err.message))
        }
    }
}