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

## Contatos

Pessoas físicas no CRM. Podem ser vinculadas a uma organização e a múltiplos negócios. Inclui campos customizados específicos do workspace.

**Tabela:** `persons`

### Listar contatos

`GET` `/contacts`

Retorna a lista paginada de contatos do workspace autenticado, com suporte a busca, filtros e ordenação.

**Query Parameters**

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| page | integer | Não | Número da página (default: 1). |
| page_size | integer | Não | Registros por página (default: 20, máx: 100). |
| sort | string | Não | Campo de ordenação. Prefixe com `-` para ordem decrescente. Ex: `-created_at`. |
| q | string | Não | Busca textual em campos pesquisáveis (nome, e-mail, título). |
| created_after | datetime (ISO 8601) | Não | Filtra registros criados após esta data. |
| created_before | datetime (ISO 8601) | Não | Filtra registros criados antes desta data. |
| email | string | Não | Filtra por e-mail exato (case-insensitive). |
| phone | string | Não | Filtra por telefone exato (case-insensitive). |
| mobile | string | Não | Filtra por celular exato (case-insensitive). |
| organization_id | uuid | Não | Filtra contatos de uma organização específica. |
| owner_id | uuid | Não | Filtra por responsável. |

**Exemplo de Resposta:**

```json
{
  "data": [
    {
      "id": "c1a2b3d4-e5f6-7890-abcd-ef1234567890",
      "name": "Mariana Souza",
      "email": "mariana@exemplo.com",
      "phone": "+55 11 99999-9999",
      "organization_id": "9f8e7d6c-5b4a-3210-fedc-ba9876543210",
      "owner_id": "u123e456-7890-abcd-ef12-345678901234",
      "custom_fields": {
        "cargo": "Diretora de Marketing",
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
    "phone": "+55 11 99999-9999",
    "organization_id": "9f8e7d6c-5b4a-3210-fedc-ba9876543210",
    "owner_id": "u123e456-7890-abcd-ef12-345678901234",
    "custom_fields": {
      "cargo": "Diretora de Marketing",
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
| email | string | Não | E-mail principal. Validado por formato. |
| phone | string | Não | Telefone no formato E.164 ou local. |
| organization_id | uuid | Não | ID da organização associada. |
| owner_id | uuid | Não | ID do usuário responsável pelo contato. |
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
    "phone": "+55 11 99999-9999",
    "organization_id": "9f8e7d6c-5b4a-3210-fedc-ba9876543210",
    "owner_id": "u123e456-7890-abcd-ef12-345678901234",
    "custom_fields": {
      "cargo": "Diretora de Marketing",
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
| email | string | Não | E-mail principal. Validado por formato. |
| phone | string | Não | Telefone no formato E.164 ou local. |
| organization_id | uuid | Não | ID da organização associada. |
| owner_id | uuid | Não | ID do usuário responsável pelo contato. |
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
    "phone": "+55 11 99999-9999",
    "organization_id": "9f8e7d6c-5b4a-3210-fedc-ba9876543210",
    "owner_id": "u123e456-7890-abcd-ef12-345678901234",
    "custom_fields": {
      "cargo": "Diretora de Marketing",
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
| email | string | Não | E-mail principal. Validado por formato. |
| phone | string | Não | Telefone no formato E.164 ou local. |
| organization_id | uuid | Não | ID da organização associada. |
| owner_id | uuid | Não | ID do usuário responsável pelo contato. |
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
    "phone": "+55 11 99999-9999",
    "organization_id": "9f8e7d6c-5b4a-3210-fedc-ba9876543210",
    "owner_id": "u123e456-7890-abcd-ef12-345678901234",
    "custom_fields": {
      "cargo": "Diretora de Marketing",
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

### Mesclar contatos duplicados

`POST` `/contacts/{id}/merge`

Funde dois contatos em um. O contato indicado por `source_id` é absorvido pelo contato `{id}` (mantido). Todas as referências em negócios e atividades são reapontadas.

**Body**

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| source_id | uuid | Sim | ID do contato a ser absorvido (será removido após a operação). |

**Exemplo de Request Body:**

```json
{
  "source_id": "f1e2d3c4-b5a6-7890-1234-567890abcdef"
}
```

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": "c1a2b3d4-e5f6-7890-abcd-ef1234567890",
    "name": "Mariana Souza",
    "email": "mariana@exemplo.com",
    "phone": "+55 11 99999-9999",
    "organization_id": "9f8e7d6c-5b4a-3210-fedc-ba9876543210",
    "owner_id": "u123e456-7890-abcd-ef12-345678901234",
    "custom_fields": {
      "cargo": "Diretora de Marketing",
      "origem_detalhe": "Webinar Q2"
    },
    "created_at": "2026-05-10T14:32:00Z",
    "updated_at": "2026-05-15T09:14:00Z"
  }
}
```


