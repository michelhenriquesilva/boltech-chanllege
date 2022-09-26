import { randomUUID } from 'crypto';
import { TaskInterface } from '../../../core/entity/Task/Task';
import RepositoryInterface from '../../../core/repository/RepositoryInterface';
import connection from '../../database/connection';

export default class TaskRepositorySQL implements RepositoryInterface<TaskInterface>{
    
    async index(): Promise<TaskInterface[]> {
        try{
            return await connection.query(`SELECT id, name, email FROM tasks`)
        }catch(err: any){
            throw err
        }
    }

    async show(id: string): Promise<TaskInterface> {
        try{
            const [task] =  await connection.query(`SELECT * FROM tasks WHERE id = $1`, [id]);
            const [project] = await connection.query(`SELECT * FROM projects WHERE id = $1`, [task.project_id]);
            return {
                ...task,
                project,
            }
        }catch(err: any){
            throw err
        }
    }

    async save(data: TaskInterface): Promise<TaskInterface> {
        try{        
            data.id = randomUUID();
            const {id, name, project_id} = data;  
            return await connection.one(
                "INSERT INTO tasks (id, name, created_at, project_id) VALUES ($1, $2, NOW(), $3) RETURNING *",
                [id, name, project_id]
            )
        }catch(err: any){
            throw err
        }
    }

    async update(data: TaskInterface, id: string): Promise<any> {
        try{            
            const [row]: TaskInterface[] = await connection.query("SELECT * FROM tasks WHERE id=$1", [id])
            const { name, finished_at } = { ...row, ...data }
            return await connection.one(
                "UPDATE tasks SET name=$2, finished_at=$3 WHERE id=$1 RETURNING *",
                [id, name, finished_at]
            )
        }catch(err: any){
            throw err
        }
    }

    async destroy(id: string): Promise<void> {
        try{
            await connection.none("DELETE FROM tasks WHERE id = $1", [id])
        }catch(err: any){
            throw err
        }
    }  

}