import Either, { left, right } from "../../core/Either"
import { AppError } from "../../core/errors/AppError"
import Result from "../../core/Result"
import AuthenticationProvider from "../../core/provider/AuthenticationProvider"
import { EncriptPasswordProvider } from "../../core/provider/EncriptPasswordProvider"
import AuthenticationResponse from "../../core/entity/Authentication/AuthenticationResponse"
import AuthenticationCredentials from "../../core/entity/Authentication/AuthenticationCredentials"
import AuthenticationRepository from "../../core/repository/Authentication/AuthenticationRepositoryInterface"

type Response =  Either<AppError.BadRequest | AppError.NotFound | AppError.Unauthorized, 
Result<AuthenticationResponse>>

export default class AuthenticationUseCase{

    repository: AuthenticationRepository
    authenticationProvider: AuthenticationProvider
    encriptPasswordProvider: EncriptPasswordProvider

    constructor(
        repository: AuthenticationRepository,
        AuthenticationProvider: AuthenticationProvider,
        EncriptPasswordProvider: EncriptPasswordProvider
    ){
        this.repository = repository
        this.authenticationProvider = AuthenticationProvider
        this.encriptPasswordProvider = EncriptPasswordProvider
    }

    async execute(credentials: AuthenticationCredentials): Promise<Response>{
        try{

            const validateErrors = []

            if(!credentials.email)
                validateErrors.push('O campo email é obrigatório') 
    
            if(!credentials.password)
                validateErrors.push('O campo senha é obrigatório')                           
                
            if(validateErrors.length){
                return left(AppError.BadRequest.create(validateErrors))
            }

            const user = await this.repository.findByEmail(credentials.email)
            
            if(!user){
                return left(AppError.Unauthorized.create())
            }

            const isValid = await this.encriptPasswordProvider.compare(credentials.password, user.password)

            if(!isValid){
                return left(AppError.Unauthorized.create())
            }

            const {id, name, email} = user
            const accessToken = await this.authenticationProvider.accessTokenGenerate({
                id, 
                name,   
                email
            })
            return right(Result.ok(accessToken))

        }catch(err: any){
            return left(AppError.Unauthorized.create())
        }
    }
}