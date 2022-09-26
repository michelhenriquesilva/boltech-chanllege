import TaskRepositorySQL from "../../src/infra/repository/Task/TaskRepositorySQL";
import DestroyTaskUseCase from "../../src/usecase/Task/DestroyTaskUseCase";


describe('Destroy Task Use Case', () => {

    test('should return operation successfully on deleting task', async () => {
    
        const repository = new TaskRepositorySQL();
        repository.destroy = jest.fn( async () => undefined);

        const service = new DestroyTaskUseCase(repository)
        const result = await service.execute('');
        expect(result.value.isSuccess).toBe(true)
    })

})