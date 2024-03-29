const valorTotalElement = document.getElementById("total");

document.addEventListener("DOMContentLoaded", function () {
  var valores = [];

  // Selecionar os elementos de entrada após o DOM ter sido carregado
  for (var i = 1; i <= 14; i++) {
    var input = document.getElementById("tm" + i);
    if (input) {
      valores.push(input);
    }
  }

  // Adicionar evento de input para cada elemento de tamanho
  valores.forEach(function (elemento) {
    elemento.addEventListener("input", function () {
      var total = 0;
      valores.forEach(function (elemento) {
        total += parseInt(elemento.value, 10) || 0;
      });
      // Atualizar o elemento "total" com o novo total
      valorTotalElement.textContent = total;
    });
  });
});

async function enviar() {
  const produto = document.getElementById("produto").value;
  const tipo = document.getElementById("tipo").value;
  const tecido = document.getElementById("tecido").value;
  const gola = document.getElementById("gola").value;
  const manga = document.getElementById("manga").value;
  const cliente = String(document.getElementById("cliente").value);
  const diasParaEntrega = parseInt(
    document.getElementById("diasEntrega").value
  );
  const valorUnidade = parseFloat(
    document.getElementById("valorUnitario").value
  );

  // Função para calcular datas de início e entrega
  function calcularDatasEntrega(prazoDias) {
    var dataAtual = new Date();
    var dataInicio = new Date(dataAtual.getTime());
    var dataEntrega = new Date(
      dataAtual.getTime() + prazoDias * 24 * 60 * 60 * 1000
    );

    // Formatar as datas para DD/MM/AAAA
    var dataInicioFormatada = dataInicio.toLocaleDateString("pt-BR");
    var dataEntregaFormatada = dataEntrega.toLocaleDateString("pt-BR");

    return {
      dataInicio: dataInicioFormatada,
      dataEntrega: dataEntregaFormatada,
    };
  }

  const datasEntrega = calcularDatasEntrega(diasParaEntrega);
  const dataInicio = datasEntrega.dataInicio;
  const dataEntrega = datasEntrega.dataEntrega;

  const proximoNumero = await obterProximoNumero();

  // Obter o valor atualizado do elemento HTML com o id "total"
  const quantidade = parseInt(valorTotalElement.textContent, 10);

  // Criar objeto com os dados do pedido, incluindo o valor total atualizado
  const objeto = {
    Produto: produto,
    Tipo: tipo,
    Tecido: tecido,
    Gola: gola,
    Manga: manga,
    Cliente: cliente,
    Data_entrada: dataInicio,
    Data_saida: dataEntrega,
    Quantidade: quantidade,
    Codigo: proximoNumero,
    Valor_unidade: valorUnidade,
    Total: quantidade * valorUnidade,
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

async function obterProximoNumero() {
  try {
    const response = await fetch("https://sheetdb.io/api/v1/6lcrabngw0txr");
    const data = await response.json();

    // Verifica se há algum dado na planilha
    if (data.length === 0) {
      // Se não houver dados, retorna 1 como o próximo número disponível
      return 1;
    } else {
      // Encontrar o maior número atual
      let maiorNumero = 0;
      data.forEach((pedido) => {
        const numero = parseInt(pedido.Codigo);
        if (!isNaN(numero) && numero > maiorNumero) {
          maiorNumero = numero;
        }
      });

      // Incrementar o maior número encontrado em 1
      return maiorNumero + 1;
    }
  } catch (error) {
    console.error("Erro ao obter próximo número:", error);
    return 1; // Se ocorrer algum erro, começar do número 1
  }
}
