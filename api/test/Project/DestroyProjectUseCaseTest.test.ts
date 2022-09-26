import AuthenticationRepositorySQL from "../../src/infra/repository/Authentication/AuthenticationRepositorySQL";
import ProjectRepositorySQL from "../../src/infra/repository/Project/ProjectRepositorySQL";
import AuthenticationUseCase from "../../src/usecase/Authentication/AuthenticationUseCase";
import DestroyProjectUseCase from "../../src/usecase/Project/DestroyProjectUseCase";


describe('Destroy Project Use Case', () => {

    test('should return operation successfully on deleting project', async () => {
    
        const repository = new ProjectRepositorySQL();
        repository.destroy = jest.fn( async () => undefined);

        const service = new DestroyProjectUseCase(repository)
        const result = await service.execute('');
        expect(result.value.isSuccess).toBe(true)
    })

})