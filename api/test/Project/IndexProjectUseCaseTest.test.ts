import ProjectRepositorySQL from "../../src/infra/repository/Project/ProjectRepositorySQL";
import IndexProjectUseCase from "../../src/usecase/Project/IndexProjectUseCase";

describe('Index Project Use Case', () => {

    const projectList = [
        {
            id: 'f877e44f-d4e1-490b-b2e8-5899c8b240e0', 
            name: 'Project Name 001',
            user_id: 'a51964c5-b377-4c8c-9957-6a10fdcf23d1'
        }
    ]

    test('should return an array list of projects search by user', async () => {
    
        const repository = new ProjectRepositorySQL();
        repository.index = jest.fn( async () => {
            return projectList
        });

        const service = new IndexProjectUseCase(repository)
        const result = await service.execute({ user_id: 'a51964c5-b377-4c8c-9957-6a10fdcf23d1'});
        const response = result.value.getValue()
        expect(result.value.isSuccess).toBe(true)
        expect(response).toMatchObject(projectList)
    })

})