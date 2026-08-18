# Great Hall

Galeria de imagens pessoal, estática — HTML, CSS e JS puros, sem build e sem dependências.

## Stack

- HTML5
- CSS3 (custom properties, grid masonry via `column-count`)
- JavaScript vanilla (ES6+)
- Fontes: Fraunces (display) + JetBrains Mono (mono), via Google Fonts

## Estrutura

```
great-hall/
├── index.html
├── style.css
├── script.js
├── data.json
└── gallery/          # imagens referenciadas em data.json
```

## Como funciona

Todo o conteúdo vem de `data.json`: uma lista de objetos com `file` (nome do arquivo dentro de `gallery/`) e `tags` (array de strings livres).

```json
{
  "file": "Tellus_Earth.webp",
  "tags": ["female", "earth", "fantasy", "AI"]
}
```

- **Filtros**: gerados automaticamente a partir do conjunto de tags únicas presentes em `data.json`. Não há necessidade de declarar tags em nenhum outro lugar.
- **Grid**: masonry responsivo via `column-count` (1 → 4 colunas conforme breakpoint), aceita qualquer proporção de imagem.
- **Modal (viewer)**: clique em qualquer card abre visualização em tela cheia, com navegação anterior/próxima (clique, setas do teclado, ou tecla `Esc` para fechar).

## Adicionando itens

1. Coloque a imagem em `gallery/`.
2. Adicione uma entrada em `data.json` com `file` e `tags`.

Não precisa mexer em HTML, CSS ou JS.

## Rodando localmente

Como o script usa `fetch("data.json")`, é preciso servir os arquivos por HTTP (não abrir `index.html` direto via `file://`):

```bash
npx serve .
# ou
python3 -m http.server
```

## Autor

[github.com/liberstack](https://github.com/liberstack)