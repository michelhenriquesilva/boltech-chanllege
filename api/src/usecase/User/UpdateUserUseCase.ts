import Either, { left, right } from "../../core/Either"
import { UserInterface } from "../../core/entity/User/User"
import { AppError } from "../../core/errors/AppError"
import RepositoryInterface from "../../core/repository/RepositoryInterface"
import Result from "../../core/Result"

type Response =  Either<AppError.NotFound, Result<UserInterface>>

export default class UpdateUserUseCase{

    repository: RepositoryInterface<UserInterface>

    constructor(repository: RepositoryInterface<UserInterface>){
        this.repository = repository
    }

    async execute(data: UserInterface, id: string): Promise<Response> {
        try{
            const row = await this.repository.update(data, id)
            return right(Result.ok(row))
        }catch(err: any){
            return left(AppError.UnexpectedError.create(err.message))
        }
    }
}