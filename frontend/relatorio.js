// ================= PEGAR DADOS =================
const dados = JSON.parse(localStorage.getItem("pressao"));
const historico = JSON.parse(localStorage.getItem("historico")) || [];

// elementos da tela
const alta = document.getElementById("valor-alta-relatorio");
const baixa = document.getElementById("valor-baixa-relatorio");
const status = document.querySelector(".status-normal");
const mediaElemento = document.getElementById("media-pressao");

// ================= MOSTRAR ÚLTIMA MEDIÇÃO =================
if (dados) {

    const valorAlta = parseInt(dados.alta);
    const valorBaixa = parseInt(dados.baixa);

    alta.innerText = valorAlta || 0;
    baixa.innerText = valorBaixa || 0;

    if (valorAlta >= 140 || valorBaixa >= 90) {
        status.innerText = "Pressão Alta";
        status.style.background = "#fecaca";
        status.style.color = "red";
    } 
    else if (valorAlta >= 120 || valorBaixa >= 80) {
        status.innerText = "Atenção";
        status.style.background = "#fef9c3";
        status.style.color = "#b45309";
    } 
    else {
        status.innerText = "Pressão Normal";
        status.style.background = "#d1fae5";
        status.style.color = "green";
    }

} else {
    alta.innerText = 0;
    baixa.innerText = 0;
    status.innerText = "Sem dados";
}

// ================= MÉDIA INTELIGENTE =================
if (historico.length > 0) {

    let somaAlta = 0;
    let somaBaixa = 0;

    historico.forEach(item => {
        somaAlta += parseInt(item.alta);
        somaBaixa += parseInt(item.baixa);
    });

    const mediaAlta = Math.round(somaAlta / historico.length);
    const mediaBaixa = Math.round(somaBaixa / historico.length);

    mediaElemento.innerText = `${mediaAlta}/${mediaBaixa}`;

    // 🔥 MESMA LÓGICA DO STATUS
    if (mediaAlta >= 140 || mediaBaixa >= 90) {
        mediaElemento.style.color = "red";
    } 
    else if (mediaAlta >= 120 || mediaBaixa >= 80) {
        mediaElemento.style.color = "orange";
    } 
    else {
        mediaElemento.style.color = "green";
    }

} else {
    mediaElemento.innerText = "0/0";
}

// ================= ESTATÍSTICAS =================

const totalMedicoes = document.getElementById("total-medicoes");
const melhorPressao = document.getElementById("melhor-pressao");
const piorPressao = document.getElementById("pior-pressao");
const tendencia = document.getElementById("tendencia");

if (historico.length > 0) {

    // total
    totalMedicoes.innerText = historico.length;

    // melhor e pior
    let melhor = historico[0];
    let pior = historico[0];

    historico.forEach(item => {

        const somaAtual =
            parseInt(item.alta) +
            parseInt(item.baixa);

        const somaMelhor =
            parseInt(melhor.alta) +
            parseInt(melhor.baixa);

        const somaPior =
            parseInt(pior.alta) +
            parseInt(pior.baixa);

        if (somaAtual < somaMelhor) {
            melhor = item;
        }

        if (somaAtual > somaPior) {
            pior = item;
        }
    });

    melhorPressao.innerText =
        `${melhor.alta}/${melhor.baixa}`;

    piorPressao.innerText =
        `${pior.alta}/${pior.baixa}`;

    // tendência
    if (historico.length >= 2) {

        const ultima =
            historico[historico.length - 1];

        const anterior =
            historico[historico.length - 2];

        const somaUltima =
            parseInt(ultima.alta) +
            parseInt(ultima.baixa);

        const somaAnterior =
            parseInt(anterior.alta) +
            parseInt(anterior.baixa);

        if (somaUltima > somaAnterior) {
            tendencia.innerText = "📈 Subindo";
        }
        else if (somaUltima < somaAnterior) {
            tendencia.innerText = "📉 Melhorando";
        }
        else {
            tendencia.innerText = "➖ Estável";
        }

    } else {
        tendencia.innerText = "Dados insuficientes";
    }

}

// ================= TENDÊNCIA =================

const tendenciaElemento = document.getElementById("tendencia");

if (historico.length >= 2) {

    const primeira = historico[0];
    const ultima = historico[historico.length - 1];

    const valorPrimeira =
        parseInt(primeira.alta) +
        parseInt(primeira.baixa);

    const valorUltima =
        parseInt(ultima.alta) +
        parseInt(ultima.baixa);

    if (valorUltima < valorPrimeira) {

        tendenciaElemento.innerText = "📈 Melhorando";
        tendenciaElemento.style.color = "green";

    }
    else if (valorUltima > valorPrimeira) {

        tendenciaElemento.innerText = "📉 Piorando";
        tendenciaElemento.style.color = "red";

    }
    else {

        tendenciaElemento.innerText = "➡️ Estável";
        tendenciaElemento.style.color = "#b45309";

    }

}
else {

    tendenciaElemento.innerText = "Dados insuficientes";

}

// ================= GRÁFICO =================
const labels = historico.map(item => item.data);
const dadosAlta = historico.map(item => parseInt(item.alta));
const dadosBaixa = historico.map(item => parseInt(item.baixa));

const ctx = document.getElementById("grafico");

if (ctx && historico.length > 0) {
    new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
            datasets: [
                {
                    label: "Sistólica (Alta)",
                    data: dadosAlta,
                    borderWidth: 2,
                    tension: 0.3
                },
                {
                    label: "Diastólica (Baixa)",
                    data: dadosBaixa,
                    borderWidth: 2,
                    tension: 0.3
                }
            ]
        },
        options: {
            responsive: true
        }
    });
}

// ================= PDF =================
async function gerarPDF() {

    const elemento = document.querySelector(".container");

    const canvas = await html2canvas(elemento);
    const imgData = canvas.toDataURL("image/png");

    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();

    pdf.addImage(imgData, "PNG", 10, 10, 180, 0);

    pdf.save("relatorio.pdf");
}