document.getElementById('directoryInput').addEventListener('change', async function(event) {
  const files = event.target.files;
  const colorThief = new ColorThief();
  const colorResults = [];

  for (const file of files) {
    // Filtrar apenas arquivos de imagem
    if (!file.type.startsWith("image/")) continue;

    // Ler o arquivo como Data URL usando FileReader
    const fileReader = new FileReader();

    fileReader.onload = async function(event) {
      const img = document.createElement('img');
      img.src = event.target.result;

      // Processar a imagem para extrair a cor predominante
      img.onload = () => {
        const dominantColor = colorThief.getColor(img);
        colorResults.push({ fileName: file.name, color: dominantColor });

        // Exibir os resultados no console
        console.log(`Imagem: ${file.name} - Cor Predominante: ${dominantColor}`);
      };
    };

    // Ler a imagem como Data URL
    fileReader.readAsDataURL(file);
  }
})