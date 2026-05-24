// ================= PEGAR DADOS =================
const dados = JSON.parse(localStorage.getItem("pressao"));

// elementos da tela
const alta = document.getElementById("valor-alta-relatorio");
const baixa = document.getElementById("valor-baixa-relatorio");
const status = document.querySelector(".status-normal");

// ================= MOSTRAR DADOS =================
if (dados) {

    const valorAlta = parseInt(dados.alta);
    const valorBaixa = parseInt(dados.baixa);

    // mostrar números
    alta.innerText = valorAlta || 0;
    baixa.innerText = valorBaixa || 0;

    // ================= STATUS AUTOMÁTICO =================

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


// ================= GERAR PDF =================
async function gerarPDF() {

    const elemento = document.querySelector(".container");

    const canvas = await html2canvas(elemento);
    const imgData = canvas.toDataURL("image/png");

    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();

    pdf.addImage(imgData, "PNG", 10, 10, 180, 0);

    pdf.save("relatorio.pdf");
}