# 🎮 Game Store Pro

Este projeto é uma aplicação web moderna desenvolvida em **Angular** (standalone), focada na gestão de uma loja de jogos digitais e periféricos para fins academicos, aplicando o consumo de API REST completa (CRUD) através do `HttpClient` e gerenciamento de estado assíncrono.


### 🔗 Links do Projeto
* **Repositório do Código-Fonte (GitHub):** [https://github.com/Michaelhenri/gamestore-pro-v2-angular](https://github.com/Michaelhenri/gamestore-pro-v2-angular)
* **Aplicação Publicada (GitHub Pages):** [https://michaelhenri.github.io/gamestore-pro-v2-angular/](https://michaelhenri.github.io/gamestore-pro-v2-angular/)

---

### 🔑 Acesso Administrativo para Testes
Para acessar o Painel Administrativo de Gestão de Produtos (`/admin`) e testar as funcionalidades de gerenciamento, utilize as credenciais de Administrador padrão cadastradas no sistema:
* **E-mail:** `admin@teste.com`
* **Senha:** `123456`

---

### 💻 Instruções para Rodar o Projeto Localmente
Como a aplicação consome dados dinâmicos de uma API local (`json-server`), para testar a persistência completa das operações de **Listagem (GET)**, **Cadastro (POST)**, **Edição (PUT)** e **Exclusão (DELETE)** em tempo real, siga o procedimento abaixo:

1. **Clone o repositório em sua máquina:**
   git clone https://github.com/Michaelhenri/gamestore-pro-v2-angular.git

2. **Entre na pasta do projeto:**
   cd gamestore-pro-v2-angular

3. **Instale as dependências do projeto:**
   npm install

4. **Inicie o servidor da API (`json-server`) em um terminal:**
   *(O servidor rodará na porta 3000 utilizando o arquivo `db.json`)*
   npx json-server db.json

5. **Inicie a aplicação Angular em um segundo terminal:**
   ng serve

6. **Acesse no navegador:** 
   Abra `http://localhost:4200/`, faça o login com as credenciais administrativas acima e navegue até a área de gestão para realizar os testes de Listagem (GET), Cadastro (POST), Edição (PUT) e Exclusão (DELETE) dos produtos.

*Nota: Atualmente, as operações de CRUD do painel administrativo refletem diretamente na gestão interna (`/admin`) não tendo modificações na Home.*
