# Playwright PetStore POM - Suite de Testes Automatizados

Projeto de automação de testes E2E (End-to-End) para a aplicação PetStore usando **Playwright** e o padrão **Page Object Model (POM)**. Os testes cobrem fluxos críticos como login, registro, busca de produtos, adição ao carrinho e checkout.

---

## 📋 Instalação

### Pré-requisitos

- **Node.js** (versão 18 ou superior)
- **npm** (gerenciador de pacotes do Node.js)

### Passo a Passo

1. **Clone ou acesse o diretório do projeto**

   ```bash
   cd Playwright_PetStore_POM_ReadMe_FINAL
   ```

2. **Instale as dependências do projeto**

   ```bash
   npm install
   ```

   Este comando irá instalar:
   - `@playwright/test` - Framework de testes Playwright
   - `@types/node` - Definições de tipos TypeScript para Node.js

3. **Instale os navegadores do Playwright**
   ```bash
   npx playwright install
   ```
   Isto instala os navegadores Chromium, Firefox e WebKit necessários para executar os testes.

---

## 🏃 Como Correr os Testes

### Executar Todos os Testes

```bash
npx playwright test
```

### Executar Testes em um Navegador Específico

```bash
# Apenas Chrome
npx playwright test --project=chromium

# Apenas Firefox
npx playwright test --project=firefox

# Apenas Safari
npx playwright test --project=webkit
```

### Executar uma Suite de Testes Específica

```bash
npx playwright test Login.spec.js
npx playwright test Register.spec.js
npx playwright test Search.spec.js
npx playwright test AddToCart.spec.js
npx playwright test Checkout.spec.js
```

### Executar Testes em Modo Debug

```bash
npx playwright test --debug
```

Abre o **Playwright Inspector** que permite executar passos e inspecionar elementos.

### Executar Testes em Modo UI (Visual)

```bash
npx playwright test --ui
```

Interface visual que mostra os testes sendo executados em tempo real.

### Visualizar Relatório HTML

Após executar os testes, visualize o relatório interativo:

```bash
npx playwright show-report
```

---

## 📁 Estrutura do Projeto

```
Playwright_PetStore_POM_ReadMe_FINAL/
│
├── pages/                          # Page Objects - Encapsulam elementos e ações
│   ├── Homepage.js                # Página inicial da aplicação
│   ├── LoginPage.js               # Página de login
│   ├── RegisterPage.js            # Página de registro
│   ├── ProductListPage.js         # Lista de produtos
│   ├── ProductSearchPage.js       # Página de busca de produtos
│   ├── AddToCart.js               # Carrinho de compras
│   └── CheckoutPage.js            # Página de checkout
│
├── tests/                          # Arquivos de teste (Test Suites)
│   ├── Login.spec.js              # Testes de autenticação
│   ├── Register.spec.js           # Testes de registro
│   ├── Search.spec.js             # Testes de busca
│   ├── AddToCart.spec.js          # Testes de carrinho
│   └── Checkout.spec.js           # Testes de finalização de compra
│
├── playwright-report/             # Relatórios gerados após execução
│   └── index.html
│
├── test-results/                  # Resultados detalhados dos testes
│   └── [testes executados por navegador]
│
├── playwright.config.js           # Configuração principal do Playwright
├── package.json                   # Dependências e metadados do projeto
├── package-lock.json              # Versões exatas das dependências
├── test-data.json                 # Dados de teste (fixtures)
└── README.md                       # Este arquivo
```

### Descrição dos Diretórios

