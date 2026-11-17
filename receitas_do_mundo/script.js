const API_URL = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
let listaDeReceitas = [];
let tempoBusca;


function lerFavoritos() {
   return JSON.parse(localStorage.getItem("favoritos") || "[]"); 
  }


function salvarFavoritos(favoritos) {
   localStorage.setItem("favoritos", JSON.stringify(favoritos)); 
  }


function aplicarTema() {
  document.body.classList.toggle("escuro", localStorage.getItem("tema") === "escuro");
}


function configurarTema() {
  const botaoTema = document.querySelector(".tema");
  aplicarTema();
  botaoTema.addEventListener("click", () => {
    localStorage.setItem("tema", document.body.classList.contains("escuro") ? "claro" : "escuro");
    aplicarTema();
  });
}

async function carregarReceitas(termo = "chicken") {
  const mensagem = document.getElementById("mensagem");
  mensagem.textContent = "Carregando...";
  try {
    const resposta = await fetch(API_URL + encodeURIComponent(termo));
    if (!resposta.ok) throw new Error("Erro na API.");
    const dados = await resposta.json();
    listaDeReceitas = dados.meals || [];
    mensagem.textContent = listaDeReceitas.length ? "Receitas carregadas." : "Nenhuma receita encontrada.";
    mostrarCartoes(listaDeReceitas);
  } catch (erro) {
    mensagem.textContent = "Erro ao carregar. Tente novamente mais tarde.";
  }
}

function mostrarCartoes(lista) {
  const area = document.getElementById("listaReceitas");
  const favoritos = lerFavoritos();
  area.textContent = "";
  lista.forEach((receita) => {
    const cartao = document.createElement("article");
    cartao.className = "cartao";
    const imagem = document.createElement("img");
    imagem.src = receita.strMealThumb;
    imagem.alt = "Foto do prato " + receita.strMeal;
    const titulo = document.createElement("h2");
    titulo.textContent = receita.strMeal;
    const texto = document.createElement("p");
    texto.textContent = "Categoria: " + receita.strCategory + " | Origem: " + (receita.strArea || "Não informada");
    const botao = document.createElement("button");
    botao.className = "botao";
    botao.textContent = favoritos.includes(receita.strMeal) ? "Remover favorito" : "Favoritar";
    botao.addEventListener("click", function () {
      let novaLista = lerFavoritos();
      novaLista = novaLista.includes(receita.strMeal)
        ? novaLista.filter((nome) => nome !== receita.strMeal)
        : [...novaLista, receita.strMeal];
      salvarFavoritos(novaLista);
      filtrarFavoritos();
    });
    cartao.append(imagem, titulo, texto, botao);
    area.appendChild(cartao);
  });
}

function filtrarFavoritos() {
  const somenteFavoritos = document.getElementById("somenteFavoritos").checked;
  const favoritos = lerFavoritos();
  const filtrados = somenteFavoritos
    ? listaDeReceitas.filter((receita) => favoritos.includes(receita.strMeal))
    : listaDeReceitas;
  mostrarCartoes(filtrados);
}

function somar(a, b) { return a + b; }
function subtrair(a, b) { return a - b; }
function multiplicar(a, b) { return a * b; }
function dividir(a, b) { return b === 0 ? "Não é possível dividir por zero." : a / b; }
function calcular(a, b, operacao) { return operacao(a, b); }

function configurarFerramentas() {
  const estatistica = document.getElementById("estatistica");
  if (!estatistica) return;
  estatistica.textContent = "Você possui " + lerFavoritos().length + " receita(s) favorita(s).";
  document.querySelectorAll(".operacao").forEach((botao) => {
    botao.addEventListener("click", () => {
      const a = Number(document.getElementById("numeroA").value);
      const b = Number(document.getElementById("numeroB").value);
      const funcoes = { somar, subtrair, multiplicar, dividir };
      document.getElementById("resultado").textContent = "Resultado: " + calcular(a, b, funcoes[botao.dataset.operacao]);
    });
  });
}

function configurarFormulario() {
  const formulario = document.getElementById("formContato");
  if (!formulario) return;
  formulario.addEventListener("submit", async (evento) => {
    evento.preventDefault();
    const retorno = document.getElementById("retornoFormulario");
    try {
      const resposta = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(formulario)))
      });
      retorno.textContent = "Mensagem enviada com status " + resposta.status + ".";
      formulario.reset();
    } catch (erro) {
      retorno.textContent = "Não foi possível enviar a mensagem.";
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  configurarTema();
  if (document.getElementById("listaReceitas")) {
    document.getElementById("busca").addEventListener("input", (evento) => {
      clearTimeout(tempoBusca);
      tempoBusca = setTimeout(() => carregarReceitas(evento.target.value || "chicken"), 400);
    });
    document.getElementById("somenteFavoritos").addEventListener("change", filtrarFavoritos);
    carregarReceitas();
  }
  configurarFerramentas();
  configurarFormulario();
});