## Organizações

Empresas no CRM. Agrupam contatos e negócios sob uma mesma entidade comercial.

**Tabela:** `organizations`

### Listar organizações

`GET` `/organizations`

Retorna a lista paginada de organizações do workspace autenticado, com suporte a busca, filtros e ordenação.

**Query Parameters**

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| page | integer | Não | Número da página (default: 1). |
| page_size | integer | Não | Registros por página (default: 20, máx: 100). |
| sort | string | Não | Campo de ordenação. Prefixe com `-` para ordem decrescente. Ex: `-created_at`. |
| q | string | Não | Busca textual em campos pesquisáveis (nome, e-mail, título). |
| created_after | datetime (ISO 8601) | Não | Filtra registros criados após esta data. |
| created_before | datetime (ISO 8601) | Não | Filtra registros criados antes desta data. |
| domain | string | Não | Filtra por domínio exato. |
| owner_id | uuid | Não | Filtra por responsável. |

**Exemplo de Resposta:**

```json
{
  "data": [
    {
      "id": "9f8e7d6c-5b4a-3210-fedc-ba9876543210",
      "name": "Acme Marketing",
      "domain": "acme.com.br",
      "address": "Av. Paulista, 1000 — São Paulo/SP",
      "owner_id": "u123e456-7890-abcd-ef12-345678901234",
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

### Obter organização

`GET` `/organizations/{id}`

Retorna o registro de um(a) organização pelo ID.

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": "9f8e7d6c-5b4a-3210-fedc-ba9876543210",
    "name": "Acme Marketing",
    "domain": "acme.com.br",
    "address": "Av. Paulista, 1000 — São Paulo/SP",
    "owner_id": "u123e456-7890-abcd-ef12-345678901234",
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
    "message": "organização não encontrado."
  }
}
```

### Criar organização

`POST` `/organizations`

Cria um(a) novo(a) organização no workspace autenticado.

**Body**

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| name | string | Sim | Razão social ou nome fantasia. |
| domain | string | Não | Domínio principal (sem protocolo). |
| address | string | Não | Endereço em texto livre. |
| owner_id | uuid | Não | Usuário responsável. |
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
    "domain": "acme.com.br",
    "address": "Av. Paulista, 1000 — São Paulo/SP",
    "owner_id": "u123e456-7890-abcd-ef12-345678901234",
    "custom_fields": {
      "setor": "Agência",
      "funcionarios": 150
    },
    "created_at": "2026-04-02T10:00:00Z",
    "updated_at": "2026-05-15T09:14:00Z"
  }
}
```

### Atualizar organização

`PUT` `/organizations/{id}`

Atualiza todos os campos editáveis de um(a) organização. Campos omitidos serão limpos.

**Body**

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| name | string | Sim | Razão social ou nome fantasia. |
| domain | string | Não | Domínio principal (sem protocolo). |
| address | string | Não | Endereço em texto livre. |
| owner_id | uuid | Não | Usuário responsável. |
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
    "domain": "acme.com.br",
    "address": "Av. Paulista, 1000 — São Paulo/SP",
    "owner_id": "u123e456-7890-abcd-ef12-345678901234",
    "custom_fields": {
      "setor": "Agência",
      "funcionarios": 150
    },
    "created_at": "2026-04-02T10:00:00Z",
    "updated_at": "2026-05-15T09:14:00Z"
  }
}
```

### Atualização parcial de organização

`PATCH` `/organizations/{id}`

Atualiza apenas os campos enviados no body. Use para edições incrementais.

**Body**

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| name | string | Não | Razão social ou nome fantasia. |
| domain | string | Não | Domínio principal (sem protocolo). |
| address | string | Não | Endereço em texto livre. |
| owner_id | uuid | Não | Usuário responsável. |
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
    "domain": "acme.com.br",
    "address": "Av. Paulista, 1000 — São Paulo/SP",
    "owner_id": "u123e456-7890-abcd-ef12-345678901234",
    "custom_fields": {
      "setor": "Agência",
      "funcionarios": 150
    },
    "created_at": "2026-04-02T10:00:00Z",
    "updated_at": "2026-05-15T09:14:00Z"
  }
}
```

### Remover organização

`DELETE` `/organizations/{id}`

Move o(a) organização para a lixeira (soft delete). Registros podem ser restaurados em até 60 dias.

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": "9f8e7d6c-5b4a-3210-fedc-ba9876543210",
    "deleted_at": "2026-05-18T12:00:00Z"
  }
}
```


## Negociações

Oportunidades de venda. Cada negociação pertence a um funil e uma etapa, e pode estar associada a um contato e a uma organização. Use as ações `/win`, `/lose` e `/move` para alterar o ciclo de vida.

