import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from 'react-hook-form';
import { useParams } from "react-router-dom";
import * as yup from 'yup';
import EmptyList from "../../components/EmptyList";
import Header from "../../components/Header";
import api from "../../services/api.service";
import { formatDateToUs } from "../../utils/masks";

import moment from "moment";
import './styles.css';

export function ProjectDetails(){

    const { id } = useParams<any>()

    const [project, setProject] = useState<any>()
    const [loading, setLoading] = useState<boolean>(false)

    const schema = yup.object({
        name: yup.string().required('Obrigatório')
    });

    const { handleSubmit, control } = useForm({
        resolver: yupResolver(schema)
    })
    
    const getData = useCallback( async () => {        
        try{
            setLoading(true)
            const { data } = await api.get(`projects/${id}`)
            setProject(data)
        }catch(err: any){
            alert(err.message)
        }finally{
            setLoading(false)
        }
    }, [])

    const handlerOnCreate = async ( data: any ) => {
        try{
            data.finished_at = formatDateToUs(data.finished_at)
            setLoading(true)
            await api.post('tasks', { project_id: id, ...data})
            getData()
        }catch(err: any){
            alert(err.message)
        }finally{
            setLoading(false)
        }
    }
    
    const remove = useCallback(async (id: string) => {
        try{
            await api.delete(`tasks/${id}`)            
            alert("Registro excluido com sucesso")
            getData()
        }catch(err: any){
            alert(err.message)
        }
    }, [getData]) 
    
    const finalizeTask = useCallback(async (id: string) => {
        try{
            await api.put(`tasks/${id}`, { finished_at: moment().format('YYYY-MM-DD')})            
            alert("Registro atualizado com sucesso")
            getData()
        }catch(err: any){
            alert(err.message)
        }
    }, [getData]) 


    useEffect(() => {         
        getData()
    }, [getData])

    return(
        <div>
            <Header title="Detalhes do projeto" goBack={true}/>
            <div className="form-container">
                <form onSubmit={handleSubmit(handlerOnCreate)}>                    
                    <Controller
                        control={control}
                        name="name"
                        render={({ field, fieldState: { error } }) => (
                            <div style={{width: '87%'}}>
                                <input
                                    placeholder="Nome da tarefa"
                                    className="form-control"
                                    {...field}
                                />                                    
                                {error && (<span className="alert-error">{error.message}</span>)}
                            </div>
                        )}
                    />                   
                    <button type="submit" disabled={loading} className="button" style={{marginTop: 12}}>
                        {loading ? 'Aguarde...' : 'Criar'}
                    </button>
                </form> 
                
                <h3>Minhas tarefas</h3>
                <table className="project-table">
                    <thead>
                        <th style={{width: '45%'}}>Nome</th>
                        <th style={{width: '15%'}}>Criado em</th>
                        <th style={{width: '15%'}}>Status</th>
                        <th style={{width: '30%', textAlign: 'center'}}>Ações</th>
                    </thead>
                    <tbody>
                        {(project?.tasks || []).map( (task: any) => (
                            <tr className={task.finished_at ? 'line-through' : ''}>
                                <td>{task.name}</td>
                                <td>{moment(task.created_at).format('DD/MM/YYYY')}</td>
                                <td>{task?.finished_at ? `Finalizada ${moment(task.finished_at).format('DD/MM/YYYY')}` : 'Pendente'}</td>
                                <td style={{textAlign: 'center'}}>
                                    <button type="button" onClick={() => finalizeTask(task.id)} disabled={task.finished_at} className="button button-small">Finalizar</button>
                                    <button type="button" onClick={() => remove(task.id)} disabled={task.finished_at} className="button button-small danger">Excluir</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>                
                {!project?.tasks.length && <EmptyList />}
            </div>
        </div>
    )
}