const lista = document.getElementById("lista-historico");

let historico = JSON.parse(localStorage.getItem("historico")) || [];

const totalMedicoes =
    document.getElementById("total-medicoes");

const mediaAlta =
    document.getElementById("media-alta");

const mediaBaixa =
    document.getElementById("media-baixa");

const ultimaMedicao =
    document.getElementById("ultima-medicao");

if (historico.length > 0) {

    const somaAlta =
        historico.reduce(
            (total, item) =>
                total + parseInt(item.alta),
            0
        );

    const somaBaixa =
        historico.reduce(
            (total, item) =>
                total + parseInt(item.baixa),
            0
        );

    const mediaAltaValor =
        (somaAlta / historico.length).toFixed(0);

    const mediaBaixaValor =
        (somaBaixa / historico.length).toFixed(0);

    const ultima =
        historico[historico.length - 1];

    totalMedicoes.innerHTML =
        `Total de medições: ${historico.length}`;

    mediaAlta.innerHTML =
        `Média sistólica: ${mediaAltaValor} mmHg`;

    mediaBaixa.innerHTML =
        `Média diastólica: ${mediaBaixaValor} mmHg`;

    ultimaMedicao.innerHTML =
        `Última medição: ${ultima.alta}/${ultima.baixa}`;
}

historico.reverse();

if (historico.length === 0) {

    lista.innerHTML = "<p>Nenhuma medição encontrada.</p>";

} else {

    historico.forEach(item => {

        const alta = parseInt(item.alta);
        const baixa = parseInt(item.baixa);

        let cor = "green";
        let texto = "Normal";

        if (alta < 90 || baixa < 60) {

            cor = "#2563eb";
            texto = "Baixa";

        }
        else if (alta >= 140 || baixa >= 90) {

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

//FUNÇÃO LIMPAR HISTÓRICO
function limparHistorico() {

    if (confirm("Tem certeza que deseja apagar o histórico?")) {

        localStorage.removeItem("historico");
        location.reload();

    }

}