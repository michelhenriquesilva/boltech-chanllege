
import { useCallback, useEffect, useState } from "react";
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import EmptyList from "../../components/EmptyList";
import Header from "../../components/Header";
import api from "../../services/api.service";
import './styles.css';

export function Projects(){

    const schema = yup.object({
        name: yup.string().required('Campo obrigatório')
    });

    const { handleSubmit, control } = useForm({
        resolver: yupResolver(schema)
    });

    const [projectList, setProjectList] = useState([])
    const [loading, setLoading] = useState<boolean>(false)
    
    const getData = useCallback( async () => {        
        try{
            setLoading(true)
            const { data } = await api.get('projects')
            setProjectList(data)
        }catch(err: any){
            alert(err.message)
        }finally{
            setLoading(false)
        }
    }, [])

    const create = async (data: any) => {
        try{
            setLoading(true)
            await api.post('projects', data)
            getData()
        }catch(err: any){
            alert(err.message)
        }finally{
            setLoading(false)
        }
    }
    
    const remove = useCallback(async (id: string) => {
        try{
            await api.delete(`projects/${id}`)            
            alert("Registro excluido com sucesso")
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
            <Header title="Projetos"/>
            <div className="form-container">
                <form onSubmit={handleSubmit(create)}>
                    <Controller
                        control={control}
                        name="name"
                        render={({ field, fieldState: { error } }) => (
                            <div style={{width: '87%'}}>
                                <input
                                    placeholder="Nome do projeto"
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
                <table className="project-table">
                    <thead>
                        <th style={{width: '70%'}}>Nome</th>
                        <th style={{width: '30%', textAlign: 'center'}}>Ações</th>
                    </thead>
                    <tbody>
                        {projectList.map( (project: any) => (
                            <tr key={project.id}>
                                <td>{project.name}</td>
                                <td style={{textAlign: 'center'}}>
                                    <button className="button button-small">
                                        <Link to={`projects/${project.id}`}>Detalhes</Link>
                                    </button>
                                    <button type="button" onClick={() => remove(project.id)} className="button button-small danger">Excluir</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>                
                {!projectList.length && <EmptyList />}
            </div>
        </div>
    )
}