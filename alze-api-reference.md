# alze API Reference — v1

> Documentação completa da API REST do CRM alze. Gerado automaticamente a partir do catálogo de recursos.

## Introdução

A API (Application Programming Interface) é um padrão de programação com conjuntos de instruções cuja finalidade é desenvolver a integração entre diferentes plataformas de software, como o CRM da alze e outra ferramenta que você utilize.

Aqui você vai encontrar a coleção de recursos do CRM alze para realizar a integração com o seu sistema.

### Pontos importantes

- **API RESTful**: todas as nossas rotas são organizadas em torno da arquitetura REST e acessadas via HTTPS.
- **Respostas da API**: todas as respostas da API, incluindo casos de erro, são retornadas em formato JSON.
- **URLs previsíveis**: as URLs são projetadas para serem previsíveis e utilizam os códigos de resposta HTTP padrão para indicar sucesso ou erro.

## Requisitos para começar

- Possuir uma conta ativa no alze.
- As requisições devem ser enviadas no formato JSON.
- Todas as requisições devem incluir o header `Authorization: Bearer SUA_CHAVE`.
- A chave da API é emitida por workspace.
- Um pouco de conhecimento de programação.

## Limites

- Ao utilizar o método **listar** de cada entidade, é possível retornar até **100 registros por página** (parâmetro `page_size`, padrão `25`). Use `page` para navegar entre as páginas.
- Todas as respostas de listagem incluem um objeto `meta` com `total`, `page`, `next` e `prev`.
- A API é segmentada por workspace: a chave só enxerga os dados do workspace ao qual pertence.

## Base URL

```
https://hjjqtkdmxpqzjjlsebfv.supabase.co/functions/v1/public-api
```

## Autenticação

Todos os endpoints exigem o header:

```http
Authorization: Bearer SUA_CHAVE
```

---

# Recursos

## Meta / Health

Endpoints utilitários para verificar o status da API e os dados da chave autenticada.

**Tabela:** `—`

### Health check da API

`GET` `/ping`

Verifica se a API está respondendo e qual workspace/ambiente está vinculado à chave usada.

**Exemplo de Resposta:**

```json
{
  "ok": true,
  "workspace_id": "ws00000-0000-0000-0000-000000000001",
  "environment": "production",
  "timestamp": "2026-05-29T12:00:00Z"
}
```

### Dados da chave autenticada

`GET` `/me`

Retorna os metadados da chave de API utilizada na requisição (sem o segredo).

**Exemplo de Resposta:**

```json
{
  "data": {
    "api_key": {
      "id": "ak00000-0000-0000-0000-000000000001",
      "name": "Integração interna",
      "environment": "production",
      "permissions": [
        "read",
        "write"
      ],
      "last_used_at": "2026-05-29T11:59:00Z",
      "created_at": "2026-01-15T08:00:00Z"
    },
    "workspace_id": "ws00000-0000-0000-0000-000000000001",
    "user_id": "u00000-0000-0000-0000-000000000001"
  }
}
```


## Contatos

Pessoas físicas no CRM. Podem ser vinculadas a uma empresa e a múltiplas negociações. Inclui campos customizados específicos do workspace.

**Tabela:** `persons`

### Listar contatos

`GET` `/contacts`

Retorna a lista paginada de contatos do workspace autenticado, com suporte a busca, filtros e ordenação.

**Query Parameters**

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| page | integer | Não | Número da página (default: 1). |
| page_size | integer | Não | Registros por página (default: 25, máx: 100). |
| order_by | string | Não | Campo de ordenação. Ex.: `created_at`. |
| order_direction | string | Não | Direção da ordenação: `asc` ou `desc` (default: desc). |
| q | string | Não | Busca textual no campo principal do recurso (geralmente `name` ou `title`). |
| status | string | Não | Filtra por status (active|inactive). |
| email | string | Não | Filtra por e-mail exato (case-insensitive). |
| phone | string | Não | Filtra por telefone (ignora formatação). |
| mobile | string | Não | Filtra por celular (ignora formatação). |
| organization_id | uuid | Não | Filtra contatos de uma empresa específica. |

**Exemplo de Resposta:**

```json
{
  "data": [
    {
      "id": "c1a2b3d4-e5f6-7890-abcd-ef1234567890",
      "name": "Mariana Souza",
      "email": "mariana@exemplo.com",
      "phone": "+55 11 3333-3333",
      "mobile": "+55 11 99999-9999",
      "cpf": "123.456.789-00",
      "job_title": "Diretora de Marketing",
      "organization_id": "9f8e7d6c-5b4a-3210-fedc-ba9876543210",
      "city_id": 3550308,
      "status": "active",
      "observation": "Lead vindo do webinar Q2.",
      "custom_fields": {
        "origem_detalhe": "Webinar Q2"
      },
      "created_at": "2026-05-10T14:32:00Z",
      "updated_at": "2026-05-15T09:14:00Z"
    }
  ],
  "meta": {
    "total": 142,
    "page": 1,
    "page_size": 20,
    "next": "/contacts?page=2",
    "prev": null
  }
}
```

### Obter contato

`GET` `/contacts/{id}`

Retorna o registro de um(a) contato pelo ID.

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": "c1a2b3d4-e5f6-7890-abcd-ef1234567890",
    "name": "Mariana Souza",
    "email": "mariana@exemplo.com",
    "phone": "+55 11 3333-3333",
    "mobile": "+55 11 99999-9999",
    "cpf": "123.456.789-00",
    "job_title": "Diretora de Marketing",
    "organization_id": "9f8e7d6c-5b4a-3210-fedc-ba9876543210",
    "city_id": 3550308,
    "status": "active",
    "observation": "Lead vindo do webinar Q2.",
    "custom_fields": {
      "origem_detalhe": "Webinar Q2"
    },
    "created_at": "2026-05-10T14:32:00Z",
    "updated_at": "2026-05-15T09:14:00Z"
  }
}
```

**Exemplo de Erro:**

```json
{
  "error": {
    "code": "not_found",
    "message": "contato não encontrado."
  }
}
```

### Criar contato

`POST` `/contacts`

Cria um(a) novo(a) contato no workspace autenticado.

**Body**

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| name | string | Sim | Nome completo do contato. |
| email | string | Não | E-mail principal. |
| phone | string | Não | Telefone fixo. |
| mobile | string | Não | Telefone celular. |
| cpf | string | Não | CPF do contato. |
| job_title | string | Não | Cargo / função. |
| organization_id | uuid | Não | ID da empresa associada. |
| city_id | integer | Não | ID da cidade (tabela `cities`). |
| status | string (active|inactive) | Não | Status do contato. |
| observation | string | Não | Observações livres em texto. |
| custom_fields | object | Não | Pares chave/valor para campos customizados do workspace. |

**Exemplo de Request Body:**

```json
{
  "name": "Mariana Souza"
}
```

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": "c1a2b3d4-e5f6-7890-abcd-ef1234567890",
    "name": "Mariana Souza",
    "email": "mariana@exemplo.com",
    "phone": "+55 11 3333-3333",
    "mobile": "+55 11 99999-9999",
    "cpf": "123.456.789-00",
    "job_title": "Diretora de Marketing",
    "organization_id": "9f8e7d6c-5b4a-3210-fedc-ba9876543210",
    "city_id": 3550308,
    "status": "active",
    "observation": "Lead vindo do webinar Q2.",
    "custom_fields": {
      "origem_detalhe": "Webinar Q2"
    },
    "created_at": "2026-05-10T14:32:00Z",
    "updated_at": "2026-05-15T09:14:00Z"
  }
}
```

### Atualizar contato

`PUT` `/contacts/{id}`

Atualiza todos os campos editáveis de um(a) contato. Campos omitidos serão limpos.

**Body**

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| name | string | Sim | Nome completo do contato. |
| email | string | Não | E-mail principal. |
| phone | string | Não | Telefone fixo. |
| mobile | string | Não | Telefone celular. |
| cpf | string | Não | CPF do contato. |
| job_title | string | Não | Cargo / função. |
| organization_id | uuid | Não | ID da empresa associada. |
| city_id | integer | Não | ID da cidade (tabela `cities`). |
| status | string (active|inactive) | Não | Status do contato. |
| observation | string | Não | Observações livres em texto. |
| custom_fields | object | Não | Pares chave/valor para campos customizados do workspace. |

**Exemplo de Request Body:**

```json
{
  "name": "Mariana Souza"
}
```

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": "c1a2b3d4-e5f6-7890-abcd-ef1234567890",
    "name": "Mariana Souza",
    "email": "mariana@exemplo.com",
    "phone": "+55 11 3333-3333",
    "mobile": "+55 11 99999-9999",
    "cpf": "123.456.789-00",
    "job_title": "Diretora de Marketing",
    "organization_id": "9f8e7d6c-5b4a-3210-fedc-ba9876543210",
    "city_id": 3550308,
    "status": "active",
    "observation": "Lead vindo do webinar Q2.",
    "custom_fields": {
      "origem_detalhe": "Webinar Q2"
    },
    "created_at": "2026-05-10T14:32:00Z",
    "updated_at": "2026-05-15T09:14:00Z"
  }
}
```

### Atualização parcial de contato

`PATCH` `/contacts/{id}`

Atualiza apenas os campos enviados no body. Use para edições incrementais.

**Body**

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| name | string | Não | Nome completo do contato. |
| email | string | Não | E-mail principal. |
| phone | string | Não | Telefone fixo. |
| mobile | string | Não | Telefone celular. |
| cpf | string | Não | CPF do contato. |
| job_title | string | Não | Cargo / função. |
| organization_id | uuid | Não | ID da empresa associada. |
| city_id | integer | Não | ID da cidade (tabela `cities`). |
| status | string (active|inactive) | Não | Status do contato. |
| observation | string | Não | Observações livres em texto. |
| custom_fields | object | Não | Pares chave/valor para campos customizados do workspace. |

**Exemplo de Request Body:**

```json
{
  "name": "Mariana Souza"
}
```

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": "c1a2b3d4-e5f6-7890-abcd-ef1234567890",
    "name": "Mariana Souza",
    "email": "mariana@exemplo.com",
    "phone": "+55 11 3333-3333",
    "mobile": "+55 11 99999-9999",
    "cpf": "123.456.789-00",
    "job_title": "Diretora de Marketing",
    "organization_id": "9f8e7d6c-5b4a-3210-fedc-ba9876543210",
    "city_id": 3550308,
    "status": "active",
    "observation": "Lead vindo do webinar Q2.",
    "custom_fields": {
      "origem_detalhe": "Webinar Q2"
    },
    "created_at": "2026-05-10T14:32:00Z",
    "updated_at": "2026-05-15T09:14:00Z"
  }
}
```

### Remover contato

`DELETE` `/contacts/{id}`

Move o(a) contato para a lixeira (soft delete). Registros podem ser restaurados em até 60 dias.

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": "c1a2b3d4-e5f6-7890-abcd-ef1234567890",
    "deleted_at": "2026-05-18T12:00:00Z"
  }
}
```

### Listar negociações do contato

`GET` `/contacts/{id}/deals`

Retorna todas as negociações em que o contato é o principal ou um dos participantes.

**Exemplo de Resposta:**

```json
{
  "data": []
}
```

### Listar atividades do contato

`GET` `/contacts/{id}/activities`

Retorna todas as atividades de CRM vinculadas ao contato, ordenadas por vencimento.

**Exemplo de Resposta:**

```json
{
  "data": []
}
```


## Empresas

Empresas no CRM. Agrupam contatos e negociações sob uma mesma entidade comercial.

**Tabela:** `organizations`

### Listar empresas

`GET` `/organizations`

Retorna a lista paginada de empresas do workspace autenticado, com suporte a busca, filtros e ordenação.

**Query Parameters**

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| page | integer | Não | Número da página (default: 1). |
| page_size | integer | Não | Registros por página (default: 25, máx: 100). |
| order_by | string | Não | Campo de ordenação. Ex.: `created_at`. |
| order_direction | string | Não | Direção da ordenação: `asc` ou `desc` (default: desc). |
| q | string | Não | Busca textual no campo principal do recurso (geralmente `name` ou `title`). |
| status | string | Não | Filtra por status (active|inactive). |

**Exemplo de Resposta:**

```json
{
  "data": [
    {
      "id": "9f8e7d6c-5b4a-3210-fedc-ba9876543210",
      "name": "Acme Marketing",
      "cnpj": "12.345.678/0001-99",
      "email": "contato@acme.com.br",
      "phone": "+55 11 4444-4444",
      "website": "https://acme.com.br",
      "facebook": "https://facebook.com/acme",
      "linkedin": "https://linkedin.com/company/acme",
      "status": "active",
      "custom_fields": {
        "setor": "Agência",
        "funcionarios": 150
      },
      "created_at": "2026-04-02T10:00:00Z",
      "updated_at": "2026-05-15T09:14:00Z"
    }
  ],
  "meta": {
    "total": 142,
    "page": 1,
    "page_size": 20,
    "next": "/organizations?page=2",
    "prev": null
  }
}
```

### Obter empresa

`GET` `/organizations/{id}`

Retorna o registro de um(a) empresa pelo ID.

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": "9f8e7d6c-5b4a-3210-fedc-ba9876543210",
    "name": "Acme Marketing",
    "cnpj": "12.345.678/0001-99",
    "email": "contato@acme.com.br",
    "phone": "+55 11 4444-4444",
    "website": "https://acme.com.br",
    "facebook": "https://facebook.com/acme",
    "linkedin": "https://linkedin.com/company/acme",
    "status": "active",
    "custom_fields": {
      "setor": "Agência",
      "funcionarios": 150
    },
    "created_at": "2026-04-02T10:00:00Z",
    "updated_at": "2026-05-15T09:14:00Z"
  }
}
```

**Exemplo de Erro:**

```json
{
  "error": {
    "code": "not_found",
    "message": "empresa não encontrado."
  }
}
```

### Criar empresa

`POST` `/organizations`

Cria um(a) novo(a) empresa no workspace autenticado.

**Body**

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| name | string | Sim | Razão social ou nome fantasia. |
| cnpj | string | Não | CNPJ da empresa. |
| email | string | Não | E-mail de contato. |
| phone | string | Não | Telefone principal. |
| website | string | Não | URL do site da empresa. |
| facebook | string | Não | URL do Facebook. |
| linkedin | string | Não | URL do LinkedIn. |
| status | string (active|inactive) | Não | Status da empresa. |
| custom_fields | object | Não | Campos customizados. |

**Exemplo de Request Body:**

