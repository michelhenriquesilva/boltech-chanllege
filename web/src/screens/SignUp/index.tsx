
import { useState } from 'react';
import { useAuth } from '../../contexts/auth.context';
import Logo from '../../assets/images/boltech.png';
import api from '../../services/api.service';
import './styles.css';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import Alert from '../../components/Alert';

export default function SignUp() {    

    const schema = yup.object({
        name: yup.string().required('Campo obrigatório'),
        email: yup.string().required('Campo obrigatório'),
        password: yup.string().required('Campo obrigatório'),
        confirm_password: yup.string().required('Campo obrigatório'),
    });

    const { handleSubmit, control } = useForm({
        resolver: yupResolver(schema)
    });

    const { doLogin } = useAuth();
    const [errors, setErrors] = useState<string[]>([])
    const [success, setSuccess] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    const signUp = async (data: any) => {
        try{

            setErrors([])

            if(data?.password !== data?.confirm_password){
                setErrors(['Senha e confirme senha, devem ser iguais'])
            }

            setLoading(true)
            await api.post('signup', data);

            setSuccess('Conta criada com sucesso. Redirecionando...')
            setTimeout(() => {
                doLogin({email: data.email, password: data.password})    
            }, 3000)
            
        }catch(err: any){
            setErrors(err?.response?.data?.errors || [err.message])
        }finally{
            setLoading(false)
        }
    }    

    return (
        <div className="signup-container">
            <div className="signup-content">
                <img src={Logo} alt="Boltech logo"/>
                <h1>Criar conta</h1>
                <form onSubmit={handleSubmit(signUp)}>
                    <Controller
                        control={control}
                        name="name"
                        render={({ field, fieldState: { error } }) => (
                            <>
                                <input
                                    placeholder="Digite seu nome"
                                    className="form-control"
                                    {...field}
                                />
                                {error && (<span className="alert-error">{error.message}</span>)}
                            </>
                        )}
                    /> 
                    <Controller
                        control={control}
                        name="email"
                        render={({ field, fieldState: { error } }) => (
                            <>
                                <input
                                    placeholder="Digite seu email"
                                    className="form-control"
                                    {...field}
                                />
                                {error && (<span className="alert-error">{error.message}</span>)}
                            </>
                        )}
                    /> 
                    <Controller
                        control={control}
                        name="password"
                        render={({ field, fieldState: { error } }) => (
                            <>
                                <input
                                    type="password"
                                    placeholder="Digite sua senha"
                                    className="form-control"
                                    {...field}
                                />
                                {error && (<span className="alert-error">{error.message}</span>)}
                            </>
                        )}
                    />
                    <Controller
                        control={control}
                        name="confirm_password"
                        render={({ field, fieldState: { error } }) => (
                            <>
                                <input
                                    type="password"
                                    placeholder="Repita sua senha"
                                    className="form-control"
                                    {...field}
                                />
                                {error && (<span className="alert-error">{error.message}</span>)}
                            </>
                        )}
                    />
                    <button style={{marginTop: 12, width: '100%'}} type="submit" className="button" disabled={loading}>
                        Enviar
                    </button>
                </form> 
                {(errors || []).map((error: string) => <Alert type="error" message={error} />)}
                {success && <Alert type="success" message={success} />}
                <p className="signup-text">Já tem uma conta? <Link to="/signin">Faça login</Link></p>
            </div>
        </div>
    );
}