**Tabela:** `deals`

### Listar negociações

`GET` `/deals`

Retorna a lista paginada de negociações do workspace autenticado, com suporte a busca, filtros e ordenação.

**Query Parameters**

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| page | integer | Não | Número da página (default: 1). |
| page_size | integer | Não | Registros por página (default: 20, máx: 100). |
| sort | string | Não | Campo de ordenação. Prefixe com `-` para ordem decrescente. Ex: `-created_at`. |
| q | string | Não | Busca textual em campos pesquisáveis (nome, e-mail, título). |
| created_after | datetime (ISO 8601) | Não | Filtra registros criados após esta data. |
| created_before | datetime (ISO 8601) | Não | Filtra registros criados antes desta data. |
| pipeline_id | uuid | Não | Filtra por funil. |
| stage_id | uuid | Não | Filtra por etapa. |
| owner_id | uuid | Não | Filtra por responsável. |
| status | string (open|won|lost) | Não | Filtra pelo status da negociação. |
| person_id | uuid | Não | Filtra por contato associado. |
| organization_id | uuid | Não | Filtra por organização associada. |
| expected_close_after | date | Não | Filtra por previsão de fechamento >= data. |
| expected_close_before | date | Não | Filtra por previsão de fechamento <= data. |

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
| value | decimal | Não | Valor monetário da negociação. |
| currency | string (ISO 4217) | Não | Moeda. Default: BRL. |
| person_id | uuid | Não | Contato principal associado. |
| organization_id | uuid | Não | Organização associada. |
| owner_id | uuid | Não | Usuário responsável. |
| expected_close_date | date (YYYY-MM-DD) | Não | Data prevista de fechamento. |
| temperature | string (hot|warm|cold) | Não | Temperatura qualitativa do lead. |
| custom_fields | object | Não | Campos customizados do workspace. |

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
| value | decimal | Não | Valor monetário da negociação. |
| currency | string (ISO 4217) | Não | Moeda. Default: BRL. |
| person_id | uuid | Não | Contato principal associado. |
| organization_id | uuid | Não | Organização associada. |
| owner_id | uuid | Não | Usuário responsável. |
| expected_close_date | date (YYYY-MM-DD) | Não | Data prevista de fechamento. |
| temperature | string (hot|warm|cold) | Não | Temperatura qualitativa do lead. |
| custom_fields | object | Não | Campos customizados do workspace. |

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
| value | decimal | Não | Valor monetário da negociação. |
| currency | string (ISO 4217) | Não | Moeda. Default: BRL. |
| person_id | uuid | Não | Contato principal associado. |
| organization_id | uuid | Não | Organização associada. |
| owner_id | uuid | Não | Usuário responsável. |
| expected_close_date | date (YYYY-MM-DD) | Não | Data prevista de fechamento. |
| temperature | string (hot|warm|cold) | Não | Temperatura qualitativa do lead. |
| custom_fields | object | Não | Campos customizados do workspace. |

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

`POST` `/deals/{id}/win`

Move a negociação para status `won` e registra `won_at`. O `won_reason_id` é obrigatório se o workspace exigir motivo de ganho.

**Body**

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| won_reason_id | integer | Não | ID do motivo de ganho. |
| note | string | Não | Observação opcional sobre a vitória. |

**Exemplo de Request Body:**

