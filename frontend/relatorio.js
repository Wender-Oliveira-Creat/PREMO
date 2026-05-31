// ================= PEGAR DADOS =================
const dados = JSON.parse(localStorage.getItem("pressao"));
const historico = JSON.parse(localStorage.getItem("historico")) || [];

// elementos da tela
const alta = document.getElementById("valor-alta-relatorio");
const baixa = document.getElementById("valor-baixa-relatorio");
const status = document.querySelector(".status-normal");

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

// ================= GRÁFICO =================

// pegar dados do histórico
const labels = historico.map(item => item.data);
const dadosAlta = historico.map(item => item.alta);
const dadosBaixa = historico.map(item => item.baixa);

// criar gráfico
const ctx = document.getElementById("grafico");

if (ctx) {
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
            responsive: true,
            plugins: {
                legend: {
                    display: true
                }
            }
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