```json
{
  "name": "Acme Marketing"
}
```

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": "9f8e7d6c-5b4a-3210-fedc-ba9876543210",
    "name": "Acme Marketing",
    "cnpj": "12.345.678/0001-99",
    "email": "contato@acme.com.br",
    "phone": "+55 11 4444-4444",
    "website": "https://acme.com.br",
    "facebook": "https://facebook.com/acme",
    "linkedin": "https://linkedin.com/company/acme",
    "status": "active",
    "custom_fields": {
      "setor": "Agência",
      "funcionarios": 150
    },
    "created_at": "2026-04-02T10:00:00Z",
    "updated_at": "2026-05-15T09:14:00Z"
  }
}
```

### Atualizar empresa

`PUT` `/organizations/{id}`

Atualiza todos os campos editáveis de um(a) empresa. Campos omitidos serão limpos.

**Body**

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| name | string | Sim | Razão social ou nome fantasia. |
| cnpj | string | Não | CNPJ da empresa. |
| email | string | Não | E-mail de contato. |
| phone | string | Não | Telefone principal. |
| website | string | Não | URL do site da empresa. |
| facebook | string | Não | URL do Facebook. |
| linkedin | string | Não | URL do LinkedIn. |
| status | string (active|inactive) | Não | Status da empresa. |
| custom_fields | object | Não | Campos customizados. |

**Exemplo de Request Body:**

```json
{
  "name": "Acme Marketing"
}
```

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": "9f8e7d6c-5b4a-3210-fedc-ba9876543210",
    "name": "Acme Marketing",
    "cnpj": "12.345.678/0001-99",
    "email": "contato@acme.com.br",
    "phone": "+55 11 4444-4444",
    "website": "https://acme.com.br",
    "facebook": "https://facebook.com/acme",
    "linkedin": "https://linkedin.com/company/acme",
    "status": "active",
    "custom_fields": {
      "setor": "Agência",
      "funcionarios": 150
    },
    "created_at": "2026-04-02T10:00:00Z",
    "updated_at": "2026-05-15T09:14:00Z"
  }
}
```

### Atualização parcial de empresa

`PATCH` `/organizations/{id}`

Atualiza apenas os campos enviados no body. Use para edições incrementais.

**Body**

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| name | string | Não | Razão social ou nome fantasia. |
| cnpj | string | Não | CNPJ da empresa. |
| email | string | Não | E-mail de contato. |
| phone | string | Não | Telefone principal. |
| website | string | Não | URL do site da empresa. |
| facebook | string | Não | URL do Facebook. |
| linkedin | string | Não | URL do LinkedIn. |
| status | string (active|inactive) | Não | Status da empresa. |
| custom_fields | object | Não | Campos customizados. |

**Exemplo de Request Body:**

```json
{
  "name": "Acme Marketing"
}
```

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": "9f8e7d6c-5b4a-3210-fedc-ba9876543210",
    "name": "Acme Marketing",
    "cnpj": "12.345.678/0001-99",
    "email": "contato@acme.com.br",
    "phone": "+55 11 4444-4444",
    "website": "https://acme.com.br",
    "facebook": "https://facebook.com/acme",
    "linkedin": "https://linkedin.com/company/acme",
    "status": "active",
    "custom_fields": {
      "setor": "Agência",
      "funcionarios": 150
    },
    "created_at": "2026-04-02T10:00:00Z",
    "updated_at": "2026-05-15T09:14:00Z"
  }
}
```

### Remover empresa

`DELETE` `/organizations/{id}`

Move o(a) empresa para a lixeira (soft delete). Registros podem ser restaurados em até 60 dias.

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": "9f8e7d6c-5b4a-3210-fedc-ba9876543210",
    "deleted_at": "2026-05-18T12:00:00Z"
  }
}
```

### Listar contatos da empresa

`GET` `/organizations/{id}/contacts`

Retorna todos os contatos vinculados à empresa.

**Exemplo de Resposta:**

```json
{
  "data": []
}
```

### Listar negociações da empresa

`GET` `/organizations/{id}/deals`

Retorna todas as negociações vinculadas à empresa.

**Exemplo de Resposta:**

```json
{
  "data": []
}
```

### Listar atividades da empresa

`GET` `/organizations/{id}/activities`

Retorna todas as atividades de CRM vinculadas à empresa, ordenadas por vencimento.

**Exemplo de Resposta:**

```json
{
  "data": []
}
```


## Negociações

Oportunidades de venda. Cada negociação pertence a um funil e uma etapa, e pode estar associada a um contato e a uma empresa. Use as ações `PATCH /win`, `PATCH /lose` e `PATCH /stage` para alterar o ciclo de vida.

**Tabela:** `deals`

### Listar negociações

`GET` `/deals`

Retorna a lista paginada de negociações do workspace autenticado, com suporte a busca, filtros e ordenação.

**Query Parameters**

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| page | integer | Não | Número da página (default: 1). |
| page_size | integer | Não | Registros por página (default: 25, máx: 100). |
| order_by | string | Não | Campo de ordenação. Ex.: `created_at`. |
| order_direction | string | Não | Direção da ordenação: `asc` ou `desc` (default: desc). |
| q | string | Não | Busca textual no campo principal do recurso (geralmente `name` ou `title`). |
| pipeline_id | uuid | Não | Filtra por funil. |
| stage_id | uuid | Não | Filtra por etapa. |
| status | string (open|won|lost) | Não | Filtra pelo status da negociação. |
| owner_id | uuid | Não | Filtra por responsável. |
| person_id | uuid | Não | Filtra por contato associado. |
| organization_id | uuid | Não | Filtra por empresa associada. |
| temperature | string | Não | Filtra por temperatura (hot|warm|cold). |

**Exemplo de Resposta:**

```json
{
  "data": [
    {
      "id": "d1234567-89ab-cdef-0123-456789abcdef",
      "title": "Implantação Acme — Plano Enterprise",
      "value": 48500,
      "currency": "BRL",
      "pipeline_id": "p0000000-0000-0000-0000-000000000001",
      "stage_id": "s0000000-0000-0000-0000-000000000003",
      "status": "open",
      "person_id": "c1a2b3d4-e5f6-7890-abcd-ef1234567890",
      "organization_id": "9f8e7d6c-5b4a-3210-fedc-ba9876543210",
      "owner_id": "u123e456-7890-abcd-ef12-345678901234",
      "expected_close_date": "2026-06-30",
      "temperature": "hot",
      "custom_fields": {
        "plano": "Enterprise",
        "horas_vendidas": 120
      },
      "score": 78,
      "created_at": "2026-05-01T08:00:00Z",
      "updated_at": "2026-05-15T12:00:00Z",
      "won_at": null,
      "lost_at": null
    }
  ],
  "meta": {
    "total": 142,
    "page": 1,
    "page_size": 20,
    "next": "/deals?page=2",
    "prev": null
  }
}
```

### Obter negociação

`GET` `/deals/{id}`

Retorna o registro de um(a) negociação pelo ID.

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": "d1234567-89ab-cdef-0123-456789abcdef",
    "title": "Implantação Acme — Plano Enterprise",
    "value": 48500,
    "currency": "BRL",
    "pipeline_id": "p0000000-0000-0000-0000-000000000001",
    "stage_id": "s0000000-0000-0000-0000-000000000003",
    "status": "open",
    "person_id": "c1a2b3d4-e5f6-7890-abcd-ef1234567890",
    "organization_id": "9f8e7d6c-5b4a-3210-fedc-ba9876543210",
    "owner_id": "u123e456-7890-abcd-ef12-345678901234",
    "expected_close_date": "2026-06-30",
    "temperature": "hot",
    "custom_fields": {
      "plano": "Enterprise",
      "horas_vendidas": 120
    },
    "score": 78,
    "created_at": "2026-05-01T08:00:00Z",
    "updated_at": "2026-05-15T12:00:00Z",
    "won_at": null,
    "lost_at": null
  }
}
```

**Exemplo de Erro:**

```json
{
  "error": {
    "code": "not_found",
    "message": "negociação não encontrado."
  }
}
```

### Criar negociação

`POST` `/deals`

Cria um(a) novo(a) negociação no workspace autenticado.

**Body**

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| title | string | Sim | Título da negociação. |
| pipeline_id | uuid | Sim | Funil em que a negociação reside. |
| stage_id | uuid | Sim | Etapa atual dentro do funil. |
| status | string (open|won|lost) | Não | Status da negociação. Default: open. |
| value | decimal | Não | Valor monetário da negociação. |
| currency | string (ISO 4217) | Não | Moeda. Default: BRL. |
| expected_close_date | date (YYYY-MM-DD) | Não | Data prevista de fechamento. |
| owner_id | uuid | Não | Usuário responsável (preenchido com o dono da chave se omitido). |
| person_id | uuid | Não | Contato principal associado. |
| organization_id | uuid | Não | Empresa associada. |
| temperature | string (hot|warm|cold) | Não | Temperatura qualitativa do lead. |
| custom_fields | object | Não | Campos customizados do workspace. |
| lead_origin_id | uuid | Não | Origem (fonte) do lead. |
| origin_group_id | uuid | Não | Grupo de origem. |
| channel_id | uuid | Não | Canal / campanha associada. |

**Exemplo de Request Body:**

```json
{
  "title": "Implantação Acme — Plano Enterprise",
  "pipeline_id": "p0000000-0000-0000-0000-000000000001",
  "stage_id": "s0000000-0000-0000-0000-000000000003"
}
```

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": "d1234567-89ab-cdef-0123-456789abcdef",
    "title": "Implantação Acme — Plano Enterprise",
    "value": 48500,
    "currency": "BRL",
    "pipeline_id": "p0000000-0000-0000-0000-000000000001",
    "stage_id": "s0000000-0000-0000-0000-000000000003",
    "status": "open",
    "person_id": "c1a2b3d4-e5f6-7890-abcd-ef1234567890",
    "organization_id": "9f8e7d6c-5b4a-3210-fedc-ba9876543210",
    "owner_id": "u123e456-7890-abcd-ef12-345678901234",
    "expected_close_date": "2026-06-30",
    "temperature": "hot",
    "custom_fields": {
      "plano": "Enterprise",
      "horas_vendidas": 120
    },
    "score": 78,
    "created_at": "2026-05-01T08:00:00Z",
    "updated_at": "2026-05-15T12:00:00Z",
    "won_at": null,
    "lost_at": null
  }
}
```

### Atualizar negociação

`PUT` `/deals/{id}`

Atualiza todos os campos editáveis de um(a) negociação. Campos omitidos serão limpos.

**Body**

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| title | string | Sim | Título da negociação. |
| pipeline_id | uuid | Sim | Funil em que a negociação reside. |
| stage_id | uuid | Sim | Etapa atual dentro do funil. |
| status | string (open|won|lost) | Não | Status da negociação. Default: open. |
| value | decimal | Não | Valor monetário da negociação. |
| currency | string (ISO 4217) | Não | Moeda. Default: BRL. |
| expected_close_date | date (YYYY-MM-DD) | Não | Data prevista de fechamento. |
| owner_id | uuid | Não | Usuário responsável (preenchido com o dono da chave se omitido). |
| person_id | uuid | Não | Contato principal associado. |
| organization_id | uuid | Não | Empresa associada. |
| temperature | string (hot|warm|cold) | Não | Temperatura qualitativa do lead. |
| custom_fields | object | Não | Campos customizados do workspace. |
| lead_origin_id | uuid | Não | Origem (fonte) do lead. |
| origin_group_id | uuid | Não | Grupo de origem. |
| channel_id | uuid | Não | Canal / campanha associada. |

**Exemplo de Request Body:**

```json
{
  "title": "Implantação Acme — Plano Enterprise",
  "pipeline_id": "p0000000-0000-0000-0000-000000000001",
  "stage_id": "s0000000-0000-0000-0000-000000000003"
}
```

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": "d1234567-89ab-cdef-0123-456789abcdef",
    "title": "Implantação Acme — Plano Enterprise",
    "value": 48500,
    "currency": "BRL",
    "pipeline_id": "p0000000-0000-0000-0000-000000000001",
    "stage_id": "s0000000-0000-0000-0000-000000000003",
    "status": "open",
    "person_id": "c1a2b3d4-e5f6-7890-abcd-ef1234567890",
    "organization_id": "9f8e7d6c-5b4a-3210-fedc-ba9876543210",
    "owner_id": "u123e456-7890-abcd-ef12-345678901234",
    "expected_close_date": "2026-06-30",
    "temperature": "hot",
    "custom_fields": {
      "plano": "Enterprise",
      "horas_vendidas": 120
    },
    "score": 78,
    "created_at": "2026-05-01T08:00:00Z",
    "updated_at": "2026-05-15T12:00:00Z",
    "won_at": null,
    "lost_at": null
  }
}
```

### Atualização parcial de negociação

`PATCH` `/deals/{id}`

Atualiza apenas os campos enviados no body. Use para edições incrementais.

**Body**

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| title | string | Não | Título da negociação. |
| pipeline_id | uuid | Não | Funil em que a negociação reside. |
| stage_id | uuid | Não | Etapa atual dentro do funil. |
| status | string (open|won|lost) | Não | Status da negociação. Default: open. |
| value | decimal | Não | Valor monetário da negociação. |
| currency | string (ISO 4217) | Não | Moeda. Default: BRL. |
| expected_close_date | date (YYYY-MM-DD) | Não | Data prevista de fechamento. |
| owner_id | uuid | Não | Usuário responsável (preenchido com o dono da chave se omitido). |
| person_id | uuid | Não | Contato principal associado. |
| organization_id | uuid | Não | Empresa associada. |
| temperature | string (hot|warm|cold) | Não | Temperatura qualitativa do lead. |
| custom_fields | object | Não | Campos customizados do workspace. |
| lead_origin_id | uuid | Não | Origem (fonte) do lead. |
| origin_group_id | uuid | Não | Grupo de origem. |
| channel_id | uuid | Não | Canal / campanha associada. |

**Exemplo de Request Body:**

```json
{
  "title": "Implantação Acme — Plano Enterprise"
}
```

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": "d1234567-89ab-cdef-0123-456789abcdef",
    "title": "Implantação Acme — Plano Enterprise",
    "value": 48500,
    "currency": "BRL",
    "pipeline_id": "p0000000-0000-0000-0000-000000000001",
    "stage_id": "s0000000-0000-0000-0000-000000000003",
    "status": "open",
    "person_id": "c1a2b3d4-e5f6-7890-abcd-ef1234567890",
    "organization_id": "9f8e7d6c-5b4a-3210-fedc-ba9876543210",
    "owner_id": "u123e456-7890-abcd-ef12-345678901234",
    "expected_close_date": "2026-06-30",
    "temperature": "hot",
    "custom_fields": {
      "plano": "Enterprise",
      "horas_vendidas": 120
    },
    "score": 78,
    "created_at": "2026-05-01T08:00:00Z",
    "updated_at": "2026-05-15T12:00:00Z",
    "won_at": null,
    "lost_at": null
  }
}
```

### Remover negociação

`DELETE` `/deals/{id}`