- **pages/**: Implementa o padrão Page Object Model, isolando seletores e ações de página
- **tests/**: Contém os cenários de teste organizados por feature/funcionalidade
- **playwright-report/**: Relatório HTML com resultados dos testes
- **test-results/**: Logs e evidências de execução (screenshots, vídeos, traces)

---

## 🛠️ Tecnologias Usadas

| Tecnologia           | Versão | Descrição                            |
| -------------------- | ------ | ------------------------------------ |
| **Playwright**       | 1.58.2 | Framework de automação de testes E2E |
| **Node.js**          | 18+    | Runtime JavaScript                   |
| **JavaScript (ES6)** | -      | Linguagem de programação             |
| **@playwright/test** | 1.58.2 | API de testes do Playwright          |

### Navegadores Suportados

- ✅ **Chromium** (Google Chrome)
- ✅ **Firefox**
- ✅ **WebKit** (Safari)

### Padrões de Desenvolvimento

- 🏗️ **Page Object Model (POM)** - Estrutura de testes mais mantível e escalável
- 🧪 **BDD** - Testes organizados por cenários e funcionalidades

---

## 🔄 Fluxo dos Testes

### Arquitetura do Teste

```
┌─────────────────────────────────────────────────────────┐
│                   Test Spec Files                        │
│          (Login, Register, Search, etc)                  │
└────────────┬────────────────────────────────────────────┘
             │
             ├─────────────────────────────────────────────┐
             │                                             │
┌────────────▼──────────┐             ┌──────────────────▼──┐
│  Page Object Layer    │             │  Playwright Config │
│  ├─ LoginPage.js      │             │  ├─ Base URL      │
│  ├─ Homepage.js       │             │  ├─ Browsers      │
│  ├─ RegisterPage.js   │             │  ├─ Retries       │
│  └─ ...               │             │  └─ Reporters     │
└───────────┬───────────┘             └──────────────────┘
            │
┌───────────▼──────────────────────────────┐
│     Playwright Test Runner               │
│  ├─ Executa em paralelo (fullyParallel) │
│  ├─ Testa em múltiplos navegadores      │
│  └─ Gera relatórios HTML               │
└───────────┬──────────────────────────────┘
            │
        ┌───▼────┐
        │ Results│
        └────────┘
```

### Fluxo de Execução de um Teste

1. **Setup**: Playwright inicia um novo navegador e contexto
2. **Navegação**: Teste acessa a URL base (`https://petstore.octoperf.com`)
3. **Interação**: Page Objects encapsulam ações (clique, preenchimento)
4. **Assertion**: Validações verificam se o resultado é esperado
5. **Teardown**: Navegador é fechado e relatório é gerado

### Exemplo de Fluxo: Teste de Login

```
1. Ir para Homepage
   ↓
2. Clicar em "Login"
   ↓
3. Preencher email e senha
   ↓
4. Clicar em "Sign In"
   ↓
5. Validar que você foi redirecionado para a página de conta
   ↓
6. Verificar se o nome do usuário aparece na página
```

### Exemplo de Fluxo: Teste de Compra (AddToCart + Checkout)

```
1. Navegar para Homepage
   ↓
2. Fazer busca por produto
   ↓
3. Verificar resultados da busca
   ↓
4. Clicar no produto desejado
   ↓
5. Adicionar produto ao carrinho
   ↓
6. Ir para o carrinho
   ↓
7. Validar item no carrinho
   ↓
8. Proceder com checkout
   ↓
9. Preencher dados de entrega
   ↓
10. Confirmar pedido
    ↓
11. Validar confirmação de compra
```

### Padrão Page Object Model

Cada página tem um arquivo dedicado que:

- 📍 **Localiza elementos** usando seletores CSS/XPath
- 🎯 **Encapsula ações** (clique, preenchimento de formulário)
- ✅ **Expõe métodos** para os testes usarem

**Exemplo:**

```javascript
// pages/LoginPage.js
class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailInput = page.locator('input[name="email"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginButton = page.locator('button:has-text("Sign In")');
  }

  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
```

---

## 📊 Relatórios e Evidências

### Relatório HTML

Após executar os testes, um relatório interativo é gerado em `playwright-report/index.html` contendo:

- ✅ Testes aprovados
- ❌ Testes falhados
- ⏱️ Tempo de execução
- 📸 Screenshots (em caso de falha)
- 🎥 Vídeos (raros)
- 📋 Logs detalhados

### Visualizar Relatório

```bash
npx playwright show-report
```

---

## 🐛 Troubleshooting

### Erro: "Playwright não encontra os navegadores"

```bash
npx playwright install
```

### Erro: "Timeout durante teste"

Aumentar timeout no `playwright.config.js`:

```javascript
use: {
  navigationTimeout: 30000,
  actionTimeout: 10000,
}
```

### Testes lentos

- Executar em paralelo: `npx playwright test` (padrão)
- Reduzir workers: `npx playwright test --workers=1`

---

## 📚 Referências Úteis

- [Documentação Oficial Playwright](https://playwright.dev)
- [Page Object Model Best Practices](https://playwright.dev/docs/pom)
- [Relatórios do Playwright](https://playwright.dev/docs/test-reporters)
- [VS Code Extension Playwright](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright)

---

## 👤 Autor

Projeto Playwright - PetStore POM ReadMe FINAL

---

**Última atualização**: Março 2026
