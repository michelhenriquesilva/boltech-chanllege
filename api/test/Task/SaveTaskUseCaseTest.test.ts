import TaskRepositorySQL from "../../src/infra/repository/Task/TaskRepositorySQL";
import SaveTaskUseCase from "../../src/usecase/Task/SaveTaskUseCase";

describe('Save Task Use Case', () => {

    const Task = {
        id: 'f877e44f-d4e1-490b-b2e8-5899c8b240e0', 
        name: 'Task Name 001',
        project_id: 'a51964c5-b377-4c8c-9957-6a10fdcf23d1'
    }

    test('should return success for operation save Task', async () => {
    
        const repository = new TaskRepositorySQL();
        repository.save = jest.fn( async () => {
            return Task
        });

        const service = new SaveTaskUseCase(repository)
        const result = await service.execute(Task);
        const response = result.value.getValue()
        expect(result.value.isSuccess).toBe(true)
        expect(response).toMatchObject(Task)
    })

})