# Boltech Chanllenge

Siga os passos abaixo para configuração do projeto:

1. Crie um banco de dados utilizando algum gerenciador RDBMS (PostgresSQL)
2. Edite o arquivo .env e inclua as variáveis de conexão com banco 
3. Execute as instruções SQL abaixo para criar as tabelas 

```sql
CREATE TABLE public.projects (
    name character varying NOT NULL,
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    user_id uuid NOT NULL
);

CREATE TABLE public.tasks (
    name character varying NOT NULL,
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    project_id uuid NOT NULL,
    created_at timestamp without time zone,
    finished_at timestamp without time zone
);

CREATE TABLE public.users (
    name character varying NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL
);


ALTER TABLE ONLY public.projects
    ADD CONSTRAINT "PK_6271df0a7aed1d6c0691ce6ac50" PRIMARY KEY (id);


ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT "PK_8d12ff38fcc62aaba2cab748772" PRIMARY KEY (id);


ALTER TABLE ONLY public.users
    ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY (id);


ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT "FK_9eecdb5b1ed8c7c2a1b392c28d4" FOREIGN KEY (project_id) REFERENCES public.projects(id);


ALTER TABLE ONLY public.projects
    ADD CONSTRAINT "FK_bd55b203eb9f92b0c8390380010" FOREIGN KEY (user_id) REFERENCES public.users(id);
```

## Para executar o projeto
### Clone o repositorio em sua máquina local e execute as etapas abaixo

1. Entre na pasta do projeto backend `cd api`
2. Execute `yarn` ou `npm install`
3. E depois `yarn start` ou `npm start`
4. Execute `yarn test` ou `npm test` para executar a suite de testes

