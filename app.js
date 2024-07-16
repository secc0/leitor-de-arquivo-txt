const fs = require("fs");
const path = require("path");

const pastaArquivos = path.join(__dirname, "files_pdf");
let contagemSucesso = 0;
const erros = [];

fs.readdir(pastaArquivos, (err, files) => {
  if (err) {
    console.error("Erro ao ler o diretório:", err);
    return;
  }

  files.forEach((file) => {
    const filePath = path.join(pastaArquivos, file);

    // Leitura síncrona para exemplo simples
    try {
      const data = fs.readFileSync(filePath);

      // Verifica se o conteúdo do arquivo contém '000'
      const content = data.toString();
      if (content.includes("000")) {
        contagemSucesso++;
      } else {
        erros.push({
          arquivo: file,
          codigoErro: content.trim(),
        });
      }
    } catch (err) {
      console.error(`Erro ao ler o arquivo ${file}:`, err);
    }
  });

  // Mostra os resultados
  console.log(`Quantidade de arquivos com sucesso: ${contagemSucesso}`);
  if (erros.length > 0) {
    console.log("_______________");
    console.log("_______________");
    erros.forEach((erro) => {
      console.log(`${erro.arquivo}: Error: ${erro.codigoErro}`);
    });
  }
});
