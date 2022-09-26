import Either, { left, right } from "../../core/Either"
import { UserInterface } from "../../core/entity/User/User"
import { AppError } from "../../core/errors/AppError"
import { EncriptPasswordProvider } from "../../core/provider/EncriptPasswordProvider"
import SignUpRepositoryInterface from "../../core/repository/SignUp/SignUpRepositoryInterface"
import Result from "../../core/Result"
import UserRepositoryTypeOrm from "../../infra/repository/User/UserRepositorySQL"
import FindByEmailUserUseCase from "../User/FindByEmailUserUseCase"
import FindByUserUseCase from "../User/FindByEmailUserUseCase"

type Response =  Either<AppError.NotFound | AppError.UnprocessableEntity, Result<UserInterface>>

export default class SignUpUseCase{

    repository: SignUpRepositoryInterface 
    encriptPasswordProvider: EncriptPasswordProvider

    constructor(repository: SignUpRepositoryInterface, encriptPasswordProvider: EncriptPasswordProvider){
        this.repository = repository
        this.encriptPasswordProvider = encriptPasswordProvider
    }

    async execute(data: any): Promise<Response> {
        try{

            const validateErrors: string[] = []  

            if(!data?.name)
                validateErrors.push('O campo Nome é obrigatório')             
    
            if(!data?.email)
                validateErrors.push('O campo email é obrigatório')           
    
            if(!data?.password)
                validateErrors.push('O campo senha é obrigatório')             
    
            if(validateErrors.length){
                return left(AppError.BadRequest.create(validateErrors))
            }
    
            const findUser = new FindByEmailUserUseCase(new UserRepositoryTypeOrm())
            const hasUser = await findUser.execute(data.email)
            
            if(hasUser.isRight()){
                return left(AppError.BadRequest.create([`O email "${data.email}" já está em uso.`]))
            }
            
            const passwordEncripted = await this.encriptPasswordProvider.execute(data.password)
            data.password = passwordEncripted;
            
            const row = await this.repository.execute(data)
            return right(Result.ok(row))

        }catch(err: any){
            return left(AppError.UnexpectedError.create(err.message))
        }
    }

}