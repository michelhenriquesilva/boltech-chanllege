import RepositoryInterface from "../RepositoryInterface"

export default interface UserRepositoryInterface<T> extends RepositoryInterface<T> {    
    findOneByEmail(email: string): Promise<T>
}