```json
{
  "won_reason_id": 3,
  "note": "Fechou após apresentação executiva."
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

`POST` `/deals/{id}/lose`

Move a negociação para status `lost` e registra `lost_at`.

**Body**

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| loss_reason_id | integer | Sim | ID do motivo de perda. |
| note | string | Não | Observação opcional explicando a perda. |

**Exemplo de Request Body:**

```json
{
  "loss_reason_id": 2,
  "note": "Cliente optou por concorrente."
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

`POST` `/deals/{id}/move`

Atualiza a etapa da negociação. Pode mover entre funis informando `pipeline_id`.

**Body**

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| stage_id | uuid | Sim | ID da nova etapa. |
| pipeline_id | uuid | Não | Funil de destino (se diferente do atual). |

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


## Atividades

Tarefas e atividades comerciais (ligações, reuniões, e-mails) vinculadas a negociações e contatos.

**Tabela:** `tasks`

### Listar atividades

`GET` `/activities`

Retorna a lista paginada de atividades do workspace autenticado, com suporte a busca, filtros e ordenação.

**Query Parameters**

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| page | integer | Não | Número da página (default: 1). |
| page_size | integer | Não | Registros por página (default: 20, máx: 100). |
| sort | string | Não | Campo de ordenação. Prefixe com `-` para ordem decrescente. Ex: `-created_at`. |
| q | string | Não | Busca textual em campos pesquisáveis (nome, e-mail, título). |
| created_after | datetime (ISO 8601) | Não | Filtra registros criados após esta data. |
| created_before | datetime (ISO 8601) | Não | Filtra registros criados antes desta data. |
| status | string | Não | Filtra por status. |
| type | string | Não | Filtra por tipo. |
| deal_id | uuid | Não | Filtra atividades de uma negociação. |
| assignee_id | uuid | Não | Filtra por usuário responsável. |
| due_after | datetime | Não | Atividades com vencimento >= data. |
| due_before | datetime | Não | Atividades com vencimento <= data. |

**Exemplo de Resposta:**

```json
{
  "data": [
    {
      "id": "a1111111-2222-3333-4444-555555555555",
      "title": "Ligar para Mariana — apresentar proposta",
      "type": "call",
      "status": "open",
      "due_at": "2026-05-20T14:00:00Z",
      "completed_at": null,
      "assignees": [
        "u123e456-7890-abcd-ef12-345678901234"
      ],
      "deal_id": "d1234567-89ab-cdef-0123-456789abcdef",
      "person_id": "c1a2b3d4-e5f6-7890-abcd-ef1234567890",
      "organization_id": "9f8e7d6c-5b4a-3210-fedc-ba9876543210",
      "notes": "Confirmar escopo do plano Enterprise.",
      "created_at": "2026-05-15T10:00:00Z",
      "updated_at": "2026-05-15T10:00:00Z"
    }
  ],
  "meta": {
    "total": 142,
    "page": 1,
    "page_size": 20,
    "next": "/activities?page=2",
    "prev": null
  }
}
```

### Obter atividade

`GET` `/activities/{id}`

Retorna o registro de um(a) atividade pelo ID.

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": "a1111111-2222-3333-4444-555555555555",
    "title": "Ligar para Mariana — apresentar proposta",
    "type": "call",
    "status": "open",
    "due_at": "2026-05-20T14:00:00Z",
    "completed_at": null,
    "assignees": [
      "u123e456-7890-abcd-ef12-345678901234"
    ],
    "deal_id": "d1234567-89ab-cdef-0123-456789abcdef",
    "person_id": "c1a2b3d4-e5f6-7890-abcd-ef1234567890",
    "organization_id": "9f8e7d6c-5b4a-3210-fedc-ba9876543210",
    "notes": "Confirmar escopo do plano Enterprise.",
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
    "message": "atividade não encontrado."
  }
}
```

### Criar atividade

`POST` `/activities`

Cria um(a) novo(a) atividade no workspace autenticado.

**Body**

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| title | string | Sim | Título da atividade. |
| type | string (call|meeting|email|task|other) | Sim | Tipo da atividade. |
| due_at | datetime (ISO 8601) | Não | Prazo de execução. |
| status | string (open|done|canceled) | Não | Status atual (default: open). |
| assignees | array<uuid> | Não | IDs dos usuários responsáveis. |
| deal_id | uuid | Não | Negociação vinculada. |
| person_id | uuid | Não | Contato vinculado. |
| organization_id | uuid | Não | Organização vinculada. |
| notes | string | Não | Detalhes / observações em texto. |

**Exemplo de Request Body:**

```json
{
  "title": "Ligar para Mariana — apresentar proposta",
  "type": "call"
}
```

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": "a1111111-2222-3333-4444-555555555555",
    "title": "Ligar para Mariana — apresentar proposta",
    "type": "call",
    "status": "open",
    "due_at": "2026-05-20T14:00:00Z",
    "completed_at": null,
    "assignees": [
      "u123e456-7890-abcd-ef12-345678901234"
    ],
    "deal_id": "d1234567-89ab-cdef-0123-456789abcdef",
    "person_id": "c1a2b3d4-e5f6-7890-abcd-ef1234567890",
    "organization_id": "9f8e7d6c-5b4a-3210-fedc-ba9876543210",
    "notes": "Confirmar escopo do plano Enterprise.",
    "created_at": "2026-05-15T10:00:00Z",
    "updated_at": "2026-05-15T10:00:00Z"
  }
}
```

### Atualizar atividade

`PUT` `/activities/{id}`

Atualiza todos os campos editáveis de um(a) atividade. Campos omitidos serão limpos.

**Body**

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| title | string | Sim | Título da atividade. |
| type | string (call|meeting|email|task|other) | Sim | Tipo da atividade. |
| due_at | datetime (ISO 8601) | Não | Prazo de execução. |
| status | string (open|done|canceled) | Não | Status atual (default: open). |
| assignees | array<uuid> | Não | IDs dos usuários responsáveis. |
| deal_id | uuid | Não | Negociação vinculada. |
| person_id | uuid | Não | Contato vinculado. |
| organization_id | uuid | Não | Organização vinculada. |
| notes | string | Não | Detalhes / observações em texto. |

