# Testes de API com Playwright

Este projeto contém um conjunto de testes automatizados de API desenvolvidos com **Playwright**, focados na validação das rotas principais do serviço de gestão de livros.  
Os testes verificam cenários reais, como obter listas, criar novos registos, atualizar dados, remover itens e validar mensagens de erro.

---

## 📦 1. Pré‑requisitos

Antes de executar os testes, certifica‑te de que tens instalado:

- **Node.js** (versão 18 ou superior)

- **npm** (incluído com o Node)

- **Playwright** (instalado através do projeto)

Para confirmar a versão do Node:

```bash
node -v
```

---

## 📥 2. Instalar dependências

Na raiz do projeto, executa:

```bash
npm install
```

Isto instala o Playwright e todas as bibliotecas necessárias para correr os testes.

---

## 🧪 3. Como correr apenas os testes de API

Os testes de API estão organizados na pasta: **testes-biblioteca/tests/api**

Para executar **todos os testes de API**, usa:

```bash
npx playwright test --project=api
```

Para executar um ficheiro específico:

```bash
npx playwright test testes-biblioteca/tests/api/**nome-do-teste**.spec.js
```

---

## 🧱 4. O que estes testes validam

Os testes cobrem vários cenários importantes, incluindo:

- Obter a lista completa de livros (`GET /livros`)

- Obter um livro por ID

- Criar um novo livro (`POST`)

- Atualizar um livro existente (`PUT`)

- Remover um livro (`DELETE`)

- Validar respostas de erro quando:
  - o ID não existe  
  - o payload é inválido  
  - campos obrigatórios estão em falta  

Cada teste segue uma estrutura simples:

1. Enviar o pedido HTTP com `request.get()`, `request.post()`, etc.

2. Validar o código de estado (ex.: `expect(response.status()).toBe(200)`)

3. Ler o JSON da resposta (`await response.json()`)

4. Confirmar que os dados retornados estão corretos

---

## ▶️ 5. Ver o relatório dos testes

Depois de executar os testes, podes abrir o relatório HTML com:

```bash
npx playwright show-report
```

O relatório permite ver:

- Testes que passaram

- Testes que falharam

- Detalhes de cada pedido e resposta

---

## 📚 6. Sobre este projeto

Este conjunto de testes foi criado para fins de aprendizagem e prática de automação de APIs com Playwright.  
O objetivo é garantir que cada endpoint funciona corretamente e que os cenários principais estão cobertos de forma simples, clara e organizada.
