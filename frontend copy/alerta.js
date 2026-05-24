const dados = JSON.parse(localStorage.getItem("pressao"));

const titulo = document.getElementById("titulo");
const valor = document.getElementById("valor");
const mensagem = document.getElementById("mensagem-box");

if (dados) {

    const alta = parseInt(dados.alta);
    const baixa = parseInt(dados.baixa);

    valor.innerText = `${alta}/${baixa}`;

    if (alta >= 140 || baixa >= 90) {

        titulo.innerText = "⚠ Pressão Alta Detectada";
        mensagem.innerText = "Procure ajuda médica!";

    } 
    else if (alta >= 120 || baixa >= 80) {

        titulo.innerText = "⚠ Atenção";
        mensagem.innerText = "Fique atento.";

    } 
    else {

        titulo.innerText = "✅ Pressão Normal";
        mensagem.innerText = "Tudo certo.";

    }

} else {

    titulo.innerText = "Sem dados";
    mensagem.innerText = "Faça uma medição.";

}