**Exemplo de Request Body:**

```json
{
  "title": "Ligar para Mariana — apresentar proposta",
  "type": "call"
}
```

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": "a1111111-2222-3333-4444-555555555555",
    "title": "Ligar para Mariana — apresentar proposta",
    "type": "call",
    "status": "open",
    "due_at": "2026-05-20T14:00:00Z",
    "completed_at": null,
    "assignees": [
      "u123e456-7890-abcd-ef12-345678901234"
    ],
    "deal_id": "d1234567-89ab-cdef-0123-456789abcdef",
    "person_id": "c1a2b3d4-e5f6-7890-abcd-ef1234567890",
    "organization_id": "9f8e7d6c-5b4a-3210-fedc-ba9876543210",
    "notes": "Confirmar escopo do plano Enterprise.",
    "created_at": "2026-05-15T10:00:00Z",
    "updated_at": "2026-05-15T10:00:00Z"
  }
}
```

### Atualização parcial de atividade

`PATCH` `/activities/{id}`

Atualiza apenas os campos enviados no body. Use para edições incrementais.

**Body**

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| title | string | Não | Título da atividade. |
| type | string (call|meeting|email|task|other) | Não | Tipo da atividade. |
| due_at | datetime (ISO 8601) | Não | Prazo de execução. |
| status | string (open|done|canceled) | Não | Status atual (default: open). |
| assignees | array<uuid> | Não | IDs dos usuários responsáveis. |
| deal_id | uuid | Não | Negociação vinculada. |
| person_id | uuid | Não | Contato vinculado. |
| organization_id | uuid | Não | Organização vinculada. |
| notes | string | Não | Detalhes / observações em texto. |

**Exemplo de Request Body:**

```json
{
  "title": "Ligar para Mariana — apresentar proposta"
}
```

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": "a1111111-2222-3333-4444-555555555555",
    "title": "Ligar para Mariana — apresentar proposta",
    "type": "call",
    "status": "open",
    "due_at": "2026-05-20T14:00:00Z",
    "completed_at": null,
    "assignees": [
      "u123e456-7890-abcd-ef12-345678901234"
    ],
    "deal_id": "d1234567-89ab-cdef-0123-456789abcdef",
    "person_id": "c1a2b3d4-e5f6-7890-abcd-ef1234567890",
    "organization_id": "9f8e7d6c-5b4a-3210-fedc-ba9876543210",
    "notes": "Confirmar escopo do plano Enterprise.",
    "created_at": "2026-05-15T10:00:00Z",
    "updated_at": "2026-05-15T10:00:00Z"
  }
}
```

### Remover atividade

`DELETE` `/activities/{id}`

Move o(a) atividade para a lixeira (soft delete). Registros podem ser restaurados em até 60 dias.

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

`POST` `/activities/{id}/complete`

Marca a atividade como concluída e registra `completed_at`.

**Body**

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| outcome_note | string | Não | Resumo do resultado da atividade. |

**Exemplo de Request Body:**

