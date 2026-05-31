const lista = document.getElementById("lista-historico");

let historico = JSON.parse(localStorage.getItem("historico")) || [];

historico.reverse().forEach(item => {

    const div = document.createElement("div");

    div.innerHTML = `
        <p><strong>${item.alta}/${item.baixa} mmHg</strong></p>
        <small>${item.data}</small>
        <hr>
    `;

    lista.appendChild(div);
});