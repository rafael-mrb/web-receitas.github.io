# Sabores do Mundo

Projeto Final · RA 3 — Site de receitas feito com HTML, CSS e JavaScript.

- **Tema:** Receitas
- **Site publicado (GitHub Pages):** [COLE AQUI O LINK]
- **Repositório:** [COLE AQUI O LINK]

## Integrantes e responsabilidades

## Integrante
- Renan Carneiro
- Victor Hugo
- Rafael Vinicius

## API utilizada

**TheMealDB** — pública, gratuita, sem chave de acesso e com CORS liberado.

| Uso | Método | Endpoint |
|---|---|---|
| Buscar receitas (página Explorar) | GET | `https://www.themealdb.com/api/json/v1/1/search.php?s=chicken` |
| Enviar formulário (página Contato) | POST | `https://jsonplaceholder.typicode.com/posts` |

## Páginas

| Página | Arquivo | O que tem |
|---|---|---|
| Início | `index.html` | Apresentação do tema e do grupo |
| Explorar | `explorar.html` | Cartões da API, busca, filtro de favoritos e modo escuro |
| Ferramentas | `ferramentas.html` | Calculadora de porções e estatísticas dos favoritos |
| Contato | `contato.html` | Formulário que envia dados com POST |

## TDE 01 — Funções em JavaScript

Ferramenta ligada ao tema: **calculadora de porções** e **estatísticas dos favoritos** (média e filtro de ingredientes).

| Função | Recebe | Devolve | Onde é usada |
|---|---|---|---|
| `somar(a, b)` | dois números | `a + b` | Botão "Somar" (via `calcular`) |
| `subtrair(a, b)` | dois números | `a - b` | Botão "Subtrair" (via `calcular`) |
| `multiplicar(a, b)` | dois números | `a * b` | Botão "Multiplicar" (via `calcular`) |
| `dividir(a, b)` | dois números | `a / b`, ou mensagem se `b` for 0 | Botão "Dividir" (via `calcular`) |
| `calcular(a, b, operacao)` | dois números e uma função (**callback**) | resultado de `operacao(a, b)` | `configurarFerramentas`, no clique dos botões |
| `calcularMedia(numeros)` | array de números | média (0 se o array estiver vazio) | `atualizarEstatisticas` |
| `filtrarPorIngredientes(favoritos, minimo)` | array de favoritos e um número | novo array só com os favoritos com `ingredientes >= minimo` | `mostrarFiltradas` |
| `contarIngredientes(receita)` | objeto de receita da API | quantidade de ingredientes preenchidos | `mostrarCartoes` e `alternarFavorito` |

**Onde estão os requisitos:**
- Arrow functions: `calcularMedia`, `filtrarPorIngredientes` e vários callbacks de `forEach`, `map` e `filter`.
- Função anônima: o `function () {...}` do clique no botão de favoritar, em `mostrarCartoes`.
- Callback: `calcular(a, b, operacao)`, chamada em `configurarFerramentas`.
- Métodos de array usados: `forEach`, `map`, `filter`, `reduce`, `find`, `includes` e `push`.

## TDE 02 — Relatório de debugging

> Preencham com os bugs **reais** que aconteceram no desenvolvimento. Mínimo de 3 erros, sendo pelo menos 1 de lógica, 1 print de breakpoint (com Scope ou Watch visível) e 1 investigado pela aba Network.

### Bug 1 — Texto do botão de tema não muda
- **Mensagem do console ou sintoma:** ao clicar em "Modo escuro", o fundo da página escurece, mas o botão continua escrito "Modo escuro". Ao recarregar a página já no tema escuro, o texto também continua errado. Nenhum erro aparece no Console.
- **Como foi identificado:** breakpoint + Watch.
- **Antes:**
  ```js
  // trecho com o erro
  function aplicarTema() {
  document.body.classList.toggle("escuro", localStorage.getItem("tema") === "escuro");
  }
  ```
- **Depois:**
  ```js
  // trecho corrigido
  function aplicarTema() {
  const escuro = localStorage.getItem("tema") === "escuro";
  document.body.classList.toggle("escuro", escuro);
  document.querySelector(".tema").textContent = escuro ? "Modo claro" : "Modo escuro";
  }
  ```

### Bug 2 — [título curto] (lógica: o código rodava, mas o resultado estava errado)
- **Sintoma:** [descreva]
- **Como foi identificado:** [descreva]
- **Antes:**
  ```js
  // trecho com o erro
  ```
- **Depois:**
  ```js
  // trecho corrigido
  ```

### Bug 3 — [título curto] (investigado na aba Network)
- **Sintoma:** [ex.: 404, URL errada, body sem JSON.stringify]
- **Como foi identificado:** aba Network — [o que aparecia: status, request, response]
- **Antes:**
  ```js
  // trecho com o erro
  ```
- **Depois:**
  ```js
  // trecho corrigido
  ```

### Print do breakpoint
![Código pausado num breakpoint com Scope/Watch visível](prints/breakpoint.png)

## Como rodar localmente

Abra a pasta no VS Code e use a extensão **Live Server** no `index.html`.
