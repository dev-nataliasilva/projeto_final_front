document.addEventListener("DOMContentLoaded", function () {
    const resultsContainer = document.getElementById("results");

    // Exibir o loader durante o processamento
    const loader = document.createElement("div");
    loader.innerText = "Carregando...";
    loader.style.fontSize = "1.5rem";
    loader.style.color = "blue"; // Estilizar o loader
    resultsContainer.innerHTML = ''; // Limpar qualquer conteúdo existente
    resultsContainer.appendChild(loader); // Adicionar o loader ao container

    // Recupera os dados do localStorage
    const startAppData = JSON.parse(localStorage.getItem('startAppData'));
    const selectedColors = JSON.parse(localStorage.getItem('selectedColors'));

    if (!startAppData) {
        resultsContainer.innerHTML = 'Nenhum dado encontrado. Volte à página anterior e inicie o processo.';
        return;
    }

    if (!selectedColors || selectedColors.length === 0) {
        resultsContainer.innerHTML = 'Nenhuma categoria de cor selecionada. Volte e selecione pelo menos uma cor.';
        return;
    }

    // Verifica se os dados são um array
    if (Array.isArray(startAppData)) {
        // Estruturar os dados para envio
        const payload = startAppData.map(fileInfo => ({
            path: fileInfo.path, // Supondo que fileInfo.path existe
            average_rgb: fileInfo.average_rgb // Supondo que fileInfo.average_rgb existe
        }));

        // Enviar os dados para a API externa
        fetch('http://localhost:8080/api/receive-colors/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                colors: payload,  // Envia os dados das cores
                categories: selectedColors  // Envia as categorias de cores
            })
        })
        .then(postResponse => {
            if (!postResponse.ok) {
                throw new Error('Erro ao enviar os dados para a API externa');
            }
            return postResponse.json(); // Recebe a resposta da API
        })
        .then(postData => {
            resultsContainer.innerHTML = ''; // Remove o loader

            // Exibir os resultados retornados pela API
            postData.forEach(fileInfo => {
                const fileElement = document.createElement("div");
                fileElement.innerText = `Caminho: ${fileInfo.path}, Média RGB: ${fileInfo.average_rgb}, Cor Prevista: ${fileInfo.predicted_color}`;
                resultsContainer.appendChild(fileElement);
            });
        })
        .catch(error => {
            console.error('Houve um problema com a requisição Fetch:', error);
            resultsContainer.innerHTML = 'Ocorreu um erro ao processar a solicitação.';
        });
    } else {
        resultsContainer.innerHTML = 'Os dados armazenados não estão no formato esperado.';
    }
});
