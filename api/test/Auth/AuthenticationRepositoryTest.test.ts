import AuthenticationRepositorySQL from "../../src/infra/repository/Authentication/AuthenticationRepositorySQL";

describe('Authentication Use Case', () => {
    
    const userMock = { 
        id: 'a51964c5-b377-4c8c-9957-6a10fdcf23d1', 
        email: 'michelhenrsilva@gmail.com', 
        name: 'Michel Henrique da Silva', 
        password: '$2b$10$dtLWYODobv0h/6zmuOo8EO2hCqpdk01ZT2zLCUgfwJCQhro1TCCLK'
    }

    const repository = new AuthenticationRepositorySQL();

    test('must retrieve the user by email', async () => {
    
        const repositoryMock = jest.spyOn(repository, 'findByEmail').mockImplementation( async () => {
            return userMock
        });
        const result = await repository.findByEmail('michelhenrsilva@gmail.com');

        expect(repositoryMock).toHaveBeenCalled();
        expect(result.email).toBe('michelhenrsilva@gmail.com')
    })

})