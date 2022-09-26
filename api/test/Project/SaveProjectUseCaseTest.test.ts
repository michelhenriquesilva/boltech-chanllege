import ProjectRepositorySQL from "../../src/infra/repository/Project/ProjectRepositorySQL";
import SaveProjectUseCase from "../../src/usecase/Project/SaveProjectUseCase";

describe('Save Project Use Case', () => {

    const project = {
        id: 'f877e44f-d4e1-490b-b2e8-5899c8b240e0', 
        name: 'Project Name 001',
        user_id: 'a51964c5-b377-4c8c-9957-6a10fdcf23d1'
    }

    test('should return success for operation save project', async () => {
    
        const repository = new ProjectRepositorySQL();
        repository.save = jest.fn( async () => {
            return project
        });

        const service = new SaveProjectUseCase(repository)
        const result = await service.execute(project);
        const response = result.value.getValue()
        expect(result.value.isSuccess).toBe(true)
        expect(response).toMatchObject(project)
    })

})