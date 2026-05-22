// ================= NAVEGAÇÃO =================

function irAlerta() {
    document.getElementById("tela-relatorio").classList.add("hidden");
    document.getElementById("tela-alerta").classList.remove("hidden");
}

function voltar() {
    document.getElementById("tela-alerta").classList.add("hidden");
    document.getElementById("tela-relatorio").classList.remove("hidden");
}

function mostrarRelatorio() {
    voltar();
}


// ================= GRÁFICO =================

const ctx = document.getElementById('grafico');

if (ctx) {
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['S', 'T', 'Q', 'Q', 'S', 'S', 'D'],
            datasets: [
                {
                    label: 'Sistólica',
                    data: [125, 130, 120, 135, 128, 122, 124],
                    backgroundColor: '#002f4b'
                },
                {
                    label: 'Diastólica',
                    data: [82, 85, 80, 88, 84, 78, 81],
                    backgroundColor: '#fe6332'
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top'
                }
            }
        }
    });
}


// ================= PDF PROFISSIONAL =================

async function gerarPDF() {
    const elemento = document.getElementById("relatorioPDF");

    if (!elemento) {
        alert("Relatório não encontrado!");
        return;
    }

    const canvas = await html2canvas(elemento, {
        scale: 2,
        useCORS: true
    });

    const imgData = canvas.toDataURL("image/png");

    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF("p", "mm", "a4");

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 40; // começa abaixo do header

    // ================= HEADER =================
    const agora = new Date();
    const dataHora = agora.toLocaleString("pt-BR");

    const nome = usuario?.nome || "Paciente";

    // LOGO
    const logoURL = "https://i.imgur.com/4M7IWwP.png";

    pdf.addImage(logoURL, "PNG", 14, 5, 20, 20);

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(14);
    pdf.text("RELATÓRIO DE PRESSÃO ARTERIAL", 40, 12);

    pdf.setFontSize(10);
    pdf.setFont("helvetica", "normal");
    pdf.text(`Paciente: ${nome}`, 40, 18);
    pdf.text(`Gerado em: ${dataHora}`, 40, 24);

    // ================= CONTEÚDO =================
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);

    heightLeft -= (pageHeight - position);

    // ================= PAGINAÇÃO CORRETA =================
    while (heightLeft > 0) {
        pdf.addPage();
        position = heightLeft - imgHeight;
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
    }

    pdf.save(`relatorio-${nome}.pdf`);
}

const usuario = {
    nome: "Nicolas Gonçalves"
};

const nomeEl = document.getElementById("nomeUsuario");

if (nomeEl) {
    nomeEl.innerText = "Paciente: " + usuario.nome;
}