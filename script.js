


async function enviar() {

  const produto = document.getElementById("produto").value;
  const tipo = document.getElementById("tipo").value;
  const tecido = document.getElementById("tecido").value;
  const gola = document.getElementById("gola").value;
  const manga = document.getElementById("manga").value;
  const cliente = String(document.getElementById("cliente").value);
  const codigo = Number(document.getElementById("codigo").value);
  const diasParaEntrega = parseInt(document.getElementById("diasEntrega").value, 10);

   // Obter a data atual
   const dataAtual = new Date();

   // Calcular a data de entrega
   const dataEntrega = new Date(dataAtual);
   dataEntrega.setDate(dataEntrega.getDate() + diasParaEntrega);
 
   // Formatar as datas para exibição
   const formatoData = { year: 'numeric', month: 'numeric', day: 'numeric' };
   const dataEmissaoFormatada = dataAtual.toLocaleDateString('pt-BR', formatoData);
   const dataEntregaFormatada = dataEntrega.toLocaleDateString('pt-BR', formatoData);

  var objeto = {
    Produto: produto,
    Tipo: tipo,
    Tecido: tecido,
    Gola: gola,
    Manga: manga,
    Cliente: cliente,
    Codigo: codigo,
    Data_entrada: dataEmissaoFormatada,
    Data_saida: dataEntregaFormatada,
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