```json
{
  "outcome_note": "Cliente confirmou interesse."
}
```

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": "a1111111-2222-3333-4444-555555555555",
    "title": "Ligar para Mariana — apresentar proposta",
    "type": "call",
    "status": "done",
    "due_at": "2026-05-20T14:00:00Z",
    "completed_at": "2026-05-18T15:00:00Z",
    "assignees": [
      "u123e456-7890-abcd-ef12-345678901234"
    ],
    "deal_id": "d1234567-89ab-cdef-0123-456789abcdef",
    "person_id": "c1a2b3d4-e5f6-7890-abcd-ef1234567890",
    "organization_id": "9f8e7d6c-5b4a-3210-fedc-ba9876543210",
    "notes": "Confirmar escopo do plano Enterprise.",
    "created_at": "2026-05-15T10:00:00Z",
    "updated_at": "2026-05-15T10:00:00Z"
  }
}
```


## Produtos / Itens

Produtos e serviços do catálogo, que podem ser associados a negociações.

**Tabela:** `items`

### Listar itens

`GET` `/items`

Retorna a lista paginada de itens do workspace autenticado, com suporte a busca, filtros e ordenação.

**Query Parameters**

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| page | integer | Não | Número da página (default: 1). |
| page_size | integer | Não | Registros por página (default: 20, máx: 100). |
| sort | string | Não | Campo de ordenação. Prefixe com `-` para ordem decrescente. Ex: `-created_at`. |
| q | string | Não | Busca textual em campos pesquisáveis (nome, e-mail, título). |
| created_after | datetime (ISO 8601) | Não | Filtra registros criados após esta data. |
| created_before | datetime (ISO 8601) | Não | Filtra registros criados antes desta data. |
| category_id | uuid | Não | Filtra por categoria. |
| active | boolean | Não | Filtra apenas itens ativos. |

**Exemplo de Resposta:**

```json
{
  "data": [
    {
      "id": "i0000000-0000-0000-0000-000000000001",
      "name": "Plano Enterprise",
      "code": "PLN-ENT",
      "price": 4850,
      "currency": "BRL",
      "category_id": "cat00000-0000-0000-0000-000000000001",
      "characteristics": {
        "suporte": "24x7",
        "usuarios": "ilimitados"
      },
      "active": true,
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

### Obter item

`GET` `/items/{id}`

Retorna o registro de um(a) item pelo ID.

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": "i0000000-0000-0000-0000-000000000001",
    "name": "Plano Enterprise",
    "code": "PLN-ENT",
    "price": 4850,
    "currency": "BRL",
    "category_id": "cat00000-0000-0000-0000-000000000001",
    "characteristics": {
      "suporte": "24x7",
      "usuarios": "ilimitados"
    },
    "active": true,
    "created_at": "2026-01-10T00:00:00Z"
  }
}
```

**Exemplo de Erro:**

```json
{
  "error": {
    "code": "not_found",
    "message": "item não encontrado."
  }
}
```

### Criar item

`POST` `/items`

Cria um(a) novo(a) item no workspace autenticado.

**Body**

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| name | string | Sim | Nome do produto/serviço. |
| code | string | Não | SKU ou código interno. |
| price | decimal | Não | Preço unitário. |
| currency | string (ISO 4217) | Não | Moeda. Default: BRL. |
| category_id | uuid | Não | Categoria do item. |
| characteristics | object | Não | Atributos livres do item. |
| active | boolean | Não | Se o item está disponível para uso (default: true). |

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
    "id": "i0000000-0000-0000-0000-000000000001",
    "name": "Plano Enterprise",
    "code": "PLN-ENT",
    "price": 4850,
    "currency": "BRL",
    "category_id": "cat00000-0000-0000-0000-000000000001",
    "characteristics": {
      "suporte": "24x7",
      "usuarios": "ilimitados"
    },
    "active": true,
    "created_at": "2026-01-10T00:00:00Z"
  }
}
```

### Atualizar item

`PUT` `/items/{id}`

Atualiza todos os campos editáveis de um(a) item. Campos omitidos serão limpos.

**Body**

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| name | string | Sim | Nome do produto/serviço. |
| code | string | Não | SKU ou código interno. |
| price | decimal | Não | Preço unitário. |
| currency | string (ISO 4217) | Não | Moeda. Default: BRL. |
| category_id | uuid | Não | Categoria do item. |
| characteristics | object | Não | Atributos livres do item. |
| active | boolean | Não | Se o item está disponível para uso (default: true). |

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
    "id": "i0000000-0000-0000-0000-000000000001",
    "name": "Plano Enterprise",
    "code": "PLN-ENT",
    "price": 4850,
    "currency": "BRL",
    "category_id": "cat00000-0000-0000-0000-000000000001",
    "characteristics": {
      "suporte": "24x7",
      "usuarios": "ilimitados"
    },
    "active": true,
    "created_at": "2026-01-10T00:00:00Z"
  }
}
```

### Atualização parcial de item

`PATCH` `/items/{id}`

Atualiza apenas os campos enviados no body. Use para edições incrementais.

**Body**

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| name | string | Não | Nome do produto/serviço. |
| code | string | Não | SKU ou código interno. |
| price | decimal | Não | Preço unitário. |
| currency | string (ISO 4217) | Não | Moeda. Default: BRL. |
| category_id | uuid | Não | Categoria do item. |
| characteristics | object | Não | Atributos livres do item. |
| active | boolean | Não | Se o item está disponível para uso (default: true). |

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
    "id": "i0000000-0000-0000-0000-000000000001",
    "name": "Plano Enterprise",
    "code": "PLN-ENT",
    "price": 4850,
    "currency": "BRL",
    "category_id": "cat00000-0000-0000-0000-000000000001",
    "characteristics": {
      "suporte": "24x7",
      "usuarios": "ilimitados"
    },
    "active": true,
    "created_at": "2026-01-10T00:00:00Z"
  }
}
```

### Remover item

`DELETE` `/items/{id}`

