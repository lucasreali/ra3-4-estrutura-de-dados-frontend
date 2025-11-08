# Documentação da API - Sistema de Biblioteca de Jogos

## Informações Gerais

- **Base URL**: `http://localhost:8080/api/jogos`
- **Formato**: JSON
- **Framework**: Spring Boot

---

## Endpoints

### 1. Criar Jogo

Cria um novo jogo na biblioteca.

- **URL**: `/api/jogos`
- **Método**: `POST`
- **Content-Type**: `application/json`

#### Request Body

```json
{
  "titulo": "string",
  "genero": "string",
  "lancamento": "YYYY-MM-DD"
}
```

#### Campos

| Campo | Tipo | Obrigatório | Validação | Descrição |
|-------|------|-------------|-----------|-----------|
| titulo | String | Sim | NotBlank | Título do jogo |
| genero | String | Sim | NotBlank | Gênero do jogo |
| lancamento | LocalDate | Sim | Past | Data de lançamento (deve ser no passado) |

#### Exemplo de Request

```json
{
  "titulo": "The Legend of Zelda: Breath of the Wild",
  "genero": "Action-Adventure",
  "lancamento": "2017-03-03"
}
```

#### Response

**Status**: `200 OK`

```json
"Jogo criado com sucesso!"
```

#### Possíveis Erros

- **400 Bad Request**: Quando os campos não atendem às validações
  - Título vazio: "O título é obrigatório"
  - Gênero vazio: "O gênero é obrigatório"
  - Data de lançamento ausente: "A data de lançamento é obrigatória"
  - Data de lançamento no futuro: "A data de lançamento deve ser no passado"

---

### 2. Listar Jogos

Retorna a lista de todos os jogos cadastrados na biblioteca.

- **URL**: `/api/jogos`
- **Método**: `GET`
- **Content-Type**: `application/json`

#### Response

**Status**: `200 OK`

```json
[
  {
    "titulo": "The Legend of Zelda: Breath of the Wild",
    "genero": "Action-Adventure",
    "lancamento": "2017-03-03"
  },
  {
    "titulo": "Minecraft",
    "genero": "Sandbox",
    "lancamento": "2011-11-18"
  }
]
```

#### Estrutura do Jogo

| Campo | Tipo | Descrição |
|-------|------|-----------|
| titulo | String | Título do jogo |
| genero | String | Gênero do jogo |
| lancamento | LocalDate | Data de lançamento |

---

### 3. Ordenar Jogos com Bubble Sort

Ordena a lista de jogos usando o algoritmo Bubble Sort.

- **URL**: `/api/jogos/ordenar/bubble-sort`
- **Método**: `POST`
- **Content-Type**: `application/json`

#### Request Body

```json
{
  "criterio": "titulo|genero|ano"
}
```

#### Campos

| Campo | Tipo | Obrigatório | Validação | Descrição |
|-------|------|-------------|-----------|-----------|
| criterio | String | Sim | Pattern: `^(titulo|genero|ano)$` | Critério de ordenação |

#### Exemplo de Request

```json
{
  "criterio": "titulo"
}
```

#### Response

**Status**: `200 OK`

```json
{
  "algoritmo": "Bubble Sort",
  "criterio": "titulo",
  "tempoExecucaoMs": 15,
  "jogos": [
    {
      "titulo": "Minecraft",
      "genero": "Sandbox",
      "lancamento": "2011-11-18"
    },
    {
      "titulo": "The Legend of Zelda: Breath of the Wild",
      "genero": "Action-Adventure",
      "lancamento": "2017-03-03"
    }
  ]
}
```

#### Estrutura da Response

| Campo | Tipo | Descrição |
|-------|------|-----------|
| algoritmo | String | Nome do algoritmo utilizado |
| criterio | String | Critério de ordenação aplicado |
| tempoExecucaoMs | Long | Tempo de execução em milissegundos |
| jogos | List\<Jogo\> | Lista de jogos ordenados |

#### Possíveis Erros

- **400 Bad Request**: Quando o critério é inválido
  - Critério vazio: "O critério de ordenação é obrigatório"
  - Critério inválido: "Critério deve ser: titulo, genero ou ano"

---

### 4. Ordenar Jogos com Insertion Sort

Ordena a lista de jogos usando o algoritmo Insertion Sort.

- **URL**: `/api/jogos/ordenar/insertion-sort`
- **Método**: `POST`
- **Content-Type**: `application/json`

#### Request Body

```json
{
  "criterio": "titulo|genero|ano"
}
```

#### Campos

| Campo | Tipo | Obrigatório | Validação | Descrição |
|-------|------|-------------|-----------|-----------|
| criterio | String | Sim | Pattern: `^(titulo|genero|ano)$` | Critério de ordenação |

#### Exemplo de Request

```json
{
  "criterio": "genero"
}
```

#### Response

**Status**: `200 OK`

```json
{
  "algoritmo": "Insertion Sort",
  "criterio": "genero",
  "tempoExecucaoMs": 8,
  "jogos": [
    {
      "titulo": "The Legend of Zelda: Breath of the Wild",
      "genero": "Action-Adventure",
      "lancamento": "2017-03-03"
    },
    {
      "titulo": "Minecraft",
      "genero": "Sandbox",
      "lancamento": "2011-11-18"
    }
  ]
}
```

#### Estrutura da Response

