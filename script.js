var valorTotalElement = document.getElementById("total"); // Elemento onde é exibido o valor total
var valorTotalAtual = 0; // Variável global para armazenar o valor total atualizado

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

    // Função para calcular datas de início e entrega
    function calcularDatasEntrega(prazoDias) {
        var dataAtual = new Date();
        var dataInicio = new Date(dataAtual.getTime());
        var dataEntrega = new Date(dataAtual.getTime() + (prazoDias * 24 * 60 * 60 * 1000));

        // Formatar as datas para DD/MM/AAAA
        var dataInicioFormatada = dataInicio.toLocaleDateString('pt-BR');
        var dataEntregaFormatada = dataEntrega.toLocaleDateString('pt-BR');
        
        return {
            dataInicio: dataInicioFormatada,
            dataEntrega: dataEntregaFormatada
        };
    }

    const datasEntrega = calcularDatasEntrega(diasParaEntrega);
    const dataInicio = datasEntrega.dataInicio;
    const dataEntrega = datasEntrega.dataEntrega;

    // Criar objeto com os dados do pedido, incluindo o valor total atualizado
    var objeto = {
        Produto: produto,
        Tipo: tipo,
        Tecido: tecido,
        Gola: gola,
        Manga: manga,
        Cliente: cliente,
        Codigo: codigo,
        Data_entrada: dataInicio,
        Data_saida: dataEntrega,
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


     // Obter o último código de pedido adicionado à planilha
     let ultimoCodigo = 0;
     try {
         const response = await fetch("https://sheetdb.io/api/v1/6lcrabngw0txr");
         const data = await response.json();
         if (data && data.length > 0) {
             ultimoCodigo = data[data.length - 1].Codigo;
         }
     } catch (error) {
         console.error("Erro ao obter o último código de pedido:", error);
     }
 
     // Incrementar o último código para obter o próximo código
     const proximoCodigo = ultimoCodigo + 1;
 
     // Restante do seu código para coletar outros dados do formulário e enviar para o SheetDB
     // ...
 
     // Criar objeto com os dados do pedido, incluindo o próximo código de pedido
     var objeto = {
         // Outros campos do pedido...
         Codigo: proximoCodigo,
         // ...
     };
 
     // Fazer a requisição para enviar o objeto para a planilha
     // ...
}
