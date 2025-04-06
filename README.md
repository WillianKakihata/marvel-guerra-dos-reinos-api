# 📚 Marvel API CRUD

Este projeto é uma API RESTful desenvolvida com **Node.js**, **Express**, **TypeScript** e **Mongoose** para manipular dados fictícios da API da Marvel, incluindo **personagens**, **criadores** e **comics**. A API oferece operações completas de **CRUD**, testes com **Jest**, e integração com a **API pública da Marvel** para importar dados.

---

## 🚀 Tecnologias Utilizadas

- [Visual Studio Code](https://code.visualstudio.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Node.js + Express](https://expressjs.com/)
- [Mongoose (MongoDB)](https://mongoosejs.com/)
- [Jest (Testes)](https://jestjs.io/)
- [Marvel API](https://developer.marvel.com/)

---

## 📦 Instalação

```bash
git clone https://github.com/seu-usuario/nome-do-projeto.git
cd nome-do-projeto
npm install



---


## 🧱 Estrutura de Dados

### Personagem (`/personagem`)
```ts
{
  nome: string,
  descricao: string,
  imagemUrl: string
}
```

### Criadores (`/criadores`)
```ts
{
  nome: string,
  funcao: string,
  contribuicao: string
}
```

### Comics (`/comic`)
```ts
{
  titulo: string,
  descricao: string,
  dataPublicacao: string,
  capa: string
}
```

---

## 📌 Rotas Disponíveis

### 🔹 Personagem

| Método | Rota                          | Descrição                            |
|--------|-------------------------------|----------------------------------------|
| POST   | `/personagem`                 | Cria um novo personagem               |
| GET    | `/personagem/:id`             | Busca personagem por ID               |
| GET    | `/personagem/`                | Lista todos os personagens            |
| PUT    | `/personagem/:id`             | Atualiza personagem por ID            |
| DELETE | `/personagem/:id`             | Deleta personagem por ID              |
| GET    | `/personagem-carregados`      | Importa personagens da Marvel API     |
| GET    | `/personagens/:nome`          | Busca personagem por nome             |
| GET    | `/personagens-registros`      | Total de registros de personagens     |

---

### 🔹 Criadores

| Método | Rota                          | Descrição                            |
|--------|-------------------------------|----------------------------------------|
| POST   | `/criadores`                  | Cria um novo criador                  |
| GET    | `/criadores/:id`              | Busca criador por ID                  |
| GET    | `/criadores/`                 | Lista todos os criadores              |
| PUT    | `/criadores/:id`              | Atualiza criador por ID               |
| DELETE | `/criadores/:id`              | Deleta criador por ID                 |
| GET    | `/criadores-carregados`       | Importa criadores da Marvel API       |
| GET    | `/criadores/:nome`            | Busca criador por nome                |
| GET    | `/criadores-registros`        | Total de registros de criadores       |

---

### 🔹 Comics

| Método | Rota                          | Descrição                            |
|--------|-------------------------------|----------------------------------------|
| POST   | `/comic`                      | Cria uma nova comic                   |
| GET    | `/comic/:id`                  | Busca comic por ID                    |
| GET    | `/comic/`                     | Lista todas as comics                 |
| PUT    | `/comic/:id`                  | Atualiza comic por ID                 |
| DELETE | `/comic/:id`                  | Deleta comic por ID                   |
| GET    | `/comic-carregados`           | Importa comics da Marvel API          |
| GET    | `/comic/:titulo`              | Busca comic por título                |
| GET    | `/comic-registros`            | Total de registros de comics          |

---
