import AuthenticationProviderJWT from "../../src/infra/jwt/AuthenticationProviderJWT";
import EncriptPasswordProviderBycript from "../../src/infra/provider/EncriptPasswordProviderBycript";
import AuthenticationRepositorySQL from "../../src/infra/repository/Authentication/AuthenticationRepositorySQL";
import AuthenticationUseCase from "../../src/usecase/Authentication/AuthenticationUseCase";

describe('Authentication Use Case', () => {
    
    const userMock = { 
        id: '', 
        email: 'michelhenrsilva@gmail.com', 
        name: 'Michel Henrique da Silva', 
        password: '$2b$10$dtLWYODobv0h/6zmuOo8EO2hCqpdk01ZT2zLCUgfwJCQhro1TCCLK'
    }

    const authProvider = new AuthenticationProviderJWT();
    const encriptPasswordProvider = new EncriptPasswordProviderBycript();

    test('Should be return operation successfuly', async () => {
    
        const repository = new AuthenticationRepositorySQL();
        repository.findByEmail = jest.fn( async () => {
            return userMock            
        });

        const service = new AuthenticationUseCase(repository, authProvider, encriptPasswordProvider)
        const result = await service.execute({ email: 'michelhenrsilva@gmail.com', password: '123456'});
        expect(result.value.isSuccess).toBe(true)
    })

    test('should return 400 Bad Request when passing empty credentials', async () => {
    
        const repository = new AuthenticationRepositorySQL();
        repository.findByEmail = jest.fn( async () => {
            return userMock
        });

        const service = new AuthenticationUseCase(repository, authProvider, encriptPasswordProvider)
        const result = await service.execute({ email: '', password: ''});
        const response = result.value.getValue()
        expect(result.value.isFailure).toBe(true)
        expect(response.status).toBe(400)
    })

    test('should return 400 Bad Request when passing empty password', async () => {
    
        const repository = new AuthenticationRepositorySQL();
        repository.findByEmail = jest.fn( async () => {
            return userMock
        });

        const service = new AuthenticationUseCase(repository, authProvider, encriptPasswordProvider)
        const result = await service.execute({ email: 'michelhenrsilva@gmail.com', password: ''});
        const response = result.value.getValue()
        expect(result.value.isFailure).toBe(true)
        expect(response.status).toBe(400)
        expect(response.message).toEqual([ 'O campo senha é obrigatório' ])
    })

    test('should return 400 bad request when passing empty email', async () => {
    
        const repository = new AuthenticationRepositorySQL();
        repository.findByEmail = jest.fn( async () => {
            return userMock
        });

        const service = new AuthenticationUseCase(repository, authProvider, encriptPasswordProvider)
        const result = await service.execute({ email: '', password: '123456'});
        const response = result.value.getValue()
        expect(result.value.isFailure).toBe(true)
        expect(response.status).toBe(400)
        expect(response.message).toEqual([ 'O campo email é obrigatório' ])
    })

    test('should return 400 bad request when passing empty email', async () => {
    
        const repository = new AuthenticationRepositorySQL();
        repository.findByEmail = jest.fn( async () => {
            return {}
        });

        const service = new AuthenticationUseCase(repository, authProvider, encriptPasswordProvider)
        const result = await service.execute({ email: 'michelhenrsilva@gmail.com', password: '123456'});
        const response = result.value.getValue()
        expect(response.status).toBe(401)
        expect(response.message).toEqual([ 'Acesso não autorizado' ])
    })

})