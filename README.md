# 616 Store — Loja Virtual Marvel

Loja virtual com o tema **Marvel**, desenvolvida como projeto acadêmico do curso de **Análise e Desenvolvimento de Sistemas (ADS)**. O nome "616" faz referência ao número da Terra principal do multiverso Marvel nos quadrinhos (Terra-616).

O projeto foi construído com **Angular**, **Bootstrap**, **HTML** e **CSS**, e reúne as principais telas de um e-commerce: vitrine de produtos, detalhes do produto, carrinho de compras e telas de autenticação.

---

## Sumário

- [Funcionalidades](#funcionalidades)
- [Tecnologias](#tecnologias)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Como executar](#como-executar)
- [Rotas da aplicação](#rotas-da-aplicação)
- [Catálogo de produtos](#catálogo-de-produtos)
- [Autores](#autores)

---

## Funcionalidades

**Vitrine (Feed)**
- Listagem de 20 produtos em cards responsivos (2 colunas no celular, até 4 no desktop).
- Selo de desconto (`X% OFF`) calculado automaticamente para produtos em promoção.
- Exibição do preço promocional ou do preço normal, formatado em Real (BRL).
- Botões "Ver detalhes" e "Adicionar ao carrinho" em cada card.

**Detalhes do produto**
- Galeria de imagens e imagem principal.
- Preço "De/Por" para produtos em promoção.
- Cálculo de parcelamento em até 3x sem juros.
- Avaliação em estrelas, seletor de quantidade e botões "Adicionar ao carrinho" e "Comprar agora".
- Selos de confiança: produto original licenciado Marvel, embalagem segura e entrega rápida.

**Carrinho de compras**
- Lista de itens com imagem, nome, preço, quantidade e botão de remover.
- Subtotal e total calculados a partir dos itens.
- Campo de cupom de desconto e botão "Finalizar compra".
- Estado de carrinho vazio com atalho para voltar aos produtos.

**Conta e autenticação (telas)**
- Login com e-mail/usuário, senha, "Lembrar de mim" e botões de login social (Google e Facebook).
- Criação de conta com nome, e-mail, celular (opcional), senha, confirmação de senha e aceite dos termos.
- Recuperação de senha ("Esqueci minha senha").

**Layout geral**
- Cabeçalho com logotipo, barra de busca, ícones de carrinho e usuário, e botões de login/cadastro.
- Menu de categorias: Action Figure, Funko Pop, HQ's, Roupas, Canecas e Acessórios.
- Rodapé com selos (compra segura, envio rápido, atendimento rápido) e links de redes sociais.

---

## Tecnologias

| Tecnologia | Uso |
|---|---|
| [Angular 22](https://angular.dev/) | Framework principal (componentes standalone, roteamento, SSR) |
| [TypeScript 6](https://www.typescriptlang.org/) | Linguagem da aplicação |
| [Bootstrap 5.3](https://getbootstrap.com/) | Grid, utilitários e componentes de interface |
| [Bootstrap Icons](https://icons.getbootstrap.com/) | Ícones (carregados via CDN) |
| HTML5 / CSS3 | Estrutura e estilização de cada componente |
| [Angular SSR](https://angular.dev/guide/ssr) + Express | Renderização no servidor |
| [Vitest](https://vitest.dev/) + jsdom | Testes unitários |
| Prettier / EditorConfig | Padronização de código |
| Google Fonts | Fontes M PLUS 1p, Boldonse e Istok Web |

---

## Estrutura do projeto

```
project-616-store/
├── public/                     # Arquivos estáticos (imagens dos produtos, logotipo, ícones, banners)
├── src/
│   ├── app/
│   │   ├── criar-conta/        # Tela de cadastro
│   │   ├── esqueci-senha/      # Tela de recuperação de senha
│   │   ├── feed/               # Vitrine de produtos (página inicial)
│   │   ├── login/              # Tela de login
│   │   ├── model/              # Classes de domínio (Produto, ItemCarrinho, Carrinho, Cliente, Pedido...)
│   │   ├── product-details/    # Página de detalhes do produto
│   │   ├── shopping-cart/      # Carrinho de compras
│   │   ├── app.ts / app.html   # Componente raiz (cabeçalho, router-outlet e rodapé)
│   │   ├── app.routes.ts       # Definição das rotas
│   │   └── app.config.ts       # Configuração da aplicação
│   ├── index.html
│   ├── main.ts                 # Bootstrap no navegador
│   ├── main.server.ts          # Bootstrap no servidor (SSR)
│   ├── server.ts               # Servidor Express (SSR)
│   └── styles.css              # Estilos globais
├── angular.json
├── package.json
└── tsconfig*.json
```

Cada componente segue o padrão do Angular CLI com quatro arquivos: `.ts` (lógica), `.html` (template), `.css` (estilos) e `.spec.ts` (testes).

---

## Como executar

### Pré-requisitos

- [Node.js](https://nodejs.org/) em uma versão LTS recente compatível com o Angular 22
- npm
- Git

### Passo a passo

```bash
# 1. Clone o repositório
git clone <url-do-repositorio>
cd project-616-store

# 2. Instale as dependências
npm install

# 3. Inicie o servidor de desenvolvimento
ng serve --open
```

O navegador abrirá automaticamente em **http://localhost:4200/**. A aplicação recarrega a cada alteração nos arquivos.

---

## Rotas da aplicação

| Rota | Componente | Descrição |
|---|---|---|
| `/` e `/feed` | `Feed` | Vitrine de produtos |
| `/product-details` | `ProductDetails` | Detalhes do produto selecionado |
| `/shopping-cart` | `ShoppingCart` | Carrinho de compras |
| `/login` | `Login` | Login |
| `/criar-conta` | `CriarConta` | Cadastro de novo usuário |
| `/esqueci-senha` | `EsqueciSenha` | Recuperação de senha |

---

## Catálogo de produtos

A loja possui 20 produtos Marvel distribuídos nas categorias do menu:

- **Funko Pop:** Homem-Aranha, Homem de Ferro, Deadpool, Groot, Loki e Venom
- **Action Figure:** Homem-Aranha, Capitão América, Thor, Wolverine e Hulk
- **HQ's:** Homem-Aranha, Vingadores, X-Men e Guerra Civil
- **Roupas:** Camiseta Homem de Ferro
- **Canecas:** Caneca Homem-Aranha
- **Acessórios:** Chaveiro do Capitão América, Mochila Marvel Avengers e Caderno Marvel

---

## Autores

Projeto desenvolvido por estudantes do curso de Análise e Desenvolvimento de Sistemas.

- **Nome dos(a) integrante** — [GitHub](https://github.com/usuario)
- **Instituição:** _(nome da faculdade)_
- **Disciplina / Professor(a):** _(preencher)_

---

> Projeto de fins educacionais, sem fins lucrativos. Marvel e seus personagens são marcas de seus respectivos proprietários; este projeto não é afiliado nem endossado por eles.