Move o(a) negociação para a lixeira (soft delete). Registros podem ser restaurados em até 60 dias.

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": "d1234567-89ab-cdef-0123-456789abcdef",
    "deleted_at": "2026-05-18T12:00:00Z"
  }
}
```

### Marcar negociação como ganha

`PATCH` `/deals/{id}/win`

Move a negociação para status `won` e registra `won_at`/`closed_at`. O `won_reason_id` é opcional.

**Body**

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| won_reason_id | integer | Não | ID do motivo de ganho. |
| value | decimal | Não | Sobrescreve o valor final da negociação. |

**Exemplo de Request Body:**

```json
{
  "won_reason_id": 3,
  "value": 48500
}
```

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": "d1234567-89ab-cdef-0123-456789abcdef",
    "title": "Implantação Acme — Plano Enterprise",
    "value": 48500,
    "currency": "BRL",
    "pipeline_id": "p0000000-0000-0000-0000-000000000001",
    "stage_id": "s0000000-0000-0000-0000-000000000003",
    "status": "won",
    "person_id": "c1a2b3d4-e5f6-7890-abcd-ef1234567890",
    "organization_id": "9f8e7d6c-5b4a-3210-fedc-ba9876543210",
    "owner_id": "u123e456-7890-abcd-ef12-345678901234",
    "expected_close_date": "2026-06-30",
    "temperature": "hot",
    "custom_fields": {
      "plano": "Enterprise",
      "horas_vendidas": 120
    },
    "score": 78,
    "created_at": "2026-05-01T08:00:00Z",
    "updated_at": "2026-05-15T12:00:00Z",
    "won_at": "2026-05-18T15:00:00Z",
    "lost_at": null
  }
}
```

### Marcar negociação como perdida

`PATCH` `/deals/{id}/lose`

Move a negociação para status `lost` e registra `lost_at`/`closed_at`.

**Body**

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| loss_reason_id | integer | Não | ID do motivo de perda. |

**Exemplo de Request Body:**

```json
{
  "loss_reason_id": 2
}
```

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": "d1234567-89ab-cdef-0123-456789abcdef",
    "title": "Implantação Acme — Plano Enterprise",
    "value": 48500,
    "currency": "BRL",
    "pipeline_id": "p0000000-0000-0000-0000-000000000001",
    "stage_id": "s0000000-0000-0000-0000-000000000003",
    "status": "lost",
    "person_id": "c1a2b3d4-e5f6-7890-abcd-ef1234567890",
    "organization_id": "9f8e7d6c-5b4a-3210-fedc-ba9876543210",
    "owner_id": "u123e456-7890-abcd-ef12-345678901234",
    "expected_close_date": "2026-06-30",
    "temperature": "hot",
    "custom_fields": {
      "plano": "Enterprise",
      "horas_vendidas": 120
    },
    "score": 78,
    "created_at": "2026-05-01T08:00:00Z",
    "updated_at": "2026-05-15T12:00:00Z",
    "won_at": null,
    "lost_at": "2026-05-18T15:00:00Z"
  }
}
```

### Mover negociação entre etapas

`PATCH` `/deals/{id}/stage`

Atualiza a etapa atual da negociação. A nova etapa precisa pertencer ao mesmo funil.

**Body**

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| stage_id | uuid | Sim | ID da nova etapa. |

**Exemplo de Request Body:**

```json
{
  "stage_id": "s0000000-0000-0000-0000-000000000004"
}
```

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": "d1234567-89ab-cdef-0123-456789abcdef",
    "title": "Implantação Acme — Plano Enterprise",
    "value": 48500,
    "currency": "BRL",
    "pipeline_id": "p0000000-0000-0000-0000-000000000001",
    "stage_id": "s0000000-0000-0000-0000-000000000004",
    "status": "open",
    "person_id": "c1a2b3d4-e5f6-7890-abcd-ef1234567890",
    "organization_id": "9f8e7d6c-5b4a-3210-fedc-ba9876543210",
    "owner_id": "u123e456-7890-abcd-ef12-345678901234",
    "expected_close_date": "2026-06-30",
    "temperature": "hot",
    "custom_fields": {
      "plano": "Enterprise",
      "horas_vendidas": 120
    },
    "score": 78,
    "created_at": "2026-05-01T08:00:00Z",
    "updated_at": "2026-05-15T12:00:00Z",
    "won_at": null,
    "lost_at": null
  }
}
```

### Listar contatos vinculados à negociação

`GET` `/deals/{id}/contacts`

Retorna os contatos vinculados (deal_contacts) a uma negociação.

**Exemplo de Resposta:**

```json
{
  "data": []
}
```

### Vincular contato à negociação

`POST` `/deals/{id}/contacts`

Cria a relação `deal_contacts` entre a negociação e o contato informado.

**Body**

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| person_id | uuid | Sim | ID do contato a vincular. |

**Exemplo de Request Body:**

```json
{
  "person_id": "c1a2b3d4-e5f6-7890-abcd-ef1234567890"
}
```

**Exemplo de Resposta:**

```json
{
  "data": {
    "deal_id": "d1234567-89ab-cdef-0123-456789abcdef",
    "person_id": "c1a2b3d4-e5f6-7890-abcd-ef1234567890"
  }
}
```

### Remover contato da negociação

`DELETE` `/deals/{id}/contacts/{person_id}`

Remove o vínculo entre a negociação e o contato.

### Listar itens da negociação

`GET` `/deals/{id}/items`

Retorna os itens (`deal_items`) associados à negociação.

**Exemplo de Resposta:**

```json
{
  "data": []
}
```

### Adicionar item à negociação

`POST` `/deals/{id}/items`

Adiciona um produto/serviço do catálogo à negociação. `quantity` default = 1, `price` default = preço do item.

**Body**

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| item_id | integer | Sim | ID do item (produto/serviço). |
| quantity | integer | Não | Quantidade (default: 1). |
| price | decimal | Não | Preço unitário (default: preço cadastrado do item). |

**Exemplo de Request Body:**

```json
{
  "item_id": 1,
  "quantity": 2,
  "price": 4850
}
```

**Exemplo de Resposta:**

```json
{
  "data": {
    "deal_id": "d1234567-89ab-cdef-0123-456789abcdef",
    "item_id": 1,
    "quantity": 2,
    "price": 4850
  }
}
```


## Notas de negociação

Notas livres associadas a uma negociação. Listagem e criação são feitas via /deals/{id}/notes; consulta, edição e exclusão pelo recurso direto /deal-notes/{id}.

**Tabela:** `deal_notes`

### Listar notas de uma negociação

`GET` `/deals/{id}/notes`

Retorna todas as notas da negociação, com as fixadas (pinned=true) no topo.

**Exemplo de Resposta:**

```json
{
  "data": [
    {
      "id": "dn00000-0000-0000-0000-000000000001",
      "deal_id": "d1234567-89ab-cdef-0123-456789abcdef",
      "content": "Cliente pediu desconto adicional de 10%.",
      "pinned": false,
      "created_by": "u00000-0000-0000-0000-000000000001",
      "created_at": "2026-05-15T10:00:00Z",
      "updated_at": "2026-05-15T10:00:00Z"
    }
  ],
  "meta": {
    "total": 1,
    "page": 1,
    "page_size": 1,
    "next": null,
    "prev": null
  }
}
```

### Criar nota em uma negociação

`POST` `/deals/{id}/notes`

Cria uma nova nota vinculada à negociação.

**Body**

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| content | string | Sim | Conteúdo da nota (texto livre). |
| pinned | boolean | Não | Marca a nota como fixada no topo. |

**Exemplo de Request Body:**

```json
{
  "content": "Cliente pediu desconto adicional de 10%.",
  "pinned": false
}
```

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": "dn00000-0000-0000-0000-000000000001",
    "deal_id": "d1234567-89ab-cdef-0123-456789abcdef",
    "content": "Cliente pediu desconto adicional de 10%.",
    "pinned": false,
    "created_by": "u00000-0000-0000-0000-000000000001",
    "created_at": "2026-05-15T10:00:00Z",
    "updated_at": "2026-05-15T10:00:00Z"
  }
}
```

### Obter nota de negociação

`GET` `/deal-notes/{id}`

Retorna uma nota pelo ID.

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": "dn00000-0000-0000-0000-000000000001",
    "deal_id": "d1234567-89ab-cdef-0123-456789abcdef",
    "content": "Cliente pediu desconto adicional de 10%.",
    "pinned": false,
    "created_by": "u00000-0000-0000-0000-000000000001",
    "created_at": "2026-05-15T10:00:00Z",
    "updated_at": "2026-05-15T10:00:00Z"
  }
}
```

**Exemplo de Erro:**

```json
{
  "error": {
    "code": "not_found",
    "message": "Nota não encontrada."
  }
}
```

### Atualizar nota de negociação

`PATCH` `/deal-notes/{id}`

Atualiza o conteúdo e/ou o estado de fixação da nota.

**Body**

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| content | string | Não | Novo conteúdo. |
| pinned | boolean | Não | Fixar/desafixar a nota. |

**Exemplo de Request Body:**

```json
{
  "pinned": true
}
```

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": "dn00000-0000-0000-0000-000000000001",
    "deal_id": "d1234567-89ab-cdef-0123-456789abcdef",
    "content": "Cliente pediu desconto adicional de 10%.",
    "pinned": true,
    "created_by": "u00000-0000-0000-0000-000000000001",
    "created_at": "2026-05-15T10:00:00Z",
    "updated_at": "2026-05-15T10:00:00Z"
  }
}
```

### Remover nota de negociação

`DELETE` `/deal-notes/{id}`

Remove definitivamente a nota.


## Atividades

Tarefas e atividades comerciais (ligações, reuniões, e-mails) vinculadas a negociações e contatos.

**Tabela:** `tasks`

### Listar atividades

`GET` `/activities`

Lista paginada de atividades de CRM do workspace, com filtros por negociação, contato, empresa e status.

**Query Parameters**

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| page | integer | Não | Número da página (default: 1). |
| page_size | integer | Não | Registros por página (default: 25, máx: 100). |
| deal_id | uuid | Não | Filtra atividades de uma negociação. |
| person_id | uuid | Não | Filtra por contato vinculado. |
| organization_id | uuid | Não | Filtra por empresa vinculada. |
| status | string | Não | Filtra por status (open|done|canceled). |

**Exemplo de Resposta:**

```json
{
  "data": [
    {
      "id": "a1111111-2222-3333-4444-555555555555",
      "title": "Ligar para Mariana — apresentar proposta",
      "description": "Confirmar escopo do plano Enterprise.",
      "status": "open",
      "due_date": "2026-05-20",
      "due_time": "14:00:00",
      "activity_type_id": "at000000-0000-0000-0000-000000000001",
      "deal_id": "d1234567-89ab-cdef-0123-456789abcdef",
      "person_id": "c1a2b3d4-e5f6-7890-abcd-ef1234567890",
      "organization_id": "9f8e7d6c-5b4a-3210-fedc-ba9876543210",
      "completed_at": null,
      "created_at": "2026-05-15T10:00:00Z",
      "updated_at": "2026-05-15T10:00:00Z"
    }
  ],
  "meta": {
    "total": 84,
    "page": 1,
    "page_size": 25,
    "next": "/activities?page=2",
    "prev": null
  }
}
```

### Obter atividade

`GET` `/activities/{id}`

Retorna uma atividade pelo ID.

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": "a1111111-2222-3333-4444-555555555555",
    "title": "Ligar para Mariana — apresentar proposta",
    "description": "Confirmar escopo do plano Enterprise.",
    "status": "open",
    "due_date": "2026-05-20",
    "due_time": "14:00:00",
    "activity_type_id": "at000000-0000-0000-0000-000000000001",
    "deal_id": "d1234567-89ab-cdef-0123-456789abcdef",
    "person_id": "c1a2b3d4-e5f6-7890-abcd-ef1234567890",
    "organization_id": "9f8e7d6c-5b4a-3210-fedc-ba9876543210",
    "completed_at": null,
    "created_at": "2026-05-15T10:00:00Z",
    "updated_at": "2026-05-15T10:00:00Z"
  }
}
```

**Exemplo de Erro:**

```json
{
  "error": {
    "code": "not_found",
    "message": "Atividade não encontrada."
  }
}
```

### Criar atividade

`POST` `/activities`

Cria uma nova atividade de CRM. O tipo de tarefa (`task_type_id`) padrão do workspace é aplicado automaticamente.

**Body**

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| title | string | Sim | Título da atividade. |
| deal_id | uuid | Sim | Negociação vinculada. |
| due_date | date (YYYY-MM-DD) | Sim | Data prevista. |
| due_time | time (HH:MM:SS) | Não | Horário previsto. |
| description | string | Não | Detalhes / observações em texto. |
| activity_type_id | uuid | Não | Tipo da atividade (ver `/activity-types`). |
| person_id | uuid | Não | Contato vinculado. |
| organization_id | uuid | Não | Empresa vinculada. |
| status | string (open|done|canceled) | Não | Status atual (default: open). |

**Exemplo de Request Body:**

```json
{
  "title": "Ligar para Mariana — apresentar proposta",
  "deal_id": "d1234567-89ab-cdef-0123-456789abcdef",
  "due_date": "2026-05-20"
}
```

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": "a1111111-2222-3333-4444-555555555555",
    "title": "Ligar para Mariana — apresentar proposta",
    "description": "Confirmar escopo do plano Enterprise.",
    "status": "open",
    "due_date": "2026-05-20",
    "due_time": "14:00:00",
    "activity_type_id": "at000000-0000-0000-0000-000000000001",
    "deal_id": "d1234567-89ab-cdef-0123-456789abcdef",
    "person_id": "c1a2b3d4-e5f6-7890-abcd-ef1234567890",
    "organization_id": "9f8e7d6c-5b4a-3210-fedc-ba9876543210",
    "completed_at": null,
    "created_at": "2026-05-15T10:00:00Z",
    "updated_at": "2026-05-15T10:00:00Z"
  }
}
```

### Atualizar atividade

`PUT` `/activities/{id}`

Atualiza os campos editáveis de uma atividade.

**Body**

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| title | string | Não | Título da atividade. |
| deal_id | uuid | Não | Negociação vinculada. |
| due_date | date (YYYY-MM-DD) | Não | Data prevista. |
| due_time | time (HH:MM:SS) | Não | Horário previsto. |
| description | string | Não | Detalhes / observações em texto. |
| activity_type_id | uuid | Não | Tipo da atividade (ver `/activity-types`). |
| person_id | uuid | Não | Contato vinculado. |
| organization_id | uuid | Não | Empresa vinculada. |
| status | string (open|done|canceled) | Não | Status atual (default: open). |

**Exemplo de Request Body:**

```json
{
  "status": "done"
}
```

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": "a1111111-2222-3333-4444-555555555555",
    "title": "Ligar para Mariana — apresentar proposta",
    "description": "Confirmar escopo do plano Enterprise.",
    "status": "done",
    "due_date": "2026-05-20",
    "due_time": "14:00:00",
    "activity_type_id": "at000000-0000-0000-0000-000000000001",
    "deal_id": "d1234567-89ab-cdef-0123-456789abcdef",
    "person_id": "c1a2b3d4-e5f6-7890-abcd-ef1234567890",
    "organization_id": "9f8e7d6c-5b4a-3210-fedc-ba9876543210",
    "completed_at": null,
    "created_at": "2026-05-15T10:00:00Z",
    "updated_at": "2026-05-15T10:00:00Z"
  }
}
```

### Remover atividade

`DELETE` `/activities/{id}`

