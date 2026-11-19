# Estúdio Força Ativa

Aplicação web para apresentar planos de academia, cadastrar alunos e acompanhar treinos e progresso. Esta publicação contém apenas os arquivos principais do projeto.

## Privacidade

- Não inclua dados reais de alunos, como nomes, e-mails, telefones ou CPF, em commits públicos.
- Registros pessoais de demonstração foram omitidos. Os dados adicionados pelo formulário ficam somente no armazenamento local do navegador (`localStorage`); não há backend configurado.
- Não publique arquivos `.env` nem chaves de API. `.env.example` contém apenas valores ilustrativos.
- O checkout da loja e integrações externas não foram incluídos nesta versão principal.

## Executar localmente

Requer Node.js 20 ou superior.

```bash
npm install
npm run dev
```

Para validar a compilação:

```bash
npm run build
```

## Observação

Esta versão não oferece autenticação segura nem persistência centralizada. Não use dados pessoais reais sem implementar controles de acesso, armazenamento seguro e conformidade com a legislação aplicável.
