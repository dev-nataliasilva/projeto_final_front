document.getElementById("startApp").addEventListener("click", function() {
    fetch('http://localhost:5000/start_app', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log(data); // Mostra o que está sendo retornado pela API
        const resultsContainer = document.getElementById("results");
        resultsContainer.innerHTML = ''; // Limpa resultados anteriores

        // Verifica se data é um array
        if (Array.isArray(data)) {
            // Estruturar os dados para envio
            const payload = data.map(fileInfo => ({
                path: fileInfo.path, // Supondo que fileInfo.path existe
                average_rgb: fileInfo.average_rgb // Supondo que fileInfo.average_rgb existe
            }));

            // Exibir os arquivos e suas médias RGB
            payload.forEach(fileInfo => {
                const fileElement = document.createElement("div");
                fileElement.innerText = `Caminho: ${fileInfo.path}, Média RGB: ${fileInfo.average_rgb}`;
                resultsContainer.appendChild(fileElement);
            });

            // Enviar os dados para a API externa
            return fetch('http://localhost:8080/api/receive-colors/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload) // Envia o payload estruturado como JSON
            });
        } else {
            throw new Error('A resposta não é um array.');
        }
    })
    .then(postResponse => {
        if (!postResponse.ok) {
            throw new Error('Erro ao enviar os dados para a API externa');
        }
        return postResponse.json(); // Se necessário, você pode lidar com a resposta aqui
    })
    .then(postData => {
        console.log('Dados enviados com sucesso:', postData);
    })
    .catch(error => {
        console.error('Houve um problema com a requisição Fetch:', error);
    });
});
