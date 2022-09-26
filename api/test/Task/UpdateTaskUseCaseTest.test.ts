import TaskRepositorySQL from "../../src/infra/repository/Task/TaskRepositorySQL";
import UpdateTaskUseCase from "../../src/usecase/Task/UpdateTaskUseCase";

describe('Save Task Use Case', () => {

    const Task = {
        id: 'f877e44f-d4e1-490b-b2e8-5899c8b240e0', 
        name: 'Task Name',
        user_id: 'a51964c5-b377-4c8c-9957-6a10fdcf23d1'
    }

    test('should return success for operation update Task', async () => {
    
        const repository = new TaskRepositorySQL();
        repository.update = jest.fn( async () => {
            return Task
        });

        const service = new UpdateTaskUseCase(repository)
        const result = await service.execute({ name: 'Task Name'}, 'f877e44f-d4e1-490b-b2e8-5899c8b240e0');
        const response = result.value.getValue()
        expect(result.value.isSuccess).toBe(true)
        expect(response).toMatchObject(Task)
    })

})