import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { CredentialProps } from '../types/CredentialsProps';
import api from '../services/api.service';

export type AuthContextUserProps = {
    name: string;
    email: string;
}

export type AuthContextProps = {
    signed: boolean;
    user: AuthContextUserProps | null;
    doLogin(values: CredentialProps): Promise<void>;    
    doLogout(): void;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider: React.FC = ({children}) => {

    const [user, setUser] = useState<AuthContextUserProps>({} as AuthContextUserProps);
    
    const getDataStoraged = useCallback(() => {
        const storagedUser = localStorage.getItem('@BoltechChanllege:user')
        const storagedToken = localStorage.getItem('@BoltechChanllege:token')

        if(storagedUser && storagedToken){
            setUser(JSON.parse(storagedUser))
        }
    }, [])

    async function doLogin(credentials: CredentialProps){
        try{
            const { data } = await api.post('signin', credentials);
            setUser(data.user)
            localStorage.setItem('@BoltechChanllege:user', JSON.stringify(data.user))
            localStorage.setItem('@BoltechChanllege:token', data.access_token)
            window.location.href = '/'
        }catch(err: any){
            throw Error(err.message)
        }        
    }

    async function doLogout() {
        localStorage.removeItem('@BoltechChanllege:token')
        localStorage.removeItem('@BoltechChanllege:user')
        setUser({} as AuthContextUserProps)
    }
    
    useEffect( () => {
        getDataStoraged()
    }, [getDataStoraged])

    return(
        <AuthContext.Provider value={{signed: Boolean(user.name), user, doLogin, doLogout}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth(){
    const context = useContext(AuthContext);
    return context;
}