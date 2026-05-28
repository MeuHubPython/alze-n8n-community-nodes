# n8n-nodes-alze

This is an n8n community node package that integrates seamlessly with the **Alze CRM** REST API. It allows you to build powerful automated workflows, synchronize contacts, deals, activities, and manage sales funnels with absolute control.

[![npm version](https://img.shields.io/npm/v/n8n-nodes-alze.svg?style=flat-square&color=A12CFF)](https://www.npmjs.com/package/n8n-nodes-alze)
[![n8n community node](https://img.shields.io/badge/n8n-community%20node-orange.svg?style=flat-square)](https://n8n.io)
[![license](https://img.shields.io/npm/l/n8n-nodes-alze.svg?style=flat-square)](https://github.com/synapsolab/alze-n8n-community-nodes/blob/main/LICENSE)

---

## Key Features

* **Complete API Coverage**: Supports all 10 resources and over ~50 endpoints inside Alze CRM.
* **Auto-Pagination**: Seamlessly loops through paginated GET requests automatically when `Return All` is checked.
* **Flexible Custom Fields Mapping**: Fully supports custom properties using an interactive UI Key-Value table or raw custom JSON objects.
* **Optimized & Type-Safe**: Written in 100% strict TypeScript and compiled against official n8n workflow types.

---

## Supported Resources & Operations

| Resource | Description | Supported Operations |
| :--- | :--- | :--- |
| **👤 Contacts** | Individual leads or clients. | `Create`, `Get`, `Get Many (List)`, `Update`, `Update Partial (Patch)`, `Delete`, `Merge` |
| **🏢 Organizations** | Associated businesses or institutions. | `Create`, `Get`, `Get Many (List)`, `Update`, `Update Partial (Patch)`, `Delete` |
| **💼 Deals** | Sales opportunities and pipeline tickets. | `Create`, `Get`, `Get Many (List)`, `Update`, `Update Partial (Patch)`, `Delete`, `Win`, `Lose`, `Move Stage` |
| **📅 Activities** | Planned or completed follow-up interactions. | `Create`, `Get`, `Get Many (List)`, `Update`, `Update Partial (Patch)`, `Delete`, `Complete` |
| **📦 Products / Items** | Product catalog and pricing entries. | `Create`, `Get`, `Get Many (List)`, `Update`, `Update Partial (Patch)`, `Delete` |
| **🛣️ Pipelines** | Sales pipeline structures / funnels. | `Create`, `Get`, `Get Many (List)`, `Update`, `Update Partial (Patch)`, `Delete`, `Get Stages` |
| **📊 Stages** | Dynamic pipeline stages with success probability. | `Create`, `Get`, `Get Many (List)`, `Update`, `Update Partial (Patch)`, `Delete` |
| **❌ Lost Reasons** | Standardized catalog for rejected deals. | `Create`, `Get`, `Get Many (List)`, `Update`, `Update Partial (Patch)`, `Delete` |
| **🏆 Won Reasons** | Standardized catalog for successful deal closings. | `Create`, `Get`, `Get Many (List)`, `Update`, `Update Partial (Patch)`, `Delete` |
| **👥 Users** | Workspace administrators, SDRs, and sellers. | `Get`, `Get Authenticated User (Me)`, `Get Many (List)` |

---

## Installation

### For Cloud / Self-Hosted n8n (UI)
1. Go to **Settings** > **Community Nodes** in your n8n dashboard.
2. Click **Install a Node**.
3. Enter `n8n-nodes-alze` as the NPM package name.
4. Agree to terms and click **Install**.

### For Local n8n Instances (CLI)
In your n8n installation directory, install the package globally or locally:
```bash
npm install n8n-nodes-alze
```

---

## Authentication Setup

1. Add the **Alze CRM** node to your workflow.
2. Under **Credentials**, select **Create New Credential**.
3. Provide your Alze CRM **API Key** (issued from your workspace settings page).
4. Save and start building!

---

## Custom Fields Setup Guide

Alze CRM supports highly customizable properties for `Contacts`, `Organizations`, and `Deals`. This node provides two convenient methods to map these fields:

### Method A: Custom Fields (UI)
A clean, interactive table allowing you to add dynamic key-value properties:
* **Key**: `cpf_cnpj` | **Value**: `123.456.789-00`
* **Key**: `segmento` | **Value**: `Imobiliário`

### Method B: Custom Fields (JSON)
For complex dynamic bindings or passing JSON variables directly:
```json
{
  "origem": "lead_ads",
  "data_conversao": "2026-05-28",
  "score": 85
}
```

---

## License

This project is licensed under the [MIT License](LICENSE). Developed with ❤️ by **Synapso Lab**.
