
export default interface RepositoryInterface<T> {
    index(criteria?: any): Promise<T[]>
    show(id: string): Promise<T>
    save(data: T): Promise<T>
    update(data: T, id: string): Promise<T>
    destroy(id: string): Promise<void>
}