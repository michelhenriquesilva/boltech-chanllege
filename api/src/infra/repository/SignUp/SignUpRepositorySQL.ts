import { randomUUID } from "crypto";
import SignUpRepositoryInterface from "../../../core/repository/SignUp/SignUpRepositoryInterface";
import connection from "../../database/connection";

export default class SignUpRepositorySQL implements SignUpRepositoryInterface{

    constructor() { }

    async execute(data: any): Promise<void> {
        try{
            data.id = randomUUID();
            const {id, name, email, password} = data
            return await connection.one(
                "INSERT INTO users (id, name, email, password) VALUES ($1, $2, $3, $4) RETURNING id, name, email",
                [id, name, email, password]
            )
        }catch(err: any){
            throw err
        }
    }

}
