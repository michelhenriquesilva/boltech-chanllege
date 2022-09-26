import { randomUUID } from 'crypto';
import { UserInterface } from '../../../core/entity/User/User';
import RepositoryInterface from '../../../core/repository/RepositoryInterface';
import connection from '../../database/connection';

export default class UserRepositorySQL implements RepositoryInterface<UserInterface>{
    
    async index(): Promise<UserInterface[]> {
        try{
            return await connection.query(`SELECT id, name, email FROM users`)
        }catch(err: any){
            throw err
        }
    }

    async show(id: string): Promise<UserInterface> {
        try{
            const [row] = await connection.query(`SELECT id, name, email FROM users WHERE id = $1`, [id]);
            return row
        }catch(err: any){
            throw err
        }
    }

    async findOneByEmail(email: string): Promise<UserInterface>{
        try{
            const [row] =  await connection.query(`SELECT id, name, email FROM users WHERE email = $1`, [email]);
            return row
        }catch(err: any){
            throw err
        }
    }

    async save(data: UserInterface): Promise<UserInterface> {
        try{        
            data.id = randomUUID();
            const {id, name, email, password} = data;  
            return await connection.one(
                "INSERT INTO users (id, name, email, password) VALUES ($1, $2, $3, $4) RETURNING id, name, email",
                [id, name, email, password]
            )
        }catch(err: any){
            throw err
        }
    }

    async update(data: UserInterface, id: string): Promise<any> {
        try{
            data.id = randomUUID();
            const {id, name, email, password} = data;  
            return await connection.one(
                "UPDATE users SET name=$2, email=$3, password=$4 WHERE id=$1 RETURNING id, name, email",
                [id, name, email, password]
            )
        }catch(err: any){
            throw err
        }
    }

    async destroy(id: string): Promise<void> {
        try{
            await connection.none("DELETE FROM users WHERE id = $1", [id])
        }catch(err: any){
            throw err
        }
    }  

}