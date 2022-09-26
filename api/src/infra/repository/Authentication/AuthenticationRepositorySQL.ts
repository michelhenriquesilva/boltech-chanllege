import { UserInterface } from "../../../core/entity/User/User";
import AuthenticationRepository from "../../../core/repository/Authentication/AuthenticationRepositoryInterface";
import connection from "../../database/connection";

export default class AuthenticatioRepositorySQL implements AuthenticationRepository{

    async findByEmail(email: string): Promise<UserInterface>{
        try{
           const [ row ] = await connection.query(`SELECT * FROM users WHERE email = $1`, [email]);
           return row;
        }catch(err: any){
            throw err
        }
    }   
}