import * as bcrypt from 'bcrypt'

export default class EncriptPasswordProviderBycript{
    async compare(plainPassword: string, passwordDataBase: string): Promise<boolean> {        
        try{
            const isValid = await bcrypt.compare(plainPassword, passwordDataBase)
            return Boolean(isValid)
        }catch(err: any){
            throw err
        }
    }
    async execute(plainPassword: string): Promise<string> {
        try{
            return await bcrypt.hash(plainPassword, 10)
        }catch(err: any){
            throw err
        }
    }
}