// ================= PEGAR DADOS =================
const dados = JSON.parse(localStorage.getItem("pressao"));
const historico = JSON.parse(localStorage.getItem("historico")) || [];

// elementos da tela
const alta = document.getElementById("valor-alta-relatorio");
const baixa = document.getElementById("valor-baixa-relatorio");
const status = document.querySelector(".status-normal");
const mediaElemento = document.getElementById("media-pressao");

// ================= ÚLTIMA MEDIÇÃO =================
if (dados) {

    const valorAlta = parseInt(dados.alta);
    const valorBaixa = parseInt(dados.baixa);

    alta.innerText = valorAlta;
    baixa.innerText = valorBaixa;

    if (valorAlta < 90 || valorBaixa < 60) {

        status.innerText = "Pressão Baixa";
        status.style.background = "#dbeafe";
        status.style.color = "#2563eb";

    }
    else if (valorAlta >= 140 || valorBaixa >= 90) {

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

// ================= MÉDIA =================
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

} else {

    mediaElemento.innerText = "0/0";

}

// ================= ESTATÍSTICAS =================
const totalMedicoes = document.getElementById("total-medicoes");
const melhorPressao = document.getElementById("melhor-pressao");
const piorPressao = document.getElementById("pior-pressao");
const tendencia = document.getElementById("tendencia");

if (historico.length > 0) {

    totalMedicoes.innerText = historico.length;

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

    if (historico.length >= 2) {

        const anterior =
            historico[historico.length - 2];

        const ultima =
            historico[historico.length - 1];

        const somaAnterior =
            parseInt(anterior.alta) +
            parseInt(anterior.baixa);

        const somaUltima =
            parseInt(ultima.alta) +
            parseInt(ultima.baixa);

        if (somaUltima < somaAnterior) {

            tendencia.innerText = "📈 Melhorando";
            tendencia.style.color = "green";

        }
        else if (somaUltima > somaAnterior) {

            tendencia.innerText = "📉 Piorando";
            tendencia.style.color = "red";

        }
        else {

            tendencia.innerText = "➡️ Estável";
            tendencia.style.color = "#b45309";

        }

    } else {

        tendencia.innerText = "Dados insuficientes";

    }

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
                    label: "Sistólica",
                    data: dadosAlta,
                    borderWidth: 2,
                    tension: 0.3
                },
                {
                    label: "Diastólica",
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