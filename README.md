# ERP Turismo App - Layout Responsivo com PrimeNG Tailwind

Este projeto é uma aplicação Angular para gerenciamento de turismo (ERP Turismo), atualizada com um novo layout responsivo utilizando exclusivamente componentes e estilos do PrimeNG Tailwind.

## Visão Geral

A aplicação original foi reestruturada para incorporar um layout moderno e responsivo, melhorando a experiência do usuário em diferentes dispositivos (desktop, tablet e mobile). Os seguintes componentes foram criados e integrados:

*   **Navbar:** Barra de navegação superior com título, botão para toggle do sidebar e menu do usuário.
*   **Sidebar:** Menu lateral navegável com links para as principais seções da aplicação.
*   **User Menu:** Menu dropdown no navbar com opções de perfil, configurações e logout.
*   **Breadcrumb:** Componente que exibe a localização atual do usuário na hierarquia de navegação.
*   **Loading:** Indicador visual de carregamento para operações assíncronas.
*   **Main Layout:** Componente principal que organiza o navbar, sidebar e a área de conteúdo principal (`<router-outlet>`).

## Pré-requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas em seu ambiente de desenvolvimento:

*   [Node.js](https://nodejs.org/) (versão LTS recomendada)
*   [Yarn](https://yarnpkg.com/) (gerenciador de pacotes)
*   [Docker](https://www.docker.com/) (opcional, para execução em contêiner)

## Instalação

1.  Clone o repositório:
    ```bash
    git clone https://github.com/hosanah/erp-turismo-app.git # Ou o URL do seu fork/repositório
    cd erp-turismo-app
    ```

2.  Instale as dependências do projeto usando Yarn:
    ```bash
    yarn install
    ```

## Executando a Aplicação

Para iniciar o servidor de desenvolvimento local, execute:

```bash
yarn start
```

A aplicação estará disponível em `http://localhost:4200/`.

## Estrutura do Projeto (Layout)

Os novos componentes de layout foram adicionados em `src/app/shared/components`:

```
src/
└── app/
    ├── core/         # Serviços core, interceptors, etc.
    ├── modules/      # Módulos de funcionalidades (clientes, vendas, etc.)
    ├── shared/       # Módulo compartilhado e componentes reutilizáveis
    │   ├── components/
    │   │   ├── breadcrumb/
    │   │   ├── loading/
    │   │   ├── main-layout/
    │   │   ├── navbar/
    │   │   ├── sidebar/
    │   │   └── user-menu/
    │   └── shared.module.ts # Módulo que declara e exporta os componentes
    ├── app.component.html # Template raiz (usa app-main-layout)
    ├── app.component.ts   # Componente raiz
    ├── app.config.ts      # Configuração da aplicação standalone
    └── app.routes.ts      # Definição das rotas
```

O `AppComponent` agora utiliza o `MainLayoutComponent` para renderizar a estrutura principal da aplicação quando o usuário está autenticado.

## Tecnologias Utilizadas

*   **Angular:** Framework principal da aplicação.
*   **PrimeNG:** Biblioteca de componentes UI para Angular.
*   **Tailwind CSS:** Framework CSS utility-first para estilização.
*   **PrimeNG Tailwind Preset (Aura):** Integração oficial entre PrimeNG e Tailwind CSS, fornecendo estilos baseados em Tailwind para os componentes PrimeNG.
*   **TypeScript:** Superset de JavaScript para tipagem estática.
*   **SCSS:** Pré-processador CSS.

## Executando com Docker (Instruções a serem adicionadas após criação do Dockerfile)

*(Esta seção será preenchida após a criação do `Dockerfile`)*

```bash
# Exemplo:
# docker build -t erp-turismo-app .
# docker run -p 4200:80 erp-turismo-app
```

