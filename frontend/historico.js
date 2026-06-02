const lista = document.getElementById("lista-historico");

let historico = JSON.parse(localStorage.getItem("historico")) || [];

historico.reverse();

if (historico.length === 0) {
    lista.innerHTML = "<p>Nenhuma medição encontrada.</p>";
} else {

    historico.forEach(item => {

        const alta = parseInt(item.alta);
        const baixa = parseInt(item.baixa);

        let cor = "green";
        let texto = "Normal";

        if (alta >= 140 || baixa >= 90) {
            cor = "red";
            texto = "Alta";
        } 
        else if (alta >= 120 || baixa >= 80) {
            cor = "orange";
            texto = "Atenção";
        }

        const div = document.createElement("div");

        div.classList.add("card-relatorio");

        div.innerHTML = `
            <h3>${item.alta}/${item.baixa} mmHg</h3>
            <p>${item.data}</p>
            <span style="color:${cor}; font-weight:bold;">
                ${texto}
            </span>
        `;

        lista.appendChild(div);
    });

}

// 🔥 FUNÇÃO LIMPAR HISTÓRICO
function limparHistorico() {
    if (confirm("Tem certeza que deseja apagar o histórico?")) {
        localStorage.removeItem("historico");
        location.reload();
    }
}