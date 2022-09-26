import TaskRepositorySQL from "../../src/infra/repository/Task/TaskRepositorySQL";
import IndexTaskUseCase from "../../src/usecase/Task/IndexTaskUseCase";



describe('Index Task Use Case', () => {

    const TaskList = [
        {
            id: 'f877e44f-d4e1-490b-b2e8-5899c8b240e0', 
            name: 'Task Name 001',
            project_id: 'a51964c5-b377-4c8c-9957-6a10fdcf23d1'
        },
        {
            id: 'f877e44f-d4e1-490b-b2e8-5899c8b240e0', 
            name: 'Task Name 002',
            project_id: 'a51964c5-b377-4c8c-9957-6a10fdcf23d1'
        }
    ]

    test('should return an array list of Tasks search by user', async () => {
    
        const repository = new TaskRepositorySQL();
        repository.index = jest.fn( async () => {
            return TaskList
        });

        const service = new IndexTaskUseCase(repository)
        const result = await service.execute();
        const response = result.value.getValue()
        expect(result.value.isSuccess).toBe(true)
        expect(response).toMatchObject(TaskList)
    })

})