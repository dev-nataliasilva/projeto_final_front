document.addEventListener("DOMContentLoaded", function () {
    const resultsContainer = document.getElementById("results");
    const loader = document.getElementById("loader"); // Loader
    const resultsTitle = document.getElementById("results-title"); // Título "Resultados"
    const metadataTitle = document.getElementById("metadata-title"); // Título "Metadados"
    const metadataContainer = document.getElementById("metadata"); // Contêiner dos metadados

    // Inicialmente, esconde os títulos e mantém o loader visível
    resultsTitle.style.display = "none";
    metadataTitle.style.display = "none";
    metadataContainer.style.display = "none";
    loader.style.display = "block";

    const startAppData = JSON.parse(localStorage.getItem('startAppData'));
    const selectedColors = JSON.parse(localStorage.getItem('selectedColors'));

    const selectedColorsElement = document.getElementById("selectedColors");
    const totalImagesElement = document.getElementById("totalImages");
    const foundImagesElement = document.getElementById("foundImages");
    const colorCountsElement = document.getElementById("colorCounts");

    if (!startAppData) {
        resultsContainer.innerHTML = 'Nenhum dado encontrado. Volte à página anterior e inicie o processo.';
        clearLocalStorage();
        return;
    }

    if (!selectedColors || selectedColors.length === 0) {
        resultsContainer.innerHTML = 'Nenhuma categoria de cor selecionada. Volte e selecione pelo menos uma cor.';
        clearLocalStorage();
        return;
    }

    if (Array.isArray(startAppData)) {
        const payload = startAppData.map(fileInfo => ({
            path: fileInfo.path,
            average_rgb: fileInfo.average_rgb
        }));

        fetch('https://ondesalvei-api-3e0bb38ffd71.herokuapp.com/api/receive-colors/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                colors: payload,
                categories: selectedColors
            })
        })
        .then(postResponse => {
            if (!postResponse.ok) {
                throw new Error('Erro ao enviar os dados para a API externa');
            }
            return postResponse.json();
        })
        .then(postData => {
            // Oculta o loader
            loader.style.display = "none";

            // Exibir o título e os resultados
            resultsTitle.style.display = "block";
            metadataTitle.style.display = "block";
            metadataContainer.style.display = "block";

            // Preencher os resultados detalhados
            postData.forEach(fileInfo => {
                const fileElement = document.createElement("div");
                fileElement.innerText = `Caminho: ${fileInfo.path}, Média RGB: ${fileInfo.average_rgb}, Cor Prevista: ${fileInfo.predicted_color}`;
                resultsContainer.appendChild(fileElement);
            });

            // Preencher os metadados
            selectedColorsElement.textContent = selectedColors.join(", ");
            totalImagesElement.textContent = startAppData.length;
            foundImagesElement.textContent = postData.length;

            const colorCounts = selectedColors.map(color => {
                const count = postData.filter(fileInfo => fileInfo.predicted_color === color).length;
                return `<li>${color}: ${count} imagem(ns)</li>`;
            });
            colorCountsElement.innerHTML = colorCounts.join("");

            // Limpa o localStorage após exibir os dados
            clearLocalStorage();
        })
        .catch(error => {
            console.error('Houve um problema com a requisição Fetch:', error);
            resultsContainer.innerHTML = 'Ocorreu um erro ao processar a solicitação.';
            clearLocalStorage();
        });
    } else {
        resultsContainer.innerHTML = 'Os dados armazenados não estão no formato esperado.';
        clearLocalStorage();
    }
});