Soft delete da atividade (move para a lixeira).

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": "a1111111-2222-3333-4444-555555555555",
    "deleted_at": "2026-05-18T12:00:00Z"
  }
}
```

### Concluir atividade

`PATCH` `/activities/{id}/complete`

Marca a atividade como `done`. Não exige corpo.

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": "a1111111-2222-3333-4444-555555555555",
    "title": "Ligar para Mariana — apresentar proposta",
    "description": "Confirmar escopo do plano Enterprise.",
    "status": "done",
    "due_date": "2026-05-20",
    "due_time": "14:00:00",
    "activity_type_id": "at000000-0000-0000-0000-000000000001",
    "deal_id": "d1234567-89ab-cdef-0123-456789abcdef",
    "person_id": "c1a2b3d4-e5f6-7890-abcd-ef1234567890",
    "organization_id": "9f8e7d6c-5b4a-3210-fedc-ba9876543210",
    "completed_at": null,
    "created_at": "2026-05-15T10:00:00Z",
    "updated_at": "2026-05-15T10:00:00Z"
  }
}
```


## Produtos / Itens

Produtos e serviços do catálogo, que podem ser associados a negociações. O `id` é um inteiro sequencial.

**Tabela:** `items`

### Listar produtos

`GET` `/items`

Retorna a lista paginada de produtos do workspace autenticado, com suporte a busca, filtros e ordenação.

**Query Parameters**

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| page | integer | Não | Número da página (default: 1). |
| page_size | integer | Não | Registros por página (default: 25, máx: 100). |
| order_by | string | Não | Campo de ordenação. Ex.: `created_at`. |
| order_direction | string | Não | Direção da ordenação: `asc` ou `desc` (default: desc). |
| q | string | Não | Busca textual no campo principal do recurso (geralmente `name` ou `title`). |
| category_id | integer | Não | Filtra por categoria. |
| type | string | Não | Filtra por tipo (product|service). |

**Exemplo de Resposta:**

```json
{
  "data": [
    {
      "id": 1,
      "name": "Plano Enterprise",
      "type": "service",
      "price": 4850,
      "currency": "BRL",
      "category_id": 1,
      "created_at": "2026-01-10T00:00:00Z"
    }
  ],
  "meta": {
    "total": 142,
    "page": 1,
    "page_size": 20,
    "next": "/items?page=2",
    "prev": null
  }
}
```

### Obter produto

`GET` `/items/{id}`

Retorna o registro de um(a) produto pelo ID.

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": 1,
    "name": "Plano Enterprise",
    "type": "service",
    "price": 4850,
    "currency": "BRL",
    "category_id": 1,
    "created_at": "2026-01-10T00:00:00Z"
  }
}
```

**Exemplo de Erro:**

```json
{
  "error": {
    "code": "not_found",
    "message": "produto não encontrado."
  }
}
```

### Criar produto

`POST` `/items`

Cria um(a) novo(a) produto no workspace autenticado.

**Body**

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| name | string | Sim | Nome do produto/serviço. |
| type | string (product|service) | Sim | Se é um produto físico ou serviço. |
| price | decimal | Não | Preço unitário. |
| currency | string (ISO 4217) | Não | Moeda. Ex.: BRL, USD. |
| category_id | integer | Não | ID da categoria (ver `/item-categories`). |

**Exemplo de Request Body:**

```json
{
  "name": "Plano Enterprise",
  "type": "service"
}
```

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": 1,
    "name": "Plano Enterprise",
    "type": "service",
    "price": 4850,
    "currency": "BRL",
    "category_id": 1,
    "created_at": "2026-01-10T00:00:00Z"
  }
}
```

### Atualizar produto

`PUT` `/items/{id}`

Atualiza todos os campos editáveis de um(a) produto. Campos omitidos serão limpos.

**Body**

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| name | string | Sim | Nome do produto/serviço. |
| type | string (product|service) | Sim | Se é um produto físico ou serviço. |
| price | decimal | Não | Preço unitário. |
| currency | string (ISO 4217) | Não | Moeda. Ex.: BRL, USD. |
| category_id | integer | Não | ID da categoria (ver `/item-categories`). |

**Exemplo de Request Body:**

```json
{
  "name": "Plano Enterprise",
  "type": "service"
}
```

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": 1,
    "name": "Plano Enterprise",
    "type": "service",
    "price": 4850,
    "currency": "BRL",
    "category_id": 1,
    "created_at": "2026-01-10T00:00:00Z"
  }
}
```

### Atualização parcial de produto

`PATCH` `/items/{id}`

Atualiza apenas os campos enviados no body. Use para edições incrementais.

**Body**

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| name | string | Não | Nome do produto/serviço. |
| type | string (product|service) | Não | Se é um produto físico ou serviço. |
| price | decimal | Não | Preço unitário. |
| currency | string (ISO 4217) | Não | Moeda. Ex.: BRL, USD. |
| category_id | integer | Não | ID da categoria (ver `/item-categories`). |

**Exemplo de Request Body:**

```json
{
  "name": "Plano Enterprise"
}
```

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": 1,
    "name": "Plano Enterprise",
    "type": "service",
    "price": 4850,
    "currency": "BRL",
    "category_id": 1,
    "created_at": "2026-01-10T00:00:00Z"
  }
}
```

### Remover produto

`DELETE` `/items/{id}`

Move o(a) produto para a lixeira (soft delete). Registros podem ser restaurados em até 60 dias.

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": 1,
    "deleted_at": "2026-05-18T12:00:00Z"
  }
}
```


## Categorias de produtos

Categorias que agrupam produtos/serviços do catálogo. O id é um inteiro sequencial.

**Tabela:** `item_categories`

### Listar categorias de produto

`GET` `/item-categories`

Retorna a lista paginada de categorias de produto do workspace autenticado, com suporte a busca, filtros e ordenação.

**Query Parameters**

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| page | integer | Não | Número da página (default: 1). |
| page_size | integer | Não | Registros por página (default: 25, máx: 100). |
| order_by | string | Não | Campo de ordenação. Ex.: `created_at`. |
| order_direction | string | Não | Direção da ordenação: `asc` ou `desc` (default: desc). |
| q | string | Não | Busca textual no campo principal do recurso (geralmente `name` ou `title`). |

**Exemplo de Resposta:**

```json
{
  "data": [
    {
      "id": 1,
      "name": "Software",
      "created_at": "2026-01-10T00:00:00Z"
    }
  ],
  "meta": {
    "total": 142,
    "page": 1,
    "page_size": 20,
    "next": "/item-categories?page=2",
    "prev": null
  }
}
```

### Obter categoria de produto

`GET` `/item-categories/{id}`

Retorna o registro de um(a) categoria de produto pelo ID.

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": 1,
    "name": "Software",
    "created_at": "2026-01-10T00:00:00Z"
  }
}
```

**Exemplo de Erro:**

```json
{
  "error": {
    "code": "not_found",
    "message": "categoria de produto não encontrado."
  }
}
```

### Criar categoria de produto

`POST` `/item-categories`

Cria um(a) novo(a) categoria de produto no workspace autenticado.

**Body**

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| name | string | Sim | Nome da categoria. |

**Exemplo de Request Body:**

```json
{
  "name": "Software"
}
```

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": 1,
    "name": "Software",
    "created_at": "2026-01-10T00:00:00Z"
  }
}
```

### Atualizar categoria de produto

`PUT` `/item-categories/{id}`

Atualiza todos os campos editáveis de um(a) categoria de produto. Campos omitidos serão limpos.

**Body**

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| name | string | Sim | Nome da categoria. |

**Exemplo de Request Body:**

```json
{
  "name": "Software"
}
```

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": 1,
    "name": "Software",
    "created_at": "2026-01-10T00:00:00Z"
  }
}
```

### Atualização parcial de categoria de produto

`PATCH` `/item-categories/{id}`

Atualiza apenas os campos enviados no body. Use para edições incrementais.

**Body**

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| name | string | Não | Nome da categoria. |

**Exemplo de Request Body:**

```json
{
  "name": "Software"
}
```

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": 1,
    "name": "Software",
    "created_at": "2026-01-10T00:00:00Z"
  }
}
```

### Remover categoria de produto

`DELETE` `/item-categories/{id}`

Move o(a) categoria de produto para a lixeira (soft delete). Registros podem ser restaurados em até 60 dias.

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": 1,
    "deleted_at": "2026-05-18T12:00:00Z"
  }
}
```


## Funis (Pipelines)

Funis de vendas. Cada funil contém múltiplas etapas (stages) ordenadas. Para listar as etapas de um funil, use `GET /stages?pipeline_id={id}`.

**Tabela:** `pipelines`

### Listar funis

`GET` `/pipelines`

Retorna a lista paginada de funis do workspace autenticado, com suporte a busca, filtros e ordenação.

**Query Parameters**

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| page | integer | Não | Número da página (default: 1). |
| page_size | integer | Não | Registros por página (default: 25, máx: 100). |
| order_by | string | Não | Campo de ordenação. Ex.: `created_at`. |
| order_direction | string | Não | Direção da ordenação: `asc` ou `desc` (default: desc). |
| q | string | Não | Busca textual no campo principal do recurso (geralmente `name` ou `title`). |

**Exemplo de Resposta:**

```json
{
  "data": [
    {
      "id": "p0000000-0000-0000-0000-000000000001",
      "name": "Vendas Inbound",
      "position": 1,
      "is_default": true,
      "created_at": "2026-01-01T00:00:00Z"
    }
  ],
  "meta": {
    "total": 142,
    "page": 1,
    "page_size": 20,
    "next": "/pipelines?page=2",
    "prev": null
  }
}
```

### Obter funil

`GET` `/pipelines/{id}`

Retorna o registro de um(a) funil pelo ID.

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": "p0000000-0000-0000-0000-000000000001",
    "name": "Vendas Inbound",
    "position": 1,
    "is_default": true,
    "created_at": "2026-01-01T00:00:00Z"
  }
}
```

**Exemplo de Erro:**

```json
{
  "error": {
    "code": "not_found",
    "message": "funil não encontrado."
  }
}
```

### Criar funil

`POST` `/pipelines`

Cria um(a) novo(a) funil no workspace autenticado.

**Body**

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| name | string | Sim | Nome do funil. |
| position | integer | Não | Ordem de exibição. |
| is_default | boolean | Não | Define se é o funil padrão do workspace. |

**Exemplo de Request Body:**

```json
{
  "name": "Vendas Inbound"
}
```

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": "p0000000-0000-0000-0000-000000000001",
    "name": "Vendas Inbound",
    "position": 1,
    "is_default": true,
    "created_at": "2026-01-01T00:00:00Z"
  }
}
```

### Atualizar funil

`PUT` `/pipelines/{id}`

Atualiza todos os campos editáveis de um(a) funil. Campos omitidos serão limpos.

**Body**

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| name | string | Sim | Nome do funil. |
| position | integer | Não | Ordem de exibição. |
| is_default | boolean | Não | Define se é o funil padrão do workspace. |

**Exemplo de Request Body:**

```json
{
  "name": "Vendas Inbound"
}
```

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": "p0000000-0000-0000-0000-000000000001",
    "name": "Vendas Inbound",
    "position": 1,
    "is_default": true,
    "created_at": "2026-01-01T00:00:00Z"
  }
}
```

### Atualização parcial de funil

`PATCH` `/pipelines/{id}`

Atualiza apenas os campos enviados no body. Use para edições incrementais.

**Body**

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| name | string | Não | Nome do funil. |
| position | integer | Não | Ordem de exibição. |
| is_default | boolean | Não | Define se é o funil padrão do workspace. |

**Exemplo de Request Body:**

```json
{
  "name": "Vendas Inbound"
}
```

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": "p0000000-0000-0000-0000-000000000001",
    "name": "Vendas Inbound",
    "position": 1,
    "is_default": true,
    "created_at": "2026-01-01T00:00:00Z"
  }
}
```

### Remover funil

`DELETE` `/pipelines/{id}`

Move o(a) funil para a lixeira (soft delete). Registros podem ser restaurados em até 60 dias.

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": "p0000000-0000-0000-0000-000000000001",
    "deleted_at": "2026-05-18T12:00:00Z"
  }
}
```


## Etapas (Stages)

Etapas que compõem cada funil de vendas. Recurso **somente leitura** via API — criação e edição são feitas pela tela de Funis.

**Tabela:** `stages`

### Listar etapas de um funil

`GET` `/stages`

Retorna todas as etapas de um funil, ordenadas por `position`.

**Query Parameters**

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| pipeline_id | uuid | Sim | ID do funil. |

**Exemplo de Resposta:**

```json
{
  "data": [
    {
      "id": "s0000000-0000-0000-0000-000000000003",
      "pipeline_id": "p0000000-0000-0000-0000-000000000001",
      "name": "Proposta enviada",
      "position": 3,
      "probability": 60,
      "created_at": "2026-01-01T00:00:00Z"
    }
  ],
  "meta": {
    "total": 1,
    "page": 1,
    "page_size": 1,
    "next": null,
    "prev": null
  }
}
```

### Obter etapa

`GET` `/stages/{id}`

Retorna uma etapa pelo ID.

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": "s0000000-0000-0000-0000-000000000003",
    "pipeline_id": "p0000000-0000-0000-0000-000000000001",
    "name": "Proposta enviada",
    "position": 3,
    "probability": 60,
    "created_at": "2026-01-01T00:00:00Z"
  }
}
```

**Exemplo de Erro:**

```json
{
  "error": {
    "code": "not_found",
    "message": "Etapa não encontrada."
  }
}
```


## Motivos de perda

Catálogo de motivos de perda usado ao marcar uma negociação como perdida.

**Tabela:** `loss_reasons`

### Listar motivos de perda

`GET` `/loss-reasons`

Retorna a lista paginada de motivos de perda do workspace autenticado, com suporte a busca, filtros e ordenação.

**Query Parameters**

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| page | integer | Não | Número da página (default: 1). |
| page_size | integer | Não | Registros por página (default: 25, máx: 100). |
| order_by | string | Não | Campo de ordenação. Ex.: `created_at`. |
| order_direction | string | Não | Direção da ordenação: `asc` ou `desc` (default: desc). |
| q | string | Não | Busca textual no campo principal do recurso (geralmente `name` ou `title`). |

**Exemplo de Resposta:**

```json
{
  "data": [
    {
      "id": 2,
      "name": "Preço acima do orçamento",
      "is_default": false
    }
  ],
  "meta": {
    "total": 142,
    "page": 1,
    "page_size": 20,
    "next": "/loss-reasons?page=2",
    "prev": null
  }
}
```

### Obter motivo de perda

`GET` `/loss-reasons/{id}`

Retorna o registro de um(a) motivo de perda pelo ID.

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": 2,
    "name": "Preço acima do orçamento",
    "is_default": false
  }
}
```

**Exemplo de Erro:**

```json
{
  "error": {
    "code": "not_found",
    "message": "motivo de perda não encontrado."
  }
}
```

### Criar motivo de perda

`POST` `/loss-reasons`

Cria um(a) novo(a) motivo de perda no workspace autenticado.

**Body**

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| name | string | Sim | Descrição do motivo. |
| is_default | boolean | Não | Marca como motivo padrão do workspace. |

**Exemplo de Request Body:**

```json
{
  "name": "Preço acima do orçamento"
}
```

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": 2,
    "name": "Preço acima do orçamento",
    "is_default": false
  }
}
```

