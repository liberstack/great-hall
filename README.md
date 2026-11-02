# Great Hall

Galeria pessoal de imagens e conceitos gerados por ferramentas de IA.
Projeto estático em HTML, CSS e JavaScript puro, sem build, sem dependências e sem framework.

## Estrutura

```
.
├── index.html
├── README.md
└── src/
    ├── assets/          imagens da galeria
    ├── data/
    │   └── data.json    lista de imagens e tags
    ├── scripts/
    │   ├── script.js    lógica da galeria
    │   └── theme.js     alternância dark/light
    └── styles/
        ├── style.css    estilo base (tema escuro)
        └── theme.css    tema claro e botão de tema
```

## Arquivos

### `index.html`

Esqueleto da página. Define o cabeçalho, a barra de filtros, o mural (`#wall`) e o visualizador em tela cheia (`#viewer`). Os cards, filtros e o botão de tema não estão escritos aqui: são injetados via JavaScript.

Ordem de carregamento no `<head>`: fontes, `style.css`, `theme.css` e `theme.js`. O `script.js` é carregado no fim do `<body>`.

### `src/scripts/script.js`

Toda a lógica da galeria:

- Carrega `src/data/data.json` com `fetch`.
- Gera os filtros automaticamente a partir das tags encontradas.
- Renderiza os cards no mural e atualiza o contador de peças.
- Controla o visualizador: abrir, fechar, navegar entre imagens e atalhos de teclado (`Esc`, seta esquerda, seta direita).

Se o `data.json` não carregar ou estiver vazio, mostra uma mensagem de estado vazio.

### `src/scripts/theme.js`

Alternância entre tema escuro e claro:

- Aplica o atributo `data-theme` no `<html>`.
- Na primeira visita, segue o tema do sistema (`prefers-color-scheme`).
- Depois do primeiro clique, a escolha fica salva em `localStorage` (chave `great-hall-theme`) e passa a ter prioridade.
- Cria o botão no cabeçalho via JavaScript.
- Roda no `<head>`, sem `defer`, para o tema correto ser aplicado antes da primeira pintura (evita o flash do tema errado).

### `src/styles/style.css`

Estilo base do projeto, escrito para o tema escuro. Todas as cores e fontes estão em variáveis no `:root` (`--bg`, `--plate`, `--brass`, `--text`, `--border`, entre outras). Contém:

- Cabeçalho e barra de filtros.
- Mural em colunas (masonry via `column-count`), que se adapta a qualquer proporção de imagem: 1 coluna no celular, até 4 em telas grandes.
- Cards, tags e visualizador.
- Regra para `prefers-reduced-motion`.

### `src/styles/theme.css`

Carregado depois do `style.css`. Contém:

- O tema claro: apenas sobrescreve as variáveis de cor quando `data-theme="light"`.
- Ajustes para elementos que ficam sobre imagem ou sobre o fundo do visualizador (tags, índice dos cards, modal), que mantêm a paleta escura nos dois temas.
- O estilo do botão de alternância.

Para mudar a paleta clara, edite apenas o bloco `:root[data-theme="light"]`.

### `src/data/data.json`

Lista de itens da galeria. Cada item é um objeto com o nome do arquivo e as tags:

```json
[
  { "file": "exemplo-01.png", "tags": ["concept", "paisagem"] },
  { "file": "exemplo-02.png", "tags": ["retrato"] }
]
```

- `file`: nome do arquivo dentro de `src/assets/`.
- `tags`: lista de strings. Os botões de filtro são gerados a partir delas, em ordem alfabética.

### `src/assets/`

Pasta das imagens exibidas na galeria. O nome do arquivo precisa ser igual ao campo `file` do `data.json`.

## Como adicionar uma imagem

1. Coloque o arquivo em `src/assets/`.
2. Adicione um objeto correspondente em `src/data/data.json`.
3. Recarregue a página. Filtros novos aparecem sozinhos se a tag for nova.

## Como rodar localmente

O `script.js` usa `fetch` para ler o `data.json`, o que não funciona abrindo o `index.html` direto pelo sistema de arquivos (`file://`). Use um servidor estático:

```bash
python3 -m http.server 8000
```

Depois acesse `http://localhost:8000`.

## Créditos

Imagens e conceitos gerados com ferramentas de IA.
[github.com/liberstack](https://github.com/liberstack)