export interface EncriptPasswordProvider{
    execute(plainPassword: string): Promise<string>
    compare(plainPassword: string, passwordDataBase: string): Promise<boolean>
}