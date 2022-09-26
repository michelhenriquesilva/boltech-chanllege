import Either, { left, right } from "../../core/Either"
import { UserInterface } from "../../core/entity/User/User"
import { AppError } from "../../core/errors/AppError"
import RepositoryInterface from "../../core/repository/RepositoryInterface"
import Result from "../../core/Result"
import UserRepositoryTypeOrm from "../../infra/repository/User/UserRepositorySQL"
import FindByUserUseCase from "./FindByEmailUserUseCase"

type Response =  Either<AppError.NotFound | AppError.UnprocessableEntity, Result<UserInterface>>

export default class SaveUserUseCase{

    repository: RepositoryInterface<UserInterface> 

    constructor(repository: RepositoryInterface<UserInterface>){
        this.repository = repository
    }

    async execute(data: UserInterface): Promise<Response> {
        try{

            const validateErrors: string[] = [];
            
            if(validateErrors.length){
                return left(AppError.BadRequest.create(validateErrors))
            }
    
            const findUser = new FindByUserUseCase(new UserRepositoryTypeOrm())
            const hasUser = await findUser.execute(data.email)        
            if(hasUser.isRight()){
                return left(AppError.BadRequest.create([`Já existe um usuário cadastrado com "${data.email}"`]))
            }

            const row = await this.repository.save(data)
            delete row.password
            return right(Result.ok(row))
        }catch(err: any){
            return left(AppError.UnexpectedError.create(err.message))
        }
    }

}