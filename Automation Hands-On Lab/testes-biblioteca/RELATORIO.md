# 📄 Relatório de Testes Automatizados — Sistema de Biblioteca

Este relatório documenta a automação de testes desenvolvida para o sistema CRUD Livros da Biblioteca, cobrindo testes de **API** e **Frontend**.  
O objetivo foi validar o comportamento funcional da aplicação, garantir estabilidade e demonstrar boas práticas de automação com **Playwright**.

---

## 🎯 1. Introdução

A aplicação **Biblioteca Virtual** oferece:

- autenticação de utilizadores  

- gestão completa de livros  

- dashboard com estatísticas  

- sistema de favoritos  

- interface moderna e responsiva  

A automação foi construída para validar estes fluxos de forma independente, repetível e alinhada com os requisitos definidos no PDF oficial.

---

## 🧪 2. Estratégia de Testes

A estratégia adotada dividiu-se em duas camadas principais:

### 🔌 2.1 Testes de API

Os testes de API garantiram que o backend estava funcional antes dos testes de Frontend.  
Foram validados:

- operações CRUD  

- respostas HTTP  

- erros esperados  

- estrutura dos objetos retornados  

- comportamento com dados inválidos  

### 🌐 2.2 Testes de Frontend

Os testes de Frontend simularam o comportamento real do utilizador:

- login  

- navegação entre páginas  

- criação, edição e remoção de livros  

- favoritos  

- validações de formulário  

- permissões e redirecionamentos  

### 🧩 2.3 Dados Temporários

Para garantir independência entre testes:

- livros criados usam nomes únicos (`Date.now()`)  

- dados são criados e removidos dentro do próprio teste  

- nenhum teste depende de estado prévio  

---

## 🛠️ 3. Ambiente de Execução

| Componente | Tecnologia |
|-----------|------------|
| Runtime   | Node.js |
| Framework | Playwright |
| Backend   | JSON Server + Express |
| Navegadores | Chromium (default) |
| Execução | Ambiente local |

A aplicação foi executada em: **http://localhost:3000**

---

## 📘 4. Cobertura dos Testes

A suite cobre todos os cenários definidos no PDF, incluindo API e Frontend.

### 🔌 4.1 Testes de API (13 casos)

**ID — Descrição**

- CT-API-001: Registro de Novo Usuário (Sucesso)  
- CT-API-002: Registro com Email Duplicado (Falha)  
- CT-API-003: Login com Credenciais Válidas  
- CT-API-004: Login com Credenciais Inválidas  
- CT-API-005: Listar Todos os Livros  
- CT-API-006: Buscar Livro por ID (Existente)  
- CT-API-007: Buscar Livro por ID (Inexistente)  
- CT-API-008: Adicionar Novo Livro  
- CT-API-009: Atualizar Livro Existente  
- CT-API-010: Deletar Livro  
- CT-API-011: Obter Estatísticas da Biblioteca  
- CT-API-012: Adicionar Livro aos Favoritos  
- CT-API-013: Listar Favoritos de Usuário  

Todos os testes foram executados com sucesso, **exceto o CT-API-013**.

---

### 🌐 4.2 Testes de Frontend (16 casos)

**ID — Descrição**

- CT-FE-001: Fluxo Completo de Registro  
- CT-FE-002: Validação de Senhas Não Correspondentes  
- CT-FE-003: Login com Sucesso  
- CT-FE-004: Login com Credenciais Inválidas  
- CT-FE-005: Verificar Proteção de Rotas  
- CT-FE-006: Visualizar Dashboard com Estatísticas  
- CT-FE-007: Adicionar Novo Livro  
- CT-FE-008: Validação de Campos Obrigatórios  
- CT-FE-009: Navegação Entre Páginas  
- CT-FE-010: Visualizar Detalhes de Livro  
- CT-FE-011: Adicionar Livro aos Favoritos  
- CT-FE-012: Remover Livro dos Favoritos  
- CT-FE-013: Listar Livros Favoritos  
- CT-FE-014: Deletar Livro com Confirmação  
- CT-FE-015: Cancelar Deleção de Livro  
- CT-FE-016: Logout do Sistema  

Todos os testes foram concluídos com sucesso.

---

## 🧠 5. Decisões Técnicas

### ❌ 5.1 Não utilização de Page Object Model (POM)

A decisão foi intencional:

- foco na entrega funcional  

- projeto pequeno  

- evitar complexidade desnecessária  

- requisitos do PDF não exigiam arquitetura avançada  

Apesar disso, identificaram-se pontos onde POM poderá ser aplicado futuramente.

### 🎯 5.2 Selectors robustos

Foram utilizados:

- `getByRole()`  

- `getByText()`  

- `locator()` com `hasText`  

Garantindo estabilidade e legibilidade.

### ⚠️ 5.3 Manipulação de diálogos

Os testes lidam com:

- `alert()`  

- `confirm()`  

Com handlers registados no momento correto.

### 🧩 5.4 Dados temporários

Livros criados com nomes únicos via `${Date.now()}`, evitando mexer na estrutura inicial da Biblioteca.

### 🔐 5.5 Logout

O teste valida apenas o redirecionamento para `login.html`, alinhado com o comportamento real do frontend.

---

## ⚠️ 6. Limitações

- Sem screenshots  

- Sem logs de execução  

- Sem POM nesta fase  

- Sem CI/CD configurado  

- Dependência do servidor local  

- O frontend não remove o `localStorage` no logout (comportamento assumido)  

Estas limitações **não comprometem** a validade da suite.

---

## 📁 7. Estrutura da Automação

A automação foi organizada em duas pastas principais dentro de `tests/`, separando claramente os testes de API dos testes de Frontend.

A estrutura atual é a seguinte:

```
tests/
├── api/
│   ├── estatisticas.spec.js
│   ├── favoritos.spec.js
│   ├── livros.spec.js
│   ├── login.spec.js
│   └── registro.spec.js
│
└── frontend/
    ├── dashboard.spec.js
    ├── detalhes.spec.js
    ├── favoritos.spec.js
    ├── livros.spec.js
    ├── login.spec.js
    ├── logout.spec.js
    ├── registro.spec.js
    └── route-protection.spec.js
```

### ✨ Benefícios desta organização

- Separação clara entre API e Frontend  

- Escalabilidade  

- Coerência entre ficheiros  

- Profissionalismo  

- Leitura rápida  

Esta organização reflete boas práticas de automação e facilita a evolução futura da suite (ex.: POM, helpers reutilizáveis, fixtures globais).

---

## 🏁 8. Conclusão

A suite de testes automatizados cumpre integralmente os requisitos do PDF, cobrindo:

- **13 testes de API**  

- **16 testes de Frontend**  

- fluxos críticos  

- validações funcionais  

- comportamento real do utilizador  

O projeto encontra-se estável, completo e pronto para entrega.

Existe espaço para evolução futura:

- migração parcial para Page Object Model  

- integração contínua (CI/CD)  

- relatórios automáticos  

- screenshots e vídeos opcionais  

No estado atual, a suite cumpre todos os objetivos propostos e garante confiança no funcionamento da aplicação.
