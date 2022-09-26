import { NextFunction, Request, Response } from "express"
import * as jwt from 'jsonwebtoken'

async function JWTMiddleware(request: Request | any, response: Response, next: NextFunction){
    
    if(!request.headers.authorization){
        response.status(401).json({errors: ['Token de acesso não está presente']})
        return
    }

    const [, authorizationHeader] = request.headers.authorization.split(' ')

    jwt.verify(authorizationHeader, `${process.env.JWT_PRIVATE_KEY}`, (error: any, data: any) => {
        if(error){
            response.status(401).json({errors: ['Credenciais inválidas']})
            return
        }
        
        request.user = data.user
        request.token = authorizationHeader
        next()
    })
}

export default JWTMiddleware