### Atualizar motivo de perda

`PUT` `/loss-reasons/{id}`

Atualiza todos os campos editáveis de um(a) motivo de perda. Campos omitidos serão limpos.

**Body**

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| name | string | Sim | Descrição do motivo. |
| is_default | boolean | Não | Marca como motivo padrão do workspace. |

**Exemplo de Request Body:**

```json
{
  "name": "Preço acima do orçamento"
}
```

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": 2,
    "name": "Preço acima do orçamento",
    "is_default": false
  }
}
```

### Atualização parcial de motivo de perda

`PATCH` `/loss-reasons/{id}`

Atualiza apenas os campos enviados no body. Use para edições incrementais.

**Body**

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| name | string | Não | Descrição do motivo. |
| is_default | boolean | Não | Marca como motivo padrão do workspace. |

**Exemplo de Request Body:**

```json
{
  "name": "Preço acima do orçamento"
}
```

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": 2,
    "name": "Preço acima do orçamento",
    "is_default": false
  }
}
```

### Remover motivo de perda

`DELETE` `/loss-reasons/{id}`

Move o(a) motivo de perda para a lixeira (soft delete). Registros podem ser restaurados em até 60 dias.

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": 2,
    "deleted_at": "2026-05-18T12:00:00Z"
  }
}
```


## Motivos de ganho

Catálogo de motivos de ganho usado ao marcar uma negociação como ganha.

**Tabela:** `won_reasons`

### Listar motivos de ganho

`GET` `/win-reasons`

Retorna a lista paginada de motivos de ganho do workspace autenticado, com suporte a busca, filtros e ordenação.

**Query Parameters**

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| page | integer | Não | Número da página (default: 1). |
| page_size | integer | Não | Registros por página (default: 25, máx: 100). |
| order_by | string | Não | Campo de ordenação. Ex.: `created_at`. |
| order_direction | string | Não | Direção da ordenação: `asc` ou `desc` (default: desc). |
| q | string | Não | Busca textual no campo principal do recurso (geralmente `name` ou `title`). |

**Exemplo de Resposta:**

```json
{
  "data": [
    {
      "id": 3,
      "name": "Melhor preço",
      "is_default": false
    }
  ],
  "meta": {
    "total": 142,
    "page": 1,
    "page_size": 20,
    "next": "/win-reasons?page=2",
    "prev": null
  }
}
```

### Obter motivo de ganho

`GET` `/win-reasons/{id}`

Retorna o registro de um(a) motivo de ganho pelo ID.

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": 3,
    "name": "Melhor preço",
    "is_default": false
  }
}
```

**Exemplo de Erro:**

```json
{
  "error": {
    "code": "not_found",
    "message": "motivo de ganho não encontrado."
  }
}
```

### Criar motivo de ganho

`POST` `/win-reasons`

Cria um(a) novo(a) motivo de ganho no workspace autenticado.

**Body**

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| name | string | Sim | Descrição do motivo de ganho. |
| is_default | boolean | Não | Marca como motivo padrão do workspace. |

**Exemplo de Request Body:**

```json
{
  "name": "Melhor preço"
}
```

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": 3,
    "name": "Melhor preço",
    "is_default": false
  }
}
```

### Atualizar motivo de ganho

`PUT` `/win-reasons/{id}`

Atualiza todos os campos editáveis de um(a) motivo de ganho. Campos omitidos serão limpos.

**Body**

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| name | string | Sim | Descrição do motivo de ganho. |
| is_default | boolean | Não | Marca como motivo padrão do workspace. |

**Exemplo de Request Body:**

```json
{
  "name": "Melhor preço"
}
```

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": 3,
    "name": "Melhor preço",
    "is_default": false
  }
}
```

### Atualização parcial de motivo de ganho

`PATCH` `/win-reasons/{id}`

Atualiza apenas os campos enviados no body. Use para edições incrementais.

**Body**

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| name | string | Não | Descrição do motivo de ganho. |
| is_default | boolean | Não | Marca como motivo padrão do workspace. |

**Exemplo de Request Body:**

```json
{
  "name": "Melhor preço"
}
```

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": 3,
    "name": "Melhor preço",
    "is_default": false
  }
}
```

### Remover motivo de ganho

`DELETE` `/win-reasons/{id}`

Move o(a) motivo de ganho para a lixeira (soft delete). Registros podem ser restaurados em até 60 dias.

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": 3,
    "deleted_at": "2026-05-18T12:00:00Z"
  }
}
```


## Tags

Tags do workspace, usadas para classificar contatos, empresas e negociações.

**Tabela:** `workspace_tags`

### Listar tags

`GET` `/tags`

Retorna a lista paginada de tags do workspace autenticado, com suporte a busca, filtros e ordenação.

**Query Parameters**

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| page | integer | Não | Número da página (default: 1). |
| page_size | integer | Não | Registros por página (default: 25, máx: 100). |
| order_by | string | Não | Campo de ordenação. Ex.: `created_at`. |
| order_direction | string | Não | Direção da ordenação: `asc` ou `desc` (default: desc). |
| q | string | Não | Busca textual no campo principal do recurso (geralmente `name` ou `title`). |

**Exemplo de Resposta:**

```json
{
  "data": [
    {
      "id": "tg00000-0000-0000-0000-000000000001",
      "name": "VIP",
      "color": "#FF6B6B",
      "created_at": "2026-01-10T00:00:00Z"
    }
  ],
  "meta": {
    "total": 142,
    "page": 1,
    "page_size": 20,
    "next": "/tags?page=2",
    "prev": null
  }
}
```

### Obter tag

`GET` `/tags/{id}`

Retorna o registro de um(a) tag pelo ID.

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": "tg00000-0000-0000-0000-000000000001",
    "name": "VIP",
    "color": "#FF6B6B",
    "created_at": "2026-01-10T00:00:00Z"
  }
}
```

**Exemplo de Erro:**

```json
{
  "error": {
    "code": "not_found",
    "message": "tag não encontrado."
  }
}
```

### Criar tag

`POST` `/tags`

Cria um(a) novo(a) tag no workspace autenticado.

**Body**

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| name | string | Sim | Nome da tag. |
| color | string | Não | Cor em hex (ex.: #FF6B6B). |

**Exemplo de Request Body:**

```json
{
  "name": "VIP"
}
```

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": "tg00000-0000-0000-0000-000000000001",
    "name": "VIP",
    "color": "#FF6B6B",
    "created_at": "2026-01-10T00:00:00Z"
  }
}
```

### Atualizar tag

`PUT` `/tags/{id}`

Atualiza todos os campos editáveis de um(a) tag. Campos omitidos serão limpos.

**Body**

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| name | string | Sim | Nome da tag. |
| color | string | Não | Cor em hex (ex.: #FF6B6B). |

**Exemplo de Request Body:**

```json
{
  "name": "VIP"
}
```

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": "tg00000-0000-0000-0000-000000000001",
    "name": "VIP",
    "color": "#FF6B6B",
    "created_at": "2026-01-10T00:00:00Z"
  }
}
```

### Atualização parcial de tag

`PATCH` `/tags/{id}`

Atualiza apenas os campos enviados no body. Use para edições incrementais.

**Body**

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| name | string | Não | Nome da tag. |
| color | string | Não | Cor em hex (ex.: #FF6B6B). |

**Exemplo de Request Body:**

```json
{
  "name": "VIP"
}
```

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": "tg00000-0000-0000-0000-000000000001",
    "name": "VIP",
    "color": "#FF6B6B",
    "created_at": "2026-01-10T00:00:00Z"
  }
}
```

### Remover tag

`DELETE` `/tags/{id}`

Move o(a) tag para a lixeira (soft delete). Registros podem ser restaurados em até 60 dias.

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": "tg00000-0000-0000-0000-000000000001",
    "deleted_at": "2026-05-18T12:00:00Z"
  }
}
```


## Origens (Fontes)

Origens (fontes) de leads usadas em negociações para rastreamento de marketing.

**Tabela:** `crm_lead_origins`

### Listar origens

`GET` `/lead-origins`

Retorna a lista paginada de origens do workspace autenticado, com suporte a busca, filtros e ordenação.

**Query Parameters**

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| page | integer | Não | Número da página (default: 1). |
| page_size | integer | Não | Registros por página (default: 25, máx: 100). |
| order_by | string | Não | Campo de ordenação. Ex.: `created_at`. |
| order_direction | string | Não | Direção da ordenação: `asc` ou `desc` (default: desc). |
| q | string | Não | Busca textual no campo principal do recurso (geralmente `name` ou `title`). |
| group_id | uuid | Não | Filtra por grupo de origem. |

**Exemplo de Resposta:**

```json
{
  "data": [
    {
      "id": "lo00000-0000-0000-0000-000000000001",
      "name": "Google Ads",
      "group_id": "og00000-0000-0000-0000-000000000001",
      "created_at": "2026-01-10T00:00:00Z"
    }
  ],
  "meta": {
    "total": 142,
    "page": 1,
    "page_size": 20,
    "next": "/lead-origins?page=2",
    "prev": null
  }
}
```

### Obter origem

`GET` `/lead-origins/{id}`

Retorna o registro de um(a) origem pelo ID.

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": "lo00000-0000-0000-0000-000000000001",
    "name": "Google Ads",
    "group_id": "og00000-0000-0000-0000-000000000001",
    "created_at": "2026-01-10T00:00:00Z"
  }
}
```

**Exemplo de Erro:**

```json
{
  "error": {
    "code": "not_found",
    "message": "origem não encontrado."
  }
}
```

### Criar origem

`POST` `/lead-origins`

Cria um(a) novo(a) origem no workspace autenticado.

**Body**

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| name | string | Sim | Nome da origem (fonte). |
| group_id | uuid | Não | Grupo de origem ao qual a fonte pertence. |

**Exemplo de Request Body:**

```json
{
  "name": "Google Ads"
}
```

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": "lo00000-0000-0000-0000-000000000001",
    "name": "Google Ads",
    "group_id": "og00000-0000-0000-0000-000000000001",
    "created_at": "2026-01-10T00:00:00Z"
  }
}
```

### Atualizar origem

`PUT` `/lead-origins/{id}`

Atualiza todos os campos editáveis de um(a) origem. Campos omitidos serão limpos.

**Body**

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| name | string | Sim | Nome da origem (fonte). |
| group_id | uuid | Não | Grupo de origem ao qual a fonte pertence. |

**Exemplo de Request Body:**

```json
{
  "name": "Google Ads"
}
```

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": "lo00000-0000-0000-0000-000000000001",
    "name": "Google Ads",
    "group_id": "og00000-0000-0000-0000-000000000001",
    "created_at": "2026-01-10T00:00:00Z"
  }
}
```

### Atualização parcial de origem

`PATCH` `/lead-origins/{id}`

Atualiza apenas os campos enviados no body. Use para edições incrementais.

**Body**

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| name | string | Não | Nome da origem (fonte). |
| group_id | uuid | Não | Grupo de origem ao qual a fonte pertence. |

**Exemplo de Request Body:**

```json
{
  "name": "Google Ads"
}
```

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": "lo00000-0000-0000-0000-000000000001",
    "name": "Google Ads",
    "group_id": "og00000-0000-0000-0000-000000000001",
    "created_at": "2026-01-10T00:00:00Z"
  }
}
```

### Remover origem

`DELETE` `/lead-origins/{id}`

Move o(a) origem para a lixeira (soft delete). Registros podem ser restaurados em até 60 dias.

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": "lo00000-0000-0000-0000-000000000001",
    "deleted_at": "2026-05-18T12:00:00Z"
  }
}
```


## Grupos de origem

Agrupadores das origens (fontes) de leads. Ex.: Mídia paga, Orgânico, Indicação.

**Tabela:** `crm_origin_groups`

### Listar grupos de origem

`GET` `/origin-groups`

Retorna a lista paginada de grupos de origem do workspace autenticado, com suporte a busca, filtros e ordenação.

**Query Parameters**

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| page | integer | Não | Número da página (default: 1). |
| page_size | integer | Não | Registros por página (default: 25, máx: 100). |
| order_by | string | Não | Campo de ordenação. Ex.: `created_at`. |
| order_direction | string | Não | Direção da ordenação: `asc` ou `desc` (default: desc). |
| q | string | Não | Busca textual no campo principal do recurso (geralmente `name` ou `title`). |

**Exemplo de Resposta:**

```json
{
  "data": [
    {
      "id": "og00000-0000-0000-0000-000000000001",
      "name": "Mídia paga",
      "created_at": "2026-01-10T00:00:00Z"
    }
  ],
  "meta": {
    "total": 142,
    "page": 1,
    "page_size": 20,
    "next": "/origin-groups?page=2",
    "prev": null
  }
}
```

### Obter grupo de origem

`GET` `/origin-groups/{id}`

Retorna o registro de um(a) grupo de origem pelo ID.

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": "og00000-0000-0000-0000-000000000001",
    "name": "Mídia paga",
    "created_at": "2026-01-10T00:00:00Z"
  }
}
```

**Exemplo de Erro:**

```json
{
  "error": {
    "code": "not_found",
    "message": "grupo de origem não encontrado."
  }
}
```

### Criar grupo de origem

`POST` `/origin-groups`

Cria um(a) novo(a) grupo de origem no workspace autenticado.

**Body**

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| name | string | Sim | Nome do grupo de origem. |

**Exemplo de Request Body:**

```json
{
  "name": "Mídia paga"
}
```

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": "og00000-0000-0000-0000-000000000001",
    "name": "Mídia paga",
    "created_at": "2026-01-10T00:00:00Z"
  }
}
```

### Atualizar grupo de origem

`PUT` `/origin-groups/{id}`

Atualiza todos os campos editáveis de um(a) grupo de origem. Campos omitidos serão limpos.

**Body**

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| name | string | Sim | Nome do grupo de origem. |

**Exemplo de Request Body:**

```json
{
  "name": "Mídia paga"
}
```

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": "og00000-0000-0000-0000-000000000001",
    "name": "Mídia paga",
    "created_at": "2026-01-10T00:00:00Z"
  }
}
```

### Atualização parcial de grupo de origem

`PATCH` `/origin-groups/{id}`

Atualiza apenas os campos enviados no body. Use para edições incrementais.

**Body**

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| name | string | Não | Nome do grupo de origem. |

**Exemplo de Request Body:**

```json
{
  "name": "Mídia paga"
}
```

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": "og00000-0000-0000-0000-000000000001",
    "name": "Mídia paga",
    "created_at": "2026-01-10T00:00:00Z"
  }
}
```

### Remover grupo de origem

`DELETE` `/origin-groups/{id}`

