async function enviar() {
  const produto = document.getElementById("produto").value;
  const tipo = document.getElementById("tipo").value;
  const tecido = document.getElementById("tecido").value;
  const gola = document.getElementById("gola").value;
  const manga = document.getElementById("manga").value;
  const cliente = document.getElementById("cliente").value;
  const codigo = document.getElementById("codigo").value;





  var objeto = {
    produto: produto,
    tipo: tipo,
    tecido: tecido,
    gola: gola,
    manga: manga,
    cliente: cliente,
    codigo: codigo
  };

  // Faz a requisição para enviar o objeto para a planilha
  try {
    const response = await fetch("https://sheetdb.io/api/v1/tlid7sxr7elr2", {
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
