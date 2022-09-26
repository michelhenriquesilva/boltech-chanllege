import Either, { left, right } from "../../core/Either"
import { UserInterface } from "../../core/entity/User/User"
import { AppError } from "../../core/errors/AppError"
import UserRepositoryInterface from "../../core/repository/User/UserRepositoryInterface"
import Result from "../../core/Result"

type Response =  Either<AppError.NotFound, Result<UserInterface>>

export default class FindByEmailUserUseCase{

    repository: UserRepositoryInterface<UserInterface>

    constructor(repository: UserRepositoryInterface<UserInterface>){
        this.repository = repository
    }

    async execute(email: string): Promise<Response> {
        try{
            const row = await this.repository.findOneByEmail(email)
            if(!row?.id){
                return left(AppError.NotFound.create())    
            }
            return right(Result.ok(row))
        }catch(err: any){
            return left(AppError.UnexpectedError.create(err.message))
        }
    }
}