Move o(a) item para a lixeira (soft delete). Registros podem ser restaurados em até 60 dias.

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": "i0000000-0000-0000-0000-000000000001",
    "deleted_at": "2026-05-18T12:00:00Z"
  }
}
```


## Funis (Pipelines)

Funis de vendas. Cada funil contém múltiplas etapas (stages) ordenadas.

**Tabela:** `pipelines`

### Listar funis

`GET` `/pipelines`

Retorna a lista paginada de funis do workspace autenticado, com suporte a busca, filtros e ordenação.

**Query Parameters**

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| page | integer | Não | Número da página (default: 1). |
| page_size | integer | Não | Registros por página (default: 20, máx: 100). |
| sort | string | Não | Campo de ordenação. Prefixe com `-` para ordem decrescente. Ex: `-created_at`. |
| q | string | Não | Busca textual em campos pesquisáveis (nome, e-mail, título). |
| created_after | datetime (ISO 8601) | Não | Filtra registros criados após esta data. |
| created_before | datetime (ISO 8601) | Não | Filtra registros criados antes desta data. |

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

Cria um novo funil no workspace autenticado já com suas etapas iniciais. As etapas são criadas atomicamente junto com o funil.

**Body**

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| name | string | Sim | Nome do funil. |
| position | integer | Não | Ordem de exibição. |
| is_default | boolean | Não | Define se é o funil padrão do workspace. |
| stages | array<object> | Sim | Etapas iniciais do funil. Cada item aceita `name` (string, obrigatório), `position` (integer, obrigatório) e `probability` (integer 0-100). Forneça ao menos uma etapa. |

**Exemplo de Request Body:**

```json
{
  "name": "Vendas Inbound",
  "is_default": true,
  "stages": [
    {
      "name": "Lead",
      "position": 1,
      "probability": 10
    },
    {
      "name": "Qualificado",
      "position": 2,
      "probability": 30
    },
    {
      "name": "Proposta",
      "position": 3,
      "probability": 60
    }
  ]
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
    "created_at": "2026-01-01T00:00:00Z",
    "stages": [
      {
        "id": "s0000000-0000-0000-0000-000000000001",
        "pipeline_id": "p0000000-0000-0000-0000-000000000001",
        "name": "Lead",
        "position": 1,
        "probability": 10
      },
      {
        "id": "s0000000-0000-0000-0000-000000000002",
        "pipeline_id": "p0000000-0000-0000-0000-000000000001",
        "name": "Qualificado",
        "position": 2,
        "probability": 30
      },
      {
        "id": "s0000000-0000-0000-0000-000000000003",
        "pipeline_id": "p0000000-0000-0000-0000-000000000001",
        "name": "Proposta enviada",
        "position": 3,
        "probability": 60
      }
    ]
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

### Listar etapas do funil

`GET` `/pipelines/{id}/stages`

Atalho que retorna todas as etapas (`stages`) de um funil, em ordem.

**Exemplo de Resposta:**

```json
{
  "data": [
    {
      "id": "s0000000-0000-0000-0000-000000000001",
      "pipeline_id": "p0000000-0000-0000-0000-000000000001",
      "name": "Lead",
      "position": 1,
      "probability": 10
    },
    {
      "id": "s0000000-0000-0000-0000-000000000002",
      "pipeline_id": "p0000000-0000-0000-0000-000000000001",
      "name": "Qualificado",
      "position": 2,
      "probability": 30
    },
    {
      "id": "s0000000-0000-0000-0000-000000000003",
      "pipeline_id": "p0000000-0000-0000-0000-000000000001",
      "name": "Proposta enviada",
      "position": 3,
      "probability": 60
    }
  ]
}
```


## Etapas (Stages)

Etapas que compõem cada funil de vendas.

**Tabela:** `stages`

### Listar etapas

`GET` `/stages`

Retorna a lista paginada de etapas do workspace autenticado, com suporte a busca, filtros e ordenação.

**Query Parameters**

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| page | integer | Não | Número da página (default: 1). |
| page_size | integer | Não | Registros por página (default: 20, máx: 100). |
| sort | string | Não | Campo de ordenação. Prefixe com `-` para ordem decrescente. Ex: `-created_at`. |
| q | string | Não | Busca textual em campos pesquisáveis (nome, e-mail, título). |
| created_after | datetime (ISO 8601) | Não | Filtra registros criados após esta data. |
| created_before | datetime (ISO 8601) | Não | Filtra registros criados antes desta data. |
| pipeline_id | uuid | Não | Filtra etapas de um funil específico. |

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
    "total": 142,
    "page": 1,
    "page_size": 20,
    "next": "/stages?page=2",
    "prev": null
  }
}
```

### Obter etapa

`GET` `/stages/{id}`

Retorna o registro de um(a) etapa pelo ID.

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
    "message": "etapa não encontrado."
  }
}
```

### Criar etapa

`POST` `/stages`

Cria um(a) novo(a) etapa no workspace autenticado.

**Body**

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| pipeline_id | uuid | Sim | Funil ao qual a etapa pertence. |
| name | string | Sim | Nome da etapa. |
| position | integer | Sim | Posição da etapa dentro do funil. |
| probability | integer (0-100) | Não | Probabilidade de fechamento associada à etapa. |

