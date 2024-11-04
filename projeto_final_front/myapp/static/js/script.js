document.getElementById("startApp").addEventListener("click", function() {
    // Faz uma requisição GET para iniciar o app
    fetch('http://localhost:5000/start_app', {
        method: 'GET', // Método GET
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json(); // Se espera um JSON de volta
    })
    .then(data => {
        console.log(data); // Lida com os dados recebidos do Flask
    })
    .catch(error => {
        console.error('Houve um problema com a requisição Fetch:', error);
    });
});
