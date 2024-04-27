document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.add-transaction form');
    const transactionsList = document.querySelector('.transaction-list .transactions');
    const clearDataBtn = document.getElementById('clear-data');
    const generateReportBtn = document.getElementById('generate-report');
    const reportContainer = document.querySelector('.report');

    let totalEntradas = 0;
    let totalSaidas = 0;
    let saldo = 0;

    function addTransaction(descricao, valor, tipo, data) {
        const transaction = document.createElement('div');
        transaction.classList.add('transaction');
        transaction.innerHTML = `
            <p>${descricao}</p>
            <p>${tipo === 'entrada' ? '+' : '-'} R$ ${valor}</p>
            <p>${data}</p>
        `;
        transactionsList.appendChild(transaction);

        if (tipo === 'entrada') {
            totalEntradas += valor;
        } else {
            totalSaidas += valor;
        }
        saldo = totalEntradas - totalSaidas;
    }

    function clearTransactions() {
        transactionsList.innerHTML = '';
        totalEntradas = 0;
        totalSaidas = 0;
        saldo = 0;
        generateReport();
    }

    function generateReport() {
        reportContainer.innerHTML = `
            <h2>Relatório Financeiro</h2>
            <p>Total de Entradas: R$ ${totalEntradas.toFixed(2)}</p>
            <p>Total de Saídas: R$ ${totalSaidas.toFixed(2)}</p>
            <p>Saldo Atual: R$ ${saldo.toFixed(2)}</p>
        `;
    }

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const descricao = form.descricao.value.trim();
        const valor = parseFloat(form.valor.value);
        const tipo = form.tipo.value;
        const data = form.data.value;

        if (descricao && !isNaN(valor) && data) {
            addTransaction(descricao, valor, tipo, data);
            form.reset();
            generateReport();
        } else {
            alert('Por favor, preencha todos os campos corretamente.');
        }
    });

    clearDataBtn.addEventListener('click', function () {
        const clear = confirm('Tem certeza que deseja limpar os dados?');
        if (clear) {
            clearTransactions();
        }
    });

    generateReportBtn.addEventListener('click', function () {
        generateReport();
    });
});
