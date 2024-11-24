// Espera o carregamento completo do DOM para garantir que todos os elementos estejam disponíveis
document.addEventListener("DOMContentLoaded", function () {
    // Referências aos elementos da página
    const resultsContainer = document.getElementById("results");
    const loader = document.getElementById("loader"); // Loader
    const resultsTitle = document.getElementById("results-title"); // Título "Resultados"
    const metadataTitle = document.getElementById("metadata-title"); // Título "Metadados"
    const metadataContainer = document.getElementById("metadata"); // Contêiner dos metadados

    const resultsTable = document.getElementById("results-table");
    const resultsBody = document.getElementById("results-body");

    // Inicialmente, esconde os títulos e mantém o loader visível
    resultsTitle.style.display = "none";
    metadataTitle.style.display = "none";
    metadataContainer.style.display = "none";
    loader.style.display = "block";

    // Obtém os dados armazenados no localStorage
    const startAppData = JSON.parse(localStorage.getItem('startAppData'));
    const selectedColors = JSON.parse(localStorage.getItem('selectedColors'));

    // Referências aos elementos de metadados
    const selectedColorsElement = document.getElementById("selectedColors");
    const totalImagesElement = document.getElementById("totalImages");
    const foundImagesElement = document.getElementById("foundImages");
    const colorCountsElement = document.getElementById("colorCounts");

    // Verifica se os dados necessários existem
    if (!startAppData) {
        resultsContainer.innerHTML = 'Nenhum dado encontrado. Volte à página anterior e inicie o processo.'; // Se não encontrar dados
        clearLocalStorage();  // Limpa o localStorage
        return;
    }

    if (!selectedColors || selectedColors.length === 0) {
        resultsContainer.innerHTML = 'Nenhuma categoria de cor selecionada. Volte e selecione pelo menos uma cor.'; // Se nenhuma cor for selecionada
        clearLocalStorage();  // Limpa o localStorage
        return;
    }

    // Verifica se os dados de startAppData estão no formato esperado
    if (Array.isArray(startAppData)) {
        const payload = startAppData.map(fileInfo => ({
            path: fileInfo.path,
            average_rgb: fileInfo.average_rgb
        }));

        // Envia os dados para a API externa
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
                throw new Error('Erro ao enviar os dados para a API externa');  // Trata erros na requisição
            }
            return postResponse.json();  // Retorna a resposta JSON
        })
        .then(postData => {
            // Oculta o loader após o processamento
            loader.style.display = "none";

            // Exibe o título e a tabela de resultados
            resultsTitle.style.display = "block";
            resultsTable.style.display = "table";  // Exibe a tabela com os resultados
            metadataTitle.style.display = "block";
            metadataContainer.style.display = "block";

            // Preenche a tabela com os resultados recebidos da API
            postData.forEach(fileInfo => {
                const row = document.createElement("tr");

                const pathCell = document.createElement("td");
                pathCell.textContent = fileInfo.path;
                row.appendChild(pathCell);

                const colorCell = document.createElement("td");
                colorCell.textContent = fileInfo.predicted_color;
                row.appendChild(colorCell);

                resultsBody.appendChild(row);  // Adiciona a linha à tabela
            });

            // Preenche os metadados com as informações recebidas
            selectedColorsElement.textContent = selectedColors.join(", ");  // Exibe as cores selecionadas
            totalImagesElement.textContent = startAppData.length;  // Exibe o número total de imagens
            foundImagesElement.textContent = postData.length;  // Exibe o número de imagens encontradas

            // Conta quantas vezes cada cor foi encontrada nas imagens
            const colorCounts = selectedColors.map(color => {
                const count = postData.filter(fileInfo => fileInfo.predicted_color === color).length;
                return `<li>${color}: ${count} imagem(ns)</li>`;  // Exibe a contagem de imagens por cor
            });
            colorCountsElement.innerHTML = colorCounts.join("");  // Preenche a lista com as contagens

            // Limpa o localStorage após exibir os dados
            clearLocalStorage();
        })
        .catch(error => {
            console.error('Houve um problema com a requisição Fetch:', error);  // Exibe erros no console
            resultsContainer.innerHTML = 'Ocorreu um erro ao processar a solicitação.';  // Mensagem de erro
            clearLocalStorage();  // Limpa o localStorage em caso de erro
        });
    } else {
        resultsContainer.innerHTML = 'Os dados armazenados não estão no formato esperado.';  // Exibe erro caso os dados não estejam no formato correto
        clearLocalStorage();  // Limpa o localStorage
    }
});