| Campo | Tipo | Descrição |
|-------|------|-----------|
| algoritmo | String | Nome do algoritmo utilizado |
| criterio | String | Critério de ordenação aplicado |
| tempoExecucaoMs | Long | Tempo de execução em milissegundos |
| jogos | List\<Jogo\> | Lista de jogos ordenados |

#### Possíveis Erros

- **400 Bad Request**: Quando o critério é inválido
  - Critério vazio: "O critério de ordenação é obrigatório"
  - Critério inválido: "Critério deve ser: titulo, genero ou ano"

---

### 5. Ordenar Jogos com Quick Sort

Ordena a lista de jogos usando o algoritmo Quick Sort.

- **URL**: `/api/jogos/ordenar/quick-sort`
- **Método**: `POST`
- **Content-Type**: `application/json`

#### Request Body

```json
{
  "criterio": "titulo|genero|ano"
}
```

#### Campos

| Campo | Tipo | Obrigatório | Validação | Descrição |
|-------|------|-------------|-----------|-----------|
| criterio | String | Sim | Pattern: `^(titulo|genero|ano)$` | Critério de ordenação |

#### Exemplo de Request

```json
{
  "criterio": "ano"
}
```

#### Response

**Status**: `200 OK`

```json
{
  "algoritmo": "Quick Sort",
  "criterio": "ano",
  "tempoExecucaoMs": 5,
  "jogos": [
    {
      "titulo": "Minecraft",
      "genero": "Sandbox",
      "lancamento": "2011-11-18"
    },
    {
      "titulo": "The Legend of Zelda: Breath of the Wild",
      "genero": "Action-Adventure",
      "lancamento": "2017-03-03"
    }
  ]
}
```

#### Estrutura da Response

| Campo | Tipo | Descrição |
|-------|------|-----------|
| algoritmo | String | Nome do algoritmo utilizado |
| criterio | String | Critério de ordenação aplicado |
| tempoExecucaoMs | Long | Tempo de execução em milissegundos |
| jogos | List\<Jogo\> | Lista de jogos ordenados |

#### Possíveis Erros

- **400 Bad Request**: Quando o critério é inválido
  - Critério vazio: "O critério de ordenação é obrigatório"
  - Critério inválido: "Critério deve ser: titulo, genero ou ano"

---

## Critérios de Ordenação

Os seguintes critérios são aceitos para ordenação:

- **titulo**: Ordena alfabeticamente pelo título do jogo
- **genero**: Ordena alfabeticamente pelo gênero do jogo
- **ano**: Ordena cronologicamente pela data de lançamento

---

## Algoritmos de Ordenação

### Bubble Sort
- **Complexidade**: O(n²) no pior caso
- **Descrição**: Compara elementos adjacentes e os troca se estiverem fora de ordem
- **Uso recomendado**: Listas pequenas ou para fins didáticos

### Insertion Sort
- **Complexidade**: O(n²) no pior caso, O(n) no melhor caso
- **Descrição**: Constrói a lista ordenada um elemento por vez
- **Uso recomendado**: Listas pequenas ou quase ordenadas

### Quick Sort
- **Complexidade**: O(n log n) em média, O(n²) no pior caso
- **Descrição**: Algoritmo de divisão e conquista usando pivô
- **Uso recomendado**: Listas grandes, melhor performance geral

---

## Exemplos de Uso com cURL

### Criar um Jogo

```bash
curl -X POST http://localhost:8080/api/jogos \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "The Legend of Zelda: Breath of the Wild",
    "genero": "Action-Adventure",
    "lancamento": "2017-03-03"
  }'
```

### Listar Jogos

```bash
curl -X GET http://localhost:8080/api/jogos
```

### Ordenar por Título com Quick Sort

```bash
curl -X POST http://localhost:8080/api/jogos/ordenar/quick-sort \
  -H "Content-Type: application/json" \
  -d '{
    "criterio": "titulo"
  }'
```

---

## Códigos de Status HTTP

| Código | Descrição |
|--------|-----------|
| 200 OK | Requisição bem-sucedida |
| 400 Bad Request | Erro de validação nos dados enviados |
| 500 Internal Server Error | Erro interno do servidor |

---

## Notas Técnicas

1. **Persistência**: A aplicação utiliza armazenamento em memória através da classe `Biblioteca`
2. **Validação**: Todas as requisições passam por validação usando Bean Validation (Jakarta Validation)
3. **Performance**: O tempo de execução retornado nos endpoints de ordenação é medido em milissegundos
4. **Thread Safety**: A implementação atual não é thread-safe, adequada para uso em desenvolvimento/estudos

---

## Estrutura de Dados

### Entidade Jogo

```java
{
  "titulo": String,
  "genero": String,
  "lancamento": LocalDate (formato: YYYY-MM-DD)
}
```

### Request de Criação de Jogo

```java
{
  "titulo": String (obrigatório, não vazio),
  "genero": String (obrigatório, não vazio),
  "lancamento": LocalDate (obrigatório, deve ser no passado)
}
```

### Request de Ordenação

```java
{
  "criterio": String (obrigatório, valores: "titulo", "genero" ou "ano")
}
```

### Response de Jogos Ordenados

```java
{
  "algoritmo": String,
  "criterio": String,
  "tempoExecucaoMs": Long,
  "jogos": List<Jogo>
}
```

---

## Contato e Suporte

Para dúvidas ou problemas, consulte o código fonte ou entre em contato com o desenvolvedor.

**Versão da Documentação**: 1.0  
**Última Atualização**: 2025-11-08

