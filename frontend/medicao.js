let campoAtual = "alta";

let valorAlta = "";
let valorBaixa = "";

const displayAlta = document.getElementById("valor-alta");
const displayBaixa = document.getElementById("valor-baixa");

const boxAlta = document.getElementById("box-alta");
const boxBaixa = document.getElementById("box-baixa");

const botoes = document.querySelectorAll(".teclado button");

// ================= TROCAR CAMPO =================
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

// ================= TECLADO =================
botoes.forEach(botao => {
    botao.addEventListener("click", () => {

        const texto = botao.innerText;

        // ================= DIGITAÇÃO =================
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

        // ================= SALVAR =================
        if(texto === "✔"){

            // validação (extra profissional)
            if(!valorAlta || !valorBaixa){
                alert("Preencha os dois valores!");
                return;
            }

            // limite de valores (evita absurdos)
            if(parseInt(valorAlta) > 250 || parseInt(valorBaixa) > 150){
                alert("Valores fora do padrão!");
                return;
            }

            // salvar última medição (pro relatório e alerta)
            localStorage.setItem("pressao", JSON.stringify({
                alta: valorAlta,
                baixa: valorBaixa
            }));

            // salvar histórico
            let historico = JSON.parse(localStorage.getItem("historico")) || [];

            historico.push({
                alta: valorAlta,
                baixa: valorBaixa,
                data: new Date().toLocaleString()
            });

            localStorage.setItem("historico", JSON.stringify(historico));

            alert("Medição salva!");

            // limpar campos (fica mais profissional)
            valorAlta = "";
            valorBaixa = "";
            displayAlta.innerHTML = "0 <small>mmHg</small>";
            displayBaixa.innerHTML = "0 <small>mmHg</small>";

            // redirecionar pro relatório 🚀
            window.location.href = "relatorio.html";
        }

    });
});