Move o(a) grupo de origem para a lixeira (soft delete). Registros podem ser restaurados em até 60 dias.

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": "og00000-0000-0000-0000-000000000001",
    "deleted_at": "2026-05-18T12:00:00Z"
  }
}
```


## Canais / Campanhas

Canais ou campanhas usados como dimensão adicional de rastreio em negociações.

**Tabela:** `crm_channels`

### Listar canais

`GET` `/channels`

Retorna a lista paginada de canais do workspace autenticado, com suporte a busca, filtros e ordenação.

**Query Parameters**

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| page | integer | Não | Número da página (default: 1). |
| page_size | integer | Não | Registros por página (default: 25, máx: 100). |
| order_by | string | Não | Campo de ordenação. Ex.: `created_at`. |
| order_direction | string | Não | Direção da ordenação: `asc` ou `desc` (default: desc). |
| q | string | Não | Busca textual no campo principal do recurso (geralmente `name` ou `title`). |

**Exemplo de Resposta:**

```json
{
  "data": [
    {
      "id": "ch00000-0000-0000-0000-000000000001",
      "name": "Campanha Black Friday",
      "created_at": "2026-01-10T00:00:00Z"
    }
  ],
  "meta": {
    "total": 142,
    "page": 1,
    "page_size": 20,
    "next": "/channels?page=2",
    "prev": null
  }
}
```

### Obter canal

`GET` `/channels/{id}`

Retorna o registro de um(a) canal pelo ID.

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": "ch00000-0000-0000-0000-000000000001",
    "name": "Campanha Black Friday",
    "created_at": "2026-01-10T00:00:00Z"
  }
}
```

**Exemplo de Erro:**

```json
{
  "error": {
    "code": "not_found",
    "message": "canal não encontrado."
  }
}
```

### Criar canal

`POST` `/channels`

Cria um(a) novo(a) canal no workspace autenticado.

**Body**

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| name | string | Sim | Nome do canal / campanha. |

**Exemplo de Request Body:**

```json
{
  "name": "Campanha Black Friday"
}
```

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": "ch00000-0000-0000-0000-000000000001",
    "name": "Campanha Black Friday",
    "created_at": "2026-01-10T00:00:00Z"
  }
}
```

### Atualizar canal

`PUT` `/channels/{id}`

Atualiza todos os campos editáveis de um(a) canal. Campos omitidos serão limpos.

**Body**

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| name | string | Sim | Nome do canal / campanha. |

**Exemplo de Request Body:**

```json
{
  "name": "Campanha Black Friday"
}
```

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": "ch00000-0000-0000-0000-000000000001",
    "name": "Campanha Black Friday",
    "created_at": "2026-01-10T00:00:00Z"
  }
}
```

### Atualização parcial de canal

`PATCH` `/channels/{id}`

Atualiza apenas os campos enviados no body. Use para edições incrementais.

**Body**

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| name | string | Não | Nome do canal / campanha. |

**Exemplo de Request Body:**

```json
{
  "name": "Campanha Black Friday"
}
```

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": "ch00000-0000-0000-0000-000000000001",
    "name": "Campanha Black Friday",
    "created_at": "2026-01-10T00:00:00Z"
  }
}
```

### Remover canal

`DELETE` `/channels/{id}`

Move o(a) canal para a lixeira (soft delete). Registros podem ser restaurados em até 60 dias.

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": "ch00000-0000-0000-0000-000000000001",
    "deleted_at": "2026-05-18T12:00:00Z"
  }
}
```


## Tipos de atividade

Tipos disponíveis para classificar atividades do CRM (ligação, reunião, e-mail, etc.).

**Tabela:** `activity_types`

### Listar tipos de atividade

`GET` `/activity-types`

Retorna a lista paginada de tipos de atividade do workspace autenticado, com suporte a busca, filtros e ordenação.

**Query Parameters**

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| page | integer | Não | Número da página (default: 1). |
| page_size | integer | Não | Registros por página (default: 25, máx: 100). |
| order_by | string | Não | Campo de ordenação. Ex.: `created_at`. |
| order_direction | string | Não | Direção da ordenação: `asc` ou `desc` (default: desc). |
| q | string | Não | Busca textual no campo principal do recurso (geralmente `name` ou `title`). |

**Exemplo de Resposta:**

```json
{
  "data": [
    {
      "id": "at00000-0000-0000-0000-000000000001",
      "name": "Ligação",
      "icon": "phone",
      "color": "#3B82F6",
      "is_default": true,
      "position": 1,
      "created_at": "2026-01-10T00:00:00Z"
    }
  ],
  "meta": {
    "total": 142,
    "page": 1,
    "page_size": 20,
    "next": "/activity-types?page=2",
    "prev": null
  }
}
```

### Obter tipo de atividade

`GET` `/activity-types/{id}`

Retorna o registro de um(a) tipo de atividade pelo ID.

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": "at00000-0000-0000-0000-000000000001",
    "name": "Ligação",
    "icon": "phone",
    "color": "#3B82F6",
    "is_default": true,
    "position": 1,
    "created_at": "2026-01-10T00:00:00Z"
  }
}
```

**Exemplo de Erro:**

```json
{
  "error": {
    "code": "not_found",
    "message": "tipo de atividade não encontrado."
  }
}
```

### Criar tipo de atividade

`POST` `/activity-types`

Cria um(a) novo(a) tipo de atividade no workspace autenticado.

**Body**

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| name | string | Sim | Nome do tipo de atividade. |
| icon | string | Não | Identificador do ícone. |
| color | string | Não | Cor em hex (ex.: #3B82F6). |
| is_default | boolean | Não | Marca como tipo padrão. |
| position | integer | Não | Ordem de exibição. |

**Exemplo de Request Body:**

```json
{
  "name": "Ligação"
}
```

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": "at00000-0000-0000-0000-000000000001",
    "name": "Ligação",
    "icon": "phone",
    "color": "#3B82F6",
    "is_default": true,
    "position": 1,
    "created_at": "2026-01-10T00:00:00Z"
  }
}
```

### Atualizar tipo de atividade

`PUT` `/activity-types/{id}`

Atualiza todos os campos editáveis de um(a) tipo de atividade. Campos omitidos serão limpos.

**Body**

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| name | string | Sim | Nome do tipo de atividade. |
| icon | string | Não | Identificador do ícone. |
| color | string | Não | Cor em hex (ex.: #3B82F6). |
| is_default | boolean | Não | Marca como tipo padrão. |
| position | integer | Não | Ordem de exibição. |

**Exemplo de Request Body:**

```json
{
  "name": "Ligação"
}
```

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": "at00000-0000-0000-0000-000000000001",
    "name": "Ligação",
    "icon": "phone",
    "color": "#3B82F6",
    "is_default": true,
    "position": 1,
    "created_at": "2026-01-10T00:00:00Z"
  }
}
```

### Atualização parcial de tipo de atividade

`PATCH` `/activity-types/{id}`

Atualiza apenas os campos enviados no body. Use para edições incrementais.

**Body**

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| name | string | Não | Nome do tipo de atividade. |
| icon | string | Não | Identificador do ícone. |
| color | string | Não | Cor em hex (ex.: #3B82F6). |
| is_default | boolean | Não | Marca como tipo padrão. |
| position | integer | Não | Ordem de exibição. |

**Exemplo de Request Body:**

```json
{
  "name": "Ligação"
}
```

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": "at00000-0000-0000-0000-000000000001",
    "name": "Ligação",
    "icon": "phone",
    "color": "#3B82F6",
    "is_default": true,
    "position": 1,
    "created_at": "2026-01-10T00:00:00Z"
  }
}
```

### Remover tipo de atividade

`DELETE` `/activity-types/{id}`

Move o(a) tipo de atividade para a lixeira (soft delete). Registros podem ser restaurados em até 60 dias.

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": "at00000-0000-0000-0000-000000000001",
    "deleted_at": "2026-05-18T12:00:00Z"
  }
}
```


## Campos personalizados

Definições de campos personalizados aplicados a contatos, empresas e negociações.

**Tabela:** `custom_fields_defs`

### Listar campos personalizados

`GET` `/custom-fields`

Retorna a lista paginada de campos personalizados do workspace autenticado, com suporte a busca, filtros e ordenação.

**Query Parameters**

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| page | integer | Não | Número da página (default: 1). |
| page_size | integer | Não | Registros por página (default: 25, máx: 100). |
| order_by | string | Não | Campo de ordenação. Ex.: `created_at`. |
| order_direction | string | Não | Direção da ordenação: `asc` ou `desc` (default: desc). |
| q | string | Não | Busca textual no campo principal do recurso (geralmente `name` ou `title`). |
| entity | string | Não | Filtra por entidade alvo. |
| type | string | Não | Filtra por tipo. |

**Exemplo de Resposta:**

```json
{
  "data": [
    {
      "id": "cf00000-0000-0000-0000-000000000001",
      "name": "Plano contratado",
      "entity": "deals",
      "type": "select",
      "options": [
        "Starter",
        "Pro",
        "Enterprise"
      ],
      "position": 1,
      "show_on_create": true,
      "is_required": false,
      "pipeline_ids": [],
      "created_at": "2026-01-10T00:00:00Z"
    }
  ],
  "meta": {
    "total": 142,
    "page": 1,
    "page_size": 20,
    "next": "/custom-fields?page=2",
    "prev": null
  }
}
```

### Obter campo personalizado

`GET` `/custom-fields/{id}`

Retorna o registro de um(a) campo personalizado pelo ID.

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": "cf00000-0000-0000-0000-000000000001",
    "name": "Plano contratado",
    "entity": "deals",
    "type": "select",
    "options": [
      "Starter",
      "Pro",
      "Enterprise"
    ],
    "position": 1,
    "show_on_create": true,
    "is_required": false,
    "pipeline_ids": [],
    "created_at": "2026-01-10T00:00:00Z"
  }
}
```

**Exemplo de Erro:**

```json
{
  "error": {
    "code": "not_found",
    "message": "campo personalizado não encontrado."
  }
}
```

### Criar campo personalizado

`POST` `/custom-fields`

Cria um(a) novo(a) campo personalizado no workspace autenticado.

**Body**

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| name | string | Sim | Rótulo do campo personalizado. |
| entity | string (persons|organizations|deals) | Sim | Entidade alvo do campo. |
| type | string (text|number|date|select|multiselect) | Sim | Tipo do dado. |
| options | string[] | Não | Opções (obrigatório para select/multiselect). |
| position | integer | Não | Ordem de exibição. |
| show_on_create | boolean | Não | Exibe o campo no formulário de criação. |
| is_required | boolean | Não | Torna o campo obrigatório. |
| pipeline_ids | uuid[] | Não | Restringe a aparecer somente nestes funis (apenas entity=deals). |

**Exemplo de Request Body:**

```json
{
  "name": "Plano contratado",
  "entity": "deals",
  "type": "select"
}
```

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": "cf00000-0000-0000-0000-000000000001",
    "name": "Plano contratado",
    "entity": "deals",
    "type": "select",
    "options": [
      "Starter",
      "Pro",
      "Enterprise"
    ],
    "position": 1,
    "show_on_create": true,
    "is_required": false,
    "pipeline_ids": [],
    "created_at": "2026-01-10T00:00:00Z"
  }
}
```

### Atualizar campo personalizado

`PUT` `/custom-fields/{id}`

Atualiza todos os campos editáveis de um(a) campo personalizado. Campos omitidos serão limpos.

**Body**

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| name | string | Sim | Rótulo do campo personalizado. |
| entity | string (persons|organizations|deals) | Sim | Entidade alvo do campo. |
| type | string (text|number|date|select|multiselect) | Sim | Tipo do dado. |
| options | string[] | Não | Opções (obrigatório para select/multiselect). |
| position | integer | Não | Ordem de exibição. |
| show_on_create | boolean | Não | Exibe o campo no formulário de criação. |
| is_required | boolean | Não | Torna o campo obrigatório. |
| pipeline_ids | uuid[] | Não | Restringe a aparecer somente nestes funis (apenas entity=deals). |

**Exemplo de Request Body:**

```json
{
  "name": "Plano contratado",
  "entity": "deals",
  "type": "select"
}
```

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": "cf00000-0000-0000-0000-000000000001",
    "name": "Plano contratado",
    "entity": "deals",
    "type": "select",
    "options": [
      "Starter",
      "Pro",
      "Enterprise"
    ],
    "position": 1,
    "show_on_create": true,
    "is_required": false,
    "pipeline_ids": [],
    "created_at": "2026-01-10T00:00:00Z"
  }
}
```

### Atualização parcial de campo personalizado

`PATCH` `/custom-fields/{id}`

Atualiza apenas os campos enviados no body. Use para edições incrementais.

**Body**

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| name | string | Não | Rótulo do campo personalizado. |
| entity | string (persons|organizations|deals) | Não | Entidade alvo do campo. |
| type | string (text|number|date|select|multiselect) | Não | Tipo do dado. |
| options | string[] | Não | Opções (obrigatório para select/multiselect). |
| position | integer | Não | Ordem de exibição. |
| show_on_create | boolean | Não | Exibe o campo no formulário de criação. |
| is_required | boolean | Não | Torna o campo obrigatório. |
| pipeline_ids | uuid[] | Não | Restringe a aparecer somente nestes funis (apenas entity=deals). |

**Exemplo de Request Body:**

```json
{
  "name": "Plano contratado"
}
```

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": "cf00000-0000-0000-0000-000000000001",
    "name": "Plano contratado",
    "entity": "deals",
    "type": "select",
    "options": [
      "Starter",
      "Pro",
      "Enterprise"
    ],
    "position": 1,
    "show_on_create": true,
    "is_required": false,
    "pipeline_ids": [],
    "created_at": "2026-01-10T00:00:00Z"
  }
}
```

### Remover campo personalizado

`DELETE` `/custom-fields/{id}`

Move o(a) campo personalizado para a lixeira (soft delete). Registros podem ser restaurados em até 60 dias.

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": "cf00000-0000-0000-0000-000000000001",
    "deleted_at": "2026-05-18T12:00:00Z"
  }
}
```


## Templates de e-mail

Modelos de e-mail reutilizáveis com suporte a variáveis dinâmicas.

**Tabela:** `email_templates`

### Listar templates de e-mail

`GET` `/email-templates`

Retorna a lista paginada de templates de e-mail do workspace autenticado, com suporte a busca, filtros e ordenação.

**Query Parameters**

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| page | integer | Não | Número da página (default: 1). |
| page_size | integer | Não | Registros por página (default: 25, máx: 100). |
| order_by | string | Não | Campo de ordenação. Ex.: `created_at`. |
| order_direction | string | Não | Direção da ordenação: `asc` ou `desc` (default: desc). |
| q | string | Não | Busca textual no campo principal do recurso (geralmente `name` ou `title`). |
| category | string | Não | Filtra por categoria. |

**Exemplo de Resposta:**

```json
{
  "data": [
    {
      "id": "et00000-0000-0000-0000-000000000001",
      "name": "Follow-up pós-reunião",
      "subject": "Resumo da nossa conversa",
      "body": "<p>Olá {{contact.first_name}}, ...</p>",
      "description": "Enviado após reuniões de descoberta.",
      "category": "follow_up",
      "created_at": "2026-01-10T00:00:00Z"
    }
  ],
  "meta": {
    "total": 142,
    "page": 1,
    "page_size": 20,
    "next": "/email-templates?page=2",
    "prev": null
  }
}
```

### Obter template de e-mail

