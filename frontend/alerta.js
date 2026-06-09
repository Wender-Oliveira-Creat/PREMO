const dados = JSON.parse(localStorage.getItem("pressao"));

const titulo = document.getElementById("titulo");
const valor = document.getElementById("valor");
const mensagem = document.getElementById("mensagem-box");

if (dados && dados.alta && dados.baixa) {

    const alta = parseInt(dados.alta);
    const baixa = parseInt(dados.baixa);

    valor.innerText = `${alta}/${baixa}`;

    // PRESSÃO BAIXA
    if (alta < 90 || baixa < 60) {

        titulo.innerText = "🔵 Pressão Baixa Detectada";
        mensagem.innerText = "Sente-se, hidrate-se e acompanhe os sintomas.";

    }

    // PRESSÃO ALTA
    else if (alta >= 140 || baixa >= 90) {

        titulo.innerText = "🔴 Pressão Alta Detectada";
        mensagem.innerText = "Procure ajuda médica e monitore sua pressão.";

    }

    // ATENÇÃO
    else if (alta >= 120 || baixa >= 80) {

        titulo.innerText = "🟡 Atenção";
        mensagem.innerText = "Sua pressão está acima do ideal.";

    }

    // NORMAL
    else {

        titulo.innerText = "🟢 Pressão Normal";
        mensagem.innerText = "Tudo certo. Continue monitorando.";

    }

} else {

    titulo.innerText = "Sem dados";
    mensagem.innerText = "Faça uma medição.";

}