let campoAtual = "alta";

let valorAlta = "";
let valorBaixa = "";

const displayAlta = document.getElementById("valor-alta");
const displayBaixa = document.getElementById("valor-baixa");

const boxAlta = document.getElementById("box-alta");
const boxBaixa = document.getElementById("box-baixa");

const botoes = document.querySelectorAll(".teclado button");

// alternar campo
boxAlta.addEventListener("click", () => {
    campoAtual = "alta";
    boxAlta.classList.add("ativa");
    boxBaixa.classList.remove("ativa");
});

boxBaixa.addEventListener("click", () => {
    campoAtual = "baixa";
    boxBaixa.classList.add("ativa");
    boxAlta.classList.remove("ativa");
});

// teclado
botoes.forEach(botao => {
    botao.addEventListener("click", () => {

        const texto = botao.innerText;

        if(campoAtual === "alta"){

            if(texto === "⌫"){
                valorAlta = valorAlta.slice(0, -1);
            }
            else if(texto !== "✔"){
                valorAlta += texto;
            }

            displayAlta.innerHTML = (valorAlta || 0) + " <small>mmHg</small>";
        }
        else{

            if(texto === "⌫"){
                valorBaixa = valorBaixa.slice(0, -1);
            }
            else if(texto !== "✔"){
                valorBaixa += texto;
            }

            displayBaixa.innerHTML = (valorBaixa || 0) + " <small>mmHg</small>";
        }

        // SALVAR
        if(texto === "✔"){

            localStorage.setItem("pressao", JSON.stringify({
                alta: valorAlta,
                baixa: valorBaixa
            }));

            alert("Medição salva!");
        }

    });
});