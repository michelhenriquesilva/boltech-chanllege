import { HttpStatusCode } from "../../infra/http/HttpStatusCode"
import Result from "../Result"

export namespace AppError {

    export class UnexpectedError extends Result<any> {
      constructor (message?: string) {
        super(false, {
          status: HttpStatusCode.INTERNAL_SERVER_ERROR,
          message: [message] || ['Ocorreu um erro inesperado']
        })
      }
  
      static create (message?: string): UnexpectedError {
        return new UnexpectedError(message)
      }
    }

    export class NotFound extends Result<any> {
      constructor(){
        super(false, {
          message: ['Registro não encontrado'],
          status: HttpStatusCode.NOT_FOUND
        })
      }

      static create(): NotFound {
          return new NotFound()
      }
    }

    export class UnprocessableEntity extends Result<any> {
      constructor(messages?: string[]){
          super(false, {
              message: messages || ['Não foi possível processar os dados enviados'],
              status: HttpStatusCode.UNPROCESSABLE_ENTITY
          })
      }

      static create(messages?: string[]): UnprocessableEntity {
          return new UnprocessableEntity(messages)
      }
    }

    export class BadRequest extends Result<any> {
      constructor(messages?: string[]){
          super(false, {
              message: messages || ['A requsição contém erros e não pôde ser processada'],
              status: HttpStatusCode.BAD_REQUEST
          })
      }

      static create(messages?: string[]): BadRequest {
          return new BadRequest(messages)
      }
    }

    export class Unauthorized extends Result<any> {
      constructor(){
          super(false, {
              message: ['Acesso não autorizado'],
              status: HttpStatusCode.UNAUTHORIZED
          })
      }

      static create(): Unauthorized {
          return new Unauthorized()
      }
    }
  }