import { randomUUID } from 'crypto';
import { ProjectInterface } from '../../../core/entity/Project/Project';
import RepositoryInterface from '../../../core/repository/RepositoryInterface';
import connection from '../../database/connection';

export default class ProjectRepositorySQL implements RepositoryInterface<ProjectInterface>{
    
    async index(criteria: any): Promise<ProjectInterface[]> {
        try{
            return await connection.query(`SELECT id, name FROM projects WHERE user_id = $1`, [criteria.user_id])
        }catch(err: any){
            throw err
        }
    }

    async show(id: string): Promise<ProjectInterface> {
        try{
            const [project] = await connection.query(`SELECT * FROM projects WHERE id = $1`, [id]);
            const tasks =  await connection.query(`SELECT * FROM tasks WHERE project_id = $1 ORDER BY created_at DESC`, [project.id]);
            return {
                ...project,
                tasks,
            }
        }catch(err: any){
            throw err
        }
    }

    async save(data: ProjectInterface): Promise<ProjectInterface> {
        try{
            data.id = randomUUID();
            const {id, name, user_id} = data;  
            return await connection.one(
                "INSERT INTO projects (id, name, user_id) VALUES ($1, $2, $3) RETURNING *",
                [id, name, user_id]
            )
        }catch(err: any){
            throw err
        }
    }

    async update(data: ProjectInterface, id: string): Promise<any> {
        try{
            const {name} = data;  
            return await connection.one(
                "UPDATE projects SET name=$2 WHERE id=$1 RETURNING *",
                [id, name]
            )
        }catch(err: any){
            throw err
        }
    }

    async destroy(id: string): Promise<void> {
        try{
            await connection.none("DELETE FROM projects WHERE id = $1", [id])
        }catch(err: any){
            throw err
        }
    }  

}