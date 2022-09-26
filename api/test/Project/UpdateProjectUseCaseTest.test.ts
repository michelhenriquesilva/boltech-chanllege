import ProjectRepositorySQL from "../../src/infra/repository/Project/ProjectRepositorySQL";
import UpdateProjectUseCase from "../../src/usecase/Project/UpdateProjectUseCase";

describe('Save Project Use Case', () => {

    const project = {
        id: 'f877e44f-d4e1-490b-b2e8-5899c8b240e0', 
        name: 'Project Name',
        user_id: 'a51964c5-b377-4c8c-9957-6a10fdcf23d1'
    }

    test('should return success for operation update project', async () => {
    
        const repository = new ProjectRepositorySQL();
        repository.update = jest.fn( async () => {
            return project
        });

        const service = new UpdateProjectUseCase(repository)
        const result = await service.execute({ name: 'Project Name'}, 'f877e44f-d4e1-490b-b2e8-5899c8b240e0');
        const response = result.value.getValue()
        expect(result.value.isSuccess).toBe(true)
        expect(response).toMatchObject(project)
    })

})