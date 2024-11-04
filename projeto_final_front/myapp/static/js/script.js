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
        console.log(data.files); // Agora data.files é um array de objetos
        const resultsContainer = document.getElementById("results");
        resultsContainer.innerHTML = ''; // Limpa resultados anteriores

        // Exibir os arquivos e suas médias RGB
        data.files.forEach(fileInfo => {
            const fileElement = document.createElement("div");
            fileElement.innerText = `Caminho: ${fileInfo.path}, Média RGB: ${fileInfo.average_rgb}`;
            resultsContainer.appendChild(fileElement);
        });
    })
    .catch(error => {
        console.error('Houve um problema com a requisição Fetch:', error);
    });
});
