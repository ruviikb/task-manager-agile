# TaskFlow - Sistema de Gerenciamento de Tarefas

Projeto acadêmico desenvolvido para simular o planejamento, desenvolvimento e controle de qualidade de um software usando práticas de Engenharia de Software e metodologia ágil.

## Objetivo

Permitir que uma startup de logística acompanhe tarefas, identifique prioridades e visualize o andamento das atividades da equipe.

## Escopo inicial

O escopo inicial previa as operações essenciais de um CRUD:

- criar tarefas;
- listar tarefas;
- atualizar o status de conclusão;
- excluir tarefas.

## Metodologia adotada

Foi utilizado **Kanban**, com as colunas **To Do**, **In Progress** e **Done**. As atividades são representadas por cards e movimentadas conforme o andamento do trabalho.

## Mudança de escopo

Durante o desenvolvimento, foi simulada uma solicitação do cliente para incluir a **prioridade da tarefa**. A mudança foi aceita porque auxilia a equipe de logística a identificar tarefas críticas. Para registrá-la, foi criado um novo card no Kanban, o código foi atualizado e novos testes foram executados.

## Funcionalidades

- Cadastro de tarefa com título, descrição e prioridade;
- Listagem das tarefas;
- Marcação como concluída ou pendente;
- Exclusão de tarefa;
- Validação de título;
- Interface web responsiva.

## Tecnologias

- Node.js 20 ou superior;
- HTML, CSS e JavaScript;
- `node:test` para testes automatizados;
- GitHub Actions para integração contínua.

## Como executar

```bash
npm start
```

Abra `http://localhost:3000` no navegador.

## Como executar os testes

```bash
npm test
npm run quality
```

## Estrutura

```text
.github/workflows/ci.yml  Pipeline de integração contínua
docs/                     Diagramas e documentação
public/                   Interface web
src/                      Código da aplicação
tests/                    Testes automatizados
```

## Controle de qualidade

O pipeline do GitHub Actions é iniciado em cada `push` ou `pull request` para a branch `main`. Ele valida a sintaxe do código e executa os testes automatizados.

## Autor

Bismarck Berrondo