`GET` `/email-templates/{id}`

Retorna o registro de um(a) template de e-mail pelo ID.

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": "et00000-0000-0000-0000-000000000001",
    "name": "Follow-up pós-reunião",
    "subject": "Resumo da nossa conversa",
    "body": "<p>Olá {{contact.first_name}}, ...</p>",
    "description": "Enviado após reuniões de descoberta.",
    "category": "follow_up",
    "created_at": "2026-01-10T00:00:00Z"
  }
}
```

**Exemplo de Erro:**

```json
{
  "error": {
    "code": "not_found",
    "message": "template de e-mail não encontrado."
  }
}
```

### Criar template de e-mail

`POST` `/email-templates`

Cria um(a) novo(a) template de e-mail no workspace autenticado.

**Body**

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| name | string | Sim | Nome interno do template. |
| subject | string | Sim | Assunto do e-mail. |
| body | string | Sim | Conteúdo HTML do e-mail (suporta variáveis). |
| description | string | Não | Descrição interna do template. |
| category | string | Não | Categoria livre para agrupamento. |

**Exemplo de Request Body:**

```json
{
  "name": "Follow-up pós-reunião",
  "subject": "Resumo da nossa conversa",
  "body": "<p>Olá {{contact.first_name}}, ...</p>"
}
```

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": "et00000-0000-0000-0000-000000000001",
    "name": "Follow-up pós-reunião",
    "subject": "Resumo da nossa conversa",
    "body": "<p>Olá {{contact.first_name}}, ...</p>",
    "description": "Enviado após reuniões de descoberta.",
    "category": "follow_up",
    "created_at": "2026-01-10T00:00:00Z"
  }
}
```

### Atualizar template de e-mail

`PUT` `/email-templates/{id}`

Atualiza todos os campos editáveis de um(a) template de e-mail. Campos omitidos serão limpos.

**Body**

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| name | string | Sim | Nome interno do template. |
| subject | string | Sim | Assunto do e-mail. |
| body | string | Sim | Conteúdo HTML do e-mail (suporta variáveis). |
| description | string | Não | Descrição interna do template. |
| category | string | Não | Categoria livre para agrupamento. |

**Exemplo de Request Body:**

```json
{
  "name": "Follow-up pós-reunião",
  "subject": "Resumo da nossa conversa",
  "body": "<p>Olá {{contact.first_name}}, ...</p>"
}
```

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": "et00000-0000-0000-0000-000000000001",
    "name": "Follow-up pós-reunião",
    "subject": "Resumo da nossa conversa",
    "body": "<p>Olá {{contact.first_name}}, ...</p>",
    "description": "Enviado após reuniões de descoberta.",
    "category": "follow_up",
    "created_at": "2026-01-10T00:00:00Z"
  }
}
```

### Atualização parcial de template de e-mail

`PATCH` `/email-templates/{id}`

Atualiza apenas os campos enviados no body. Use para edições incrementais.

**Body**

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| name | string | Não | Nome interno do template. |
| subject | string | Não | Assunto do e-mail. |
| body | string | Não | Conteúdo HTML do e-mail (suporta variáveis). |
| description | string | Não | Descrição interna do template. |
| category | string | Não | Categoria livre para agrupamento. |

**Exemplo de Request Body:**

```json
{
  "name": "Follow-up pós-reunião"
}
```

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": "et00000-0000-0000-0000-000000000001",
    "name": "Follow-up pós-reunião",
    "subject": "Resumo da nossa conversa",
    "body": "<p>Olá {{contact.first_name}}, ...</p>",
    "description": "Enviado após reuniões de descoberta.",
    "category": "follow_up",
    "created_at": "2026-01-10T00:00:00Z"
  }
}
```

### Remover template de e-mail

`DELETE` `/email-templates/{id}`

Move o(a) template de e-mail para a lixeira (soft delete). Registros podem ser restaurados em até 60 dias.

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": "et00000-0000-0000-0000-000000000001",
    "deleted_at": "2026-05-18T12:00:00Z"
  }
}
```


## Automações

Regras de automação executadas automaticamente quando o gatilho configurado dispara.

**Tabela:** `automation_rules`

### Listar automações

`GET` `/automations`

Retorna a lista paginada de automações do workspace autenticado, com suporte a busca, filtros e ordenação.

**Query Parameters**

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| page | integer | Não | Número da página (default: 1). |
| page_size | integer | Não | Registros por página (default: 25, máx: 100). |
| order_by | string | Não | Campo de ordenação. Ex.: `created_at`. |
| order_direction | string | Não | Direção da ordenação: `asc` ou `desc` (default: desc). |
| q | string | Não | Busca textual no campo principal do recurso (geralmente `name` ou `title`). |
| is_active | boolean | Não | Filtra apenas ativas/inativas. |
| trigger_type | string | Não | Filtra por tipo de gatilho. |

**Exemplo de Resposta:**

```json
{
  "data": [
    {
      "id": "au00000-0000-0000-0000-000000000001",
      "name": "Atribuir lead novo ao SDR de plantão",
      "description": "Round-robin entre SDRs quando um lead entra pelo formulário.",
      "is_active": true,
      "trigger_type": "deal.created",
      "trigger_config": {},
      "conditions": {
        "all": []
      },
      "actions": [],
      "run_order": 1,
      "owner_id": "u00000-0000-0000-0000-000000000001",
      "canvas_data": {},
      "created_at": "2026-01-10T00:00:00Z"
    }
  ],
  "meta": {
    "total": 142,
    "page": 1,
    "page_size": 20,
    "next": "/automations?page=2",
    "prev": null
  }
}
```

### Obter automação

`GET` `/automations/{id}`

Retorna o registro de um(a) automação pelo ID.

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": "au00000-0000-0000-0000-000000000001",
    "name": "Atribuir lead novo ao SDR de plantão",
    "description": "Round-robin entre SDRs quando um lead entra pelo formulário.",
    "is_active": true,
    "trigger_type": "deal.created",
    "trigger_config": {},
    "conditions": {
      "all": []
    },
    "actions": [],
    "run_order": 1,
    "owner_id": "u00000-0000-0000-0000-000000000001",
    "canvas_data": {},
    "created_at": "2026-01-10T00:00:00Z"
  }
}
```

**Exemplo de Erro:**

```json
{
  "error": {
    "code": "not_found",
    "message": "automação não encontrado."
  }
}
```

### Criar automação

`POST` `/automations`

Cria um(a) novo(a) automação no workspace autenticado.

**Body**

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| name | string | Sim | Nome da automação. |
| description | string | Não | Descrição livre. |
| is_active | boolean | Não | Se a automação está ativa. |
| trigger_type | string | Sim | Evento gatilho (ex.: deal.created, activity.completed). |
| trigger_config | object | Não | Configuração específica do gatilho. |
| conditions | object | Não | Árvore de condições (AND/OR). |
| actions | object | Não | Lista de ações executadas pela automação. |
| run_order | integer | Não | Ordem de execução em relação às demais automações. |
| owner_id | uuid | Não | Usuário dono da automação. |
| canvas_data | object | Não | Layout visual do editor de automação. |

**Exemplo de Request Body:**

```json
{
  "name": "Atribuir lead novo ao SDR de plantão",
  "trigger_type": "deal.created"
}
```

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": "au00000-0000-0000-0000-000000000001",
    "name": "Atribuir lead novo ao SDR de plantão",
    "description": "Round-robin entre SDRs quando um lead entra pelo formulário.",
    "is_active": true,
    "trigger_type": "deal.created",
    "trigger_config": {},
    "conditions": {
      "all": []
    },
    "actions": [],
    "run_order": 1,
    "owner_id": "u00000-0000-0000-0000-000000000001",
    "canvas_data": {},
    "created_at": "2026-01-10T00:00:00Z"
  }
}
```

### Atualizar automação

`PUT` `/automations/{id}`

Atualiza todos os campos editáveis de um(a) automação. Campos omitidos serão limpos.

**Body**

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| name | string | Sim | Nome da automação. |
| description | string | Não | Descrição livre. |
| is_active | boolean | Não | Se a automação está ativa. |
| trigger_type | string | Sim | Evento gatilho (ex.: deal.created, activity.completed). |
| trigger_config | object | Não | Configuração específica do gatilho. |
| conditions | object | Não | Árvore de condições (AND/OR). |
| actions | object | Não | Lista de ações executadas pela automação. |
| run_order | integer | Não | Ordem de execução em relação às demais automações. |
| owner_id | uuid | Não | Usuário dono da automação. |
| canvas_data | object | Não | Layout visual do editor de automação. |

**Exemplo de Request Body:**

```json
{
  "name": "Atribuir lead novo ao SDR de plantão",
  "trigger_type": "deal.created"
}
```

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": "au00000-0000-0000-0000-000000000001",
    "name": "Atribuir lead novo ao SDR de plantão",
    "description": "Round-robin entre SDRs quando um lead entra pelo formulário.",
    "is_active": true,
    "trigger_type": "deal.created",
    "trigger_config": {},
    "conditions": {
      "all": []
    },
    "actions": [],
    "run_order": 1,
    "owner_id": "u00000-0000-0000-0000-000000000001",
    "canvas_data": {},
    "created_at": "2026-01-10T00:00:00Z"
  }
}
```

### Atualização parcial de automação

`PATCH` `/automations/{id}`

Atualiza apenas os campos enviados no body. Use para edições incrementais.

**Body**

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| name | string | Não | Nome da automação. |
| description | string | Não | Descrição livre. |
| is_active | boolean | Não | Se a automação está ativa. |
| trigger_type | string | Não | Evento gatilho (ex.: deal.created, activity.completed). |
| trigger_config | object | Não | Configuração específica do gatilho. |
| conditions | object | Não | Árvore de condições (AND/OR). |
| actions | object | Não | Lista de ações executadas pela automação. |
| run_order | integer | Não | Ordem de execução em relação às demais automações. |
| owner_id | uuid | Não | Usuário dono da automação. |
| canvas_data | object | Não | Layout visual do editor de automação. |

**Exemplo de Request Body:**

```json
{
  "name": "Atribuir lead novo ao SDR de plantão"
}
```

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": "au00000-0000-0000-0000-000000000001",
    "name": "Atribuir lead novo ao SDR de plantão",
    "description": "Round-robin entre SDRs quando um lead entra pelo formulário.",
    "is_active": true,
    "trigger_type": "deal.created",
    "trigger_config": {},
    "conditions": {
      "all": []
    },
    "actions": [],
    "run_order": 1,
    "owner_id": "u00000-0000-0000-0000-000000000001",
    "canvas_data": {},
    "created_at": "2026-01-10T00:00:00Z"
  }
}
```

### Remover automação

`DELETE` `/automations/{id}`

Move o(a) automação para a lixeira (soft delete). Registros podem ser restaurados em até 60 dias.

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": "au00000-0000-0000-0000-000000000001",
    "deleted_at": "2026-05-18T12:00:00Z"
  }
}
```


## Regras de Lead Scoring

Regras que somam pontos no score de uma negociação conforme campos e condições.

**Tabela:** `lead_scoring_rules`

### Listar regras de lead scoring

`GET` `/lead-scoring-rules`

Retorna a lista paginada de regras de lead scoring do workspace autenticado, com suporte a busca, filtros e ordenação.

**Query Parameters**

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| page | integer | Não | Número da página (default: 1). |
| page_size | integer | Não | Registros por página (default: 25, máx: 100). |
| order_by | string | Não | Campo de ordenação. Ex.: `created_at`. |
| order_direction | string | Não | Direção da ordenação: `asc` ou `desc` (default: desc). |
| q | string | Não | Busca textual no campo principal do recurso (geralmente `name` ou `title`). |
| is_active | boolean | Não | Filtra por ativas/inativas. |
| field | string | Não | Filtra por campo avaliado. |

**Exemplo de Resposta:**

```json
{
  "data": [
    {
      "id": "ls00000-0000-0000-0000-000000000001",
      "name": "Job title contém Diretor",
      "field": "job_title",
      "operator": "contains",
      "value": {
        "text": "Diretor"
      },
      "points": 20,
      "is_active": true,
      "created_at": "2026-01-10T00:00:00Z"
    }
  ],
  "meta": {
    "total": 142,
    "page": 1,
    "page_size": 20,
    "next": "/lead-scoring-rules?page=2",
    "prev": null
  }
}
```

### Obter regra de lead scoring

`GET` `/lead-scoring-rules/{id}`

Retorna o registro de um(a) regra de lead scoring pelo ID.

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": "ls00000-0000-0000-0000-000000000001",
    "name": "Job title contém Diretor",
    "field": "job_title",
    "operator": "contains",
    "value": {
      "text": "Diretor"
    },
    "points": 20,
    "is_active": true,
    "created_at": "2026-01-10T00:00:00Z"
  }
}
```

**Exemplo de Erro:**

```json
{
  "error": {
    "code": "not_found",
    "message": "regra de lead scoring não encontrado."
  }
}
```

### Criar regra de lead scoring

`POST` `/lead-scoring-rules`

Cria um(a) novo(a) regra de lead scoring no workspace autenticado.

**Body**

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| name | string | Sim | Nome da regra. |
| field | string | Sim | Campo avaliado (ex.: job_title, value, custom_fields.cargo). |
| operator | string | Sim | Operador de comparação (ex.: equals, contains, greater_than). |
| value | object | Não | Valor de comparação (JSON livre). |
| points | integer | Sim | Pontuação atribuída ao bater a condição. |
| is_active | boolean | Não | Se a regra está ativa. |

**Exemplo de Request Body:**

```json
{
  "name": "Job title contém Diretor",
  "field": "job_title",
  "operator": "contains",
  "points": 20
}
```

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": "ls00000-0000-0000-0000-000000000001",
    "name": "Job title contém Diretor",
    "field": "job_title",
    "operator": "contains",
    "value": {
      "text": "Diretor"
    },
    "points": 20,
    "is_active": true,
    "created_at": "2026-01-10T00:00:00Z"
  }
}
```

### Atualizar regra de lead scoring

`PUT` `/lead-scoring-rules/{id}`

Atualiza todos os campos editáveis de um(a) regra de lead scoring. Campos omitidos serão limpos.

**Body**

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| name | string | Sim | Nome da regra. |
| field | string | Sim | Campo avaliado (ex.: job_title, value, custom_fields.cargo). |
| operator | string | Sim | Operador de comparação (ex.: equals, contains, greater_than). |
| value | object | Não | Valor de comparação (JSON livre). |
| points | integer | Sim | Pontuação atribuída ao bater a condição. |
| is_active | boolean | Não | Se a regra está ativa. |

**Exemplo de Request Body:**

