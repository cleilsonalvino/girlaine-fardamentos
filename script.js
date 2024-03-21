var valorTotalElement = document.getElementById("total"); // Elemento onde é exibido o valor total
var valorTotalAtual = 0; // Variável global para armazenar o valor total atualizado

// Função para converter um número em data formatada
function numeroParaData(numero) {
    const data = new Date(Number(numero)); // Converte o número para uma data
    const formatoData = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return data.toLocaleDateString('pt-BR', formatoData); // Formata a data como 'DD/MM/AAAA' e retorna
}

// Armazenar todos os elementos de entrada em um array
var valores = [
    document.getElementById("tm1"),
    document.getElementById("tm2"),
    document.getElementById("tm3"),
    document.getElementById("tm4"),
    document.getElementById("tm5"),
    document.getElementById("tm6"),
    document.getElementById("tm7"),
    document.getElementById("tm8"),
    document.getElementById("tm9"),
    document.getElementById("tm10"),
    document.getElementById("tm11"),
    document.getElementById("tm12"),
    document.getElementById("tm13"),
    document.getElementById("tm14")
];

// Adicionar um evento de input para cada elemento de tamanho
valores.forEach(function(elemento) {
    elemento.addEventListener("input", function() {
        // Calcular o total somando todos os valores
        var total = 0;
        valores.forEach(function(elemento) {
            total += parseInt(elemento.value) || 0;
        });
        // Atualizar o valor total atualizado
        valorTotalAtual = total;
        // Atualizar o elemento total com o novo valor total
        valorTotalElement.textContent = total;
    });
});

async function enviar() {

    const produto = document.getElementById("produto").value;
    const tipo = document.getElementById("tipo").value;
    const tecido = document.getElementById("tecido").value;
    const gola = document.getElementById("gola").value;
    const manga = document.getElementById("manga").value;
    const cliente = String(document.getElementById("cliente").value);
    const codigo = Number(document.getElementById("codigo").value);
    const diasParaEntrega = parseInt(document.getElementById("diasEntrega").value)


    // Criar objeto com os dados do pedido, incluindo o valor total atualizado
    var objeto = {
        Produto: produto,
        Tipo: tipo,
        Tecido: tecido,
        Gola: gola,
        Manga: manga,
        Cliente: cliente,
        Codigo: codigo,
        prazoDias: diasParaEntrega,
        Quantidade: valorTotalAtual,
    };

    // Faz a requisição para enviar o objeto para a planilha
    try {
        const response = await fetch("https://sheetdb.io/api/v1/6lcrabngw0txr", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(objeto),
        });

        // Verifica se a requisição foi bem-sucedida
        if (response.ok) {
            console.log("Objeto enviado com sucesso para a planilha.");
            // Faça o que desejar após o envio bem-sucedido
        } else {
            console.error(
                "Erro ao enviar objeto para a planilha:",
                response.statusText
            );
        }
    } catch (error) {
        console.error("Erro ao enviar objeto para a planilha:", error);
    }
}