**Exemplo de Request Body:**

```json
{
  "pipeline_id": "p0000000-0000-0000-0000-000000000001",
  "name": "Proposta enviada",
  "position": 3
}
```

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

### Atualizar etapa

`PUT` `/stages/{id}`

Atualiza todos os campos editáveis de um(a) etapa. Campos omitidos serão limpos.

**Body**

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| pipeline_id | uuid | Sim | Funil ao qual a etapa pertence. |
| name | string | Sim | Nome da etapa. |
| position | integer | Sim | Posição da etapa dentro do funil. |
| probability | integer (0-100) | Não | Probabilidade de fechamento associada à etapa. |

**Exemplo de Request Body:**

```json
{
  "pipeline_id": "p0000000-0000-0000-0000-000000000001",
  "name": "Proposta enviada",
  "position": 3
}
```

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

### Atualização parcial de etapa

`PATCH` `/stages/{id}`

Atualiza apenas os campos enviados no body. Use para edições incrementais.

**Body**

| Nome | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| pipeline_id | uuid | Não | Funil ao qual a etapa pertence. |
| name | string | Não | Nome da etapa. |
| position | integer | Não | Posição da etapa dentro do funil. |
| probability | integer (0-100) | Não | Probabilidade de fechamento associada à etapa. |

**Exemplo de Request Body:**

```json
{
  "pipeline_id": "p0000000-0000-0000-0000-000000000001"
}
```

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

### Remover etapa

`DELETE` `/stages/{id}`

Move o(a) etapa para a lixeira (soft delete). Registros podem ser restaurados em até 60 dias.

**Exemplo de Resposta:**

```json
{
  "data": {
    "id": "s0000000-0000-0000-0000-000000000003",
    "deleted_at": "2026-05-18T12:00:00Z"
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
| page_size | integer | Não | Registros por página (default: 20, máx: 100). |
| sort | string | Não | Campo de ordenação. Prefixe com `-` para ordem decrescente. Ex: `-created_at`. |
| q | string | Não | Busca textual em campos pesquisáveis (nome, e-mail, título). |
| created_after | datetime (ISO 8601) | Não | Filtra registros criados após esta data. |
| created_before | datetime (ISO 8601) | Não | Filtra registros criados antes desta data. |

**Exemplo de Resposta:**

```json
{
  "data": [
    {
      "id": 2,
      "name": "Preço acima do orçamento",
      "position": 1,
      "active": true
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
    "position": 1,
    "active": true
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
| position | integer | Não | Ordem de exibição. |
| active | boolean | Não | Se está disponível para seleção (default: true). |

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
    "position": 1,
    "active": true
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
| position | integer | Não | Ordem de exibição. |
| active | boolean | Não | Se está disponível para seleção (default: true). |

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
    "position": 1,
    "active": true
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
| position | integer | Não | Ordem de exibição. |
| active | boolean | Não | Se está disponível para seleção (default: true). |

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
    "position": 1,
    "active": true
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
| page_size | integer | Não | Registros por página (default: 20, máx: 100). |
| sort | string | Não | Campo de ordenação. Prefixe com `-` para ordem decrescente. Ex: `-created_at`. |
| q | string | Não | Busca textual em campos pesquisáveis (nome, e-mail, título). |
| created_after | datetime (ISO 8601) | Não | Filtra registros criados após esta data. |
| created_before | datetime (ISO 8601) | Não | Filtra registros criados antes desta data. |

**Exemplo de Resposta:**

```json
{
  "data": [
    {
      "id": 3,
      "name": "Melhor preço",
      "position": 1,
      "active": true
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
    "position": 1,
    "active": true
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
| position | integer | Não | Ordem de exibição. |
| active | boolean | Não | Se está disponível para seleção (default: true). |

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
    "position": 1,
    "active": true
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
| position | integer | Não | Ordem de exibição. |
| active | boolean | Não | Se está disponível para seleção (default: true). |

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
    "position": 1,
    "active": true
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
| position | integer | Não | Ordem de exibição. |
| active | boolean | Não | Se está disponível para seleção (default: true). |

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
    "position": 1,
    "active": true
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
| page_size | integer | Não | Registros por página (default: 20, máx: 100). |
| sort | string | Não | Campo de ordenação. Prefixe com `-` para ordem decrescente. Ex: `-created_at`. |
| q | string | Não | Busca textual em campos pesquisáveis (nome, e-mail, título). |
| created_after | datetime (ISO 8601) | Não | Filtra registros criados após esta data. |
| created_before | datetime (ISO 8601) | Não | Filtra registros criados antes desta data. |
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

*Documentação gerada automaticamente. Última atualização: 2026-05-28*