```json
{
  "name": "Job title contém Diretor",
  "field": "job_title",
  "operator": "contains",
  "points": 20
}
```

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": "ls00000-0000-0000-0000-000000000001",
    "name": "Job title contém Diretor",
    "field": "job_title",
    "operator": "contains",
    "value": {
      "text": "Diretor"
    },
    "points": 20,
    "is_active": true,
    "created_at": "2026-01-10T00:00:00Z"
  }
}
```

### Atualização parcial de regra de lead scoring

`PATCH` `/lead-scoring-rules/{id}`

Atualiza apenas os campos enviados no body. Use para edições incrementais.

**Body**

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| name | string | Não | Nome da regra. |
| field | string | Não | Campo avaliado (ex.: job_title, value, custom_fields.cargo). |
| operator | string | Não | Operador de comparação (ex.: equals, contains, greater_than). |
| value | object | Não | Valor de comparação (JSON livre). |
| points | integer | Não | Pontuação atribuída ao bater a condição. |
| is_active | boolean | Não | Se a regra está ativa. |

**Exemplo de Request Body:**

```json
{
  "name": "Job title contém Diretor"
}
```

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": "ls00000-0000-0000-0000-000000000001",
    "name": "Job title contém Diretor",
    "field": "job_title",
    "operator": "contains",
    "value": {
      "text": "Diretor"
    },
    "points": 20,
    "is_active": true,
    "created_at": "2026-01-10T00:00:00Z"
  }
}
```

### Remover regra de lead scoring

`DELETE` `/lead-scoring-rules/{id}`

Move o(a) regra de lead scoring para a lixeira (soft delete). Registros podem ser restaurados em até 60 dias.

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": "ls00000-0000-0000-0000-000000000001",
    "deleted_at": "2026-05-18T12:00:00Z"
  }
}
```


## Regras de distribuição

Regras que distribuem novas negociações entre responsáveis automaticamente.

**Tabela:** `crm_distribution_rules`

### Listar regras de distribuição

`GET` `/distribution-rules`

Retorna a lista paginada de regras de distribuição do workspace autenticado, com suporte a busca, filtros e ordenação.

**Query Parameters**

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| page | integer | Não | Número da página (default: 1). |
| page_size | integer | Não | Registros por página (default: 25, máx: 100). |
| order_by | string | Não | Campo de ordenação. Ex.: `created_at`. |
| order_direction | string | Não | Direção da ordenação: `asc` ou `desc` (default: desc). |
| q | string | Não | Busca textual no campo principal do recurso (geralmente `name` ou `title`). |
| is_active | boolean | Não | Filtra por ativas/inativas. |
| mode | string | Não | Filtra por modo (round_robin|by_origin). |

**Exemplo de Resposta:**

```json
{
  "data": [
    {
      "id": "dr00000-0000-0000-0000-000000000001",
      "name": "Distribuição inbound",
      "mode": "round_robin",
      "is_active": true,
      "apply_only_when_unassigned": true,
      "origin_owner_map": {},
      "created_at": "2026-01-10T00:00:00Z"
    }
  ],
  "meta": {
    "total": 142,
    "page": 1,
    "page_size": 20,
    "next": "/distribution-rules?page=2",
    "prev": null
  }
}
```

### Obter regra de distribuição

`GET` `/distribution-rules/{id}`

Retorna o registro de um(a) regra de distribuição pelo ID.

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": "dr00000-0000-0000-0000-000000000001",
    "name": "Distribuição inbound",
    "mode": "round_robin",
    "is_active": true,
    "apply_only_when_unassigned": true,
    "origin_owner_map": {},
    "created_at": "2026-01-10T00:00:00Z"
  }
}
```

**Exemplo de Erro:**

```json
{
  "error": {
    "code": "not_found",
    "message": "regra de distribuição não encontrado."
  }
}
```

### Criar regra de distribuição

`POST` `/distribution-rules`

Cria um(a) novo(a) regra de distribuição no workspace autenticado.

**Body**

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| name | string | Sim | Nome da regra de distribuição. |
| mode | string (round_robin|by_origin) | Sim | Modo de distribuição. |
| is_active | boolean | Não | Se a regra está ativa. |
| apply_only_when_unassigned | boolean | Não | Aplica somente quando a negociação ainda não tem responsável. |
| origin_owner_map | object | Não | Mapa origin_id -> owner_id (usado quando mode=by_origin). |

**Exemplo de Request Body:**

```json
{
  "name": "Distribuição inbound",
  "mode": "round_robin"
}
```

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": "dr00000-0000-0000-0000-000000000001",
    "name": "Distribuição inbound",
    "mode": "round_robin",
    "is_active": true,
    "apply_only_when_unassigned": true,
    "origin_owner_map": {},
    "created_at": "2026-01-10T00:00:00Z"
  }
}
```

### Atualizar regra de distribuição

`PUT` `/distribution-rules/{id}`

Atualiza todos os campos editáveis de um(a) regra de distribuição. Campos omitidos serão limpos.

**Body**

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| name | string | Sim | Nome da regra de distribuição. |
| mode | string (round_robin|by_origin) | Sim | Modo de distribuição. |
| is_active | boolean | Não | Se a regra está ativa. |
| apply_only_when_unassigned | boolean | Não | Aplica somente quando a negociação ainda não tem responsável. |
| origin_owner_map | object | Não | Mapa origin_id -> owner_id (usado quando mode=by_origin). |

**Exemplo de Request Body:**

```json
{
  "name": "Distribuição inbound",
  "mode": "round_robin"
}
```

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": "dr00000-0000-0000-0000-000000000001",
    "name": "Distribuição inbound",
    "mode": "round_robin",
    "is_active": true,
    "apply_only_when_unassigned": true,
    "origin_owner_map": {},
    "created_at": "2026-01-10T00:00:00Z"
  }
}
```

### Atualização parcial de regra de distribuição

`PATCH` `/distribution-rules/{id}`

Atualiza apenas os campos enviados no body. Use para edições incrementais.

**Body**

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| name | string | Não | Nome da regra de distribuição. |
| mode | string (round_robin|by_origin) | Não | Modo de distribuição. |
| is_active | boolean | Não | Se a regra está ativa. |
| apply_only_when_unassigned | boolean | Não | Aplica somente quando a negociação ainda não tem responsável. |
| origin_owner_map | object | Não | Mapa origin_id -> owner_id (usado quando mode=by_origin). |

**Exemplo de Request Body:**

```json
{
  "name": "Distribuição inbound"
}
```

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": "dr00000-0000-0000-0000-000000000001",
    "name": "Distribuição inbound",
    "mode": "round_robin",
    "is_active": true,
    "apply_only_when_unassigned": true,
    "origin_owner_map": {},
    "created_at": "2026-01-10T00:00:00Z"
  }
}
```

### Remover regra de distribuição

`DELETE` `/distribution-rules/{id}`

Move o(a) regra de distribuição para a lixeira (soft delete). Registros podem ser restaurados em até 60 dias.

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": "dr00000-0000-0000-0000-000000000001",
    "deleted_at": "2026-05-18T12:00:00Z"
  }
}
```


## Webhooks

Endpoints externos que recebem eventos do CRM em tempo real.

**Tabela:** `crm_webhooks`

### Listar webhooks

`GET` `/webhooks`

Retorna a lista paginada de webhooks do workspace autenticado, com suporte a busca, filtros e ordenação.

**Query Parameters**

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| page | integer | Não | Número da página (default: 1). |
| page_size | integer | Não | Registros por página (default: 25, máx: 100). |
| order_by | string | Não | Campo de ordenação. Ex.: `created_at`. |
| order_direction | string | Não | Direção da ordenação: `asc` ou `desc` (default: desc). |
| q | string | Não | Busca textual no campo principal do recurso (geralmente `name` ou `title`). |
| is_active | boolean | Não | Filtra por ativos/inativos. |

**Exemplo de Resposta:**

```json
{
  "data": [
    {
      "id": "wh00000-0000-0000-0000-000000000001",
      "name": "Sync para data warehouse",
      "description": "Envia eventos de negociação para o pipeline interno.",
      "target_url": "https://hooks.example.com/alze",
      "events": [
        "deal.created",
        "deal.won",
        "deal.lost"
      ],
      "is_active": true,
      "last_delivery_at": "2026-05-29T11:00:00Z",
      "last_delivery_status": "success",
      "created_at": "2026-04-01T08:00:00Z"
    }
  ],
  "meta": {
    "total": 142,
    "page": 1,
    "page_size": 20,
    "next": "/webhooks?page=2",
    "prev": null
  }
}
```

### Obter webhook

`GET` `/webhooks/{id}`

Retorna o registro de um(a) webhook pelo ID.

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": "wh00000-0000-0000-0000-000000000001",
    "name": "Sync para data warehouse",
    "description": "Envia eventos de negociação para o pipeline interno.",
    "target_url": "https://hooks.example.com/alze",
    "events": [
      "deal.created",
      "deal.won",
      "deal.lost"
    ],
    "is_active": true,
    "last_delivery_at": "2026-05-29T11:00:00Z",
    "last_delivery_status": "success",
    "created_at": "2026-04-01T08:00:00Z"
  }
}
```

**Exemplo de Erro:**

```json
{
  "error": {
    "code": "not_found",
    "message": "webhook não encontrado."
  }
}
```

### Criar webhook

`POST` `/webhooks`

Cria um(a) novo(a) webhook no workspace autenticado.

**Body**

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| name | string | Sim | Nome do webhook. |
| description | string | Não | Descrição livre. |
| target_url | string (URL HTTPS) | Sim | URL que receberá os eventos. |
| events | string[] | Sim | Lista de eventos. Ex.: deal.created, deal.won, deal.lost, activity.completed. |
| is_active | boolean | Não | Se o webhook está ativo. |
| secret | string | Não | Segredo opcional para assinar o payload (HMAC). Retornado apenas no POST de criação. |

**Exemplo de Request Body:**

```json
{
  "name": "Sync para data warehouse",
  "target_url": "https://hooks.example.com/alze",
  "events": [
    "deal.created",
    "deal.won",
    "deal.lost"
  ]
}
```

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": "wh00000-0000-0000-0000-000000000001",
    "name": "Sync para data warehouse",
    "description": "Envia eventos de negociação para o pipeline interno.",
    "target_url": "https://hooks.example.com/alze",
    "events": [
      "deal.created",
      "deal.won",
      "deal.lost"
    ],
    "is_active": true,
    "last_delivery_at": "2026-05-29T11:00:00Z",
    "last_delivery_status": "success",
    "created_at": "2026-04-01T08:00:00Z"
  }
}
```

### Atualizar webhook

`PUT` `/webhooks/{id}`

Atualiza todos os campos editáveis de um(a) webhook. Campos omitidos serão limpos.

**Body**

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| name | string | Sim | Nome do webhook. |
| description | string | Não | Descrição livre. |
| target_url | string (URL HTTPS) | Sim | URL que receberá os eventos. |
| events | string[] | Sim | Lista de eventos. Ex.: deal.created, deal.won, deal.lost, activity.completed. |
| is_active | boolean | Não | Se o webhook está ativo. |
| secret | string | Não | Segredo opcional para assinar o payload (HMAC). Retornado apenas no POST de criação. |

**Exemplo de Request Body:**

```json
{
  "name": "Sync para data warehouse",
  "target_url": "https://hooks.example.com/alze",
  "events": [
    "deal.created",
    "deal.won",
    "deal.lost"
  ]
}
```

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": "wh00000-0000-0000-0000-000000000001",
    "name": "Sync para data warehouse",
    "description": "Envia eventos de negociação para o pipeline interno.",
    "target_url": "https://hooks.example.com/alze",
    "events": [
      "deal.created",
      "deal.won",
      "deal.lost"
    ],
    "is_active": true,
    "last_delivery_at": "2026-05-29T11:00:00Z",
    "last_delivery_status": "success",
    "created_at": "2026-04-01T08:00:00Z"
  }
}
```

### Atualização parcial de webhook

`PATCH` `/webhooks/{id}`

Atualiza apenas os campos enviados no body. Use para edições incrementais.

**Body**

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| name | string | Não | Nome do webhook. |
| description | string | Não | Descrição livre. |
| target_url | string (URL HTTPS) | Não | URL que receberá os eventos. |
| events | string[] | Não | Lista de eventos. Ex.: deal.created, deal.won, deal.lost, activity.completed. |
| is_active | boolean | Não | Se o webhook está ativo. |
| secret | string | Não | Segredo opcional para assinar o payload (HMAC). Retornado apenas no POST de criação. |

**Exemplo de Request Body:**

```json
{
  "name": "Sync para data warehouse"
}
```

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": "wh00000-0000-0000-0000-000000000001",
    "name": "Sync para data warehouse",
    "description": "Envia eventos de negociação para o pipeline interno.",
    "target_url": "https://hooks.example.com/alze",
    "events": [
      "deal.created",
      "deal.won",
      "deal.lost"
    ],
    "is_active": true,
    "last_delivery_at": "2026-05-29T11:00:00Z",
    "last_delivery_status": "success",
    "created_at": "2026-04-01T08:00:00Z"
  }
}
```

### Remover webhook

`DELETE` `/webhooks/{id}`

Move o(a) webhook para a lixeira (soft delete). Registros podem ser restaurados em até 60 dias.

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": "wh00000-0000-0000-0000-000000000001",
    "deleted_at": "2026-05-18T12:00:00Z"
  }
}
```


## Usuários

Usuários do workspace. Somente leitura via API — a gestão de membros é feita pela interface de Configurações > Equipe.

**Tabela:** `user_roles + profiles`

### Listar usuários

`GET` `/users`

Retorna todos os usuários do workspace autenticado.

**Query Parameters**

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| page | integer | Não | Número da página (default: 1). |
| page_size | integer | Não | Registros por página (default: 25, máx: 100). |
| order_by | string | Não | Campo de ordenação. Ex.: `created_at`. |
| order_direction | string | Não | Direção da ordenação: `asc` ou `desc` (default: desc). |
| q | string | Não | Busca textual no campo principal do recurso (geralmente `name` ou `title`). |
| role | string | Não | Filtra por papel (admin, sales, sdr...). |
| active | boolean | Não | Filtra apenas usuários ativos. |

**Exemplo de Resposta:**

```json
{
  "data": [
    {
      "id": "u123e456-7890-abcd-ef12-345678901234",
      "name": "João Vendedor",
      "email": "joao@empresa.com",
      "role": "sales",
      "active": true,
      "created_at": "2026-01-05T00:00:00Z"
    }
  ],
  "meta": {
    "total": 12,
    "page": 1,
    "page_size": 20,
    "next": null,
    "prev": null
  }
}
```

### Obter usuário

`GET` `/users/{id}`

Retorna os dados de um usuário pelo ID.

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": "u123e456-7890-abcd-ef12-345678901234",
    "name": "João Vendedor",
    "email": "joao@empresa.com",
    "role": "sales",
    "active": true,
    "created_at": "2026-01-05T00:00:00Z"
  }
}
```

**Exemplo de Erro:**

```json
{
  "error": {
    "code": "not_found",
    "message": "Usuário não encontrado."
  }
}
```

### Obter usuário autenticado

`GET` `/users/me`

Retorna o usuário associado ao token de API utilizado na requisição.

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": "u123e456-7890-abcd-ef12-345678901234",
    "name": "João Vendedor",
    "email": "joao@empresa.com",
    "role": "sales",
    "active": true,
    "created_at": "2026-01-05T00:00:00Z"
  }
}
```



---

*Documentação gerada automaticamente. Última atualização: 2026-05-29*
