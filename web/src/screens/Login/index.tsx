import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import Logo from '../../assets/images/boltech.png';
import Alert from '../../components/Alert';
import { useAuth } from '../../contexts/auth.context';
import './styles.css';

export default function Login() {

    const schema = yup.object({
        email: yup.string().required('Campo obrigatório'),
        password: yup.string().required('Campo obrigatório'),
    });

    const { handleSubmit, control } = useForm({
        resolver: yupResolver(schema)
    });

    const { doLogin } = useAuth();

    const [errors, setErrors] = useState<string[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    const login = async (data: any) => {
        try{
            setErrors([])
            setLoading(true)
            await doLogin(data)
        }catch(err: any){
            setErrors(err?.response?.data?.errors || [err.message])
        }finally{
            setLoading(false)
        }
    }

    return (
        <div className="login-container">
            <div className="login-content">
                <img src={Logo} alt="Boltech logo"/>
                <h1>Login</h1>
                <form onSubmit={handleSubmit(login)}>
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
                    <button style={{marginTop: 12, width: '100%'}} type="submit" disabled={loading} className="button">
                        {loading ? 'Aguarde...' : 'Entrar'}
                    </button>
                </form>
                {(errors || []).map((error: string) => <Alert key={error} type="error" message={error} />)}
                <p className="signup-text">Não tem uma conta? <Link to="/signup">Cadastre-se</Link></p>
            </div>
        </div>
    );
}
