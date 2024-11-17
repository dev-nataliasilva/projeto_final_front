document.querySelectorAll('.next-step').forEach(button => {
    button.addEventListener('click', function() {
        let currentStep = parseInt(this.dataset.step); // Passo atual
        let nextStep = currentStep + 1; // Próximo passo

        // Esconde a etapa atual e mostra a próxima
        document.getElementById('step-' + currentStep).style.display = 'none';

        // Se for o último passo, redireciona para a página result_search
        if (currentStep === 3) {
            // Obtém a URL da última etapa
            const url = this.getAttribute('data-url');
            window.location.href = url; // Redirecionamento para o resultado
        } else {
            // Caso contrário, continua o fluxo normal
            if (document.getElementById('step-' + nextStep)) {
                document.getElementById('step-' + nextStep).style.display = 'block';
            }

            // Atualiza a barra de progresso
            document.querySelector('.step-' + currentStep).classList.add('completed');
            if (document.querySelector('.step-' + nextStep)) {
                document.querySelector('.step-' + nextStep).classList.add('active');
            }
        }
    });
});

// Função para iniciar a aplicação e chamar o endpoint start_app
function StartAppRequest() {
    return fetch('http://localhost:5000/start_app', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json(); // Converte a resposta para JSON
    })
    .then(data => {
        console.log(data); // Exibe a resposta no console
        
        // Armazena os dados no localStorage
        localStorage.setItem('startAppData', JSON.stringify(data));

        // Habilitar o botão "Iniciar busca!" depois que a requisição for concluída
        const nextButton = document.querySelector('.next-step[data-step="3"]');
        nextButton.disabled = false; // Reabilita o botão
        nextButton.classList.remove('next-step-disabled'); // Remove a classe "next-step-disabled"
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}

// Adicionando o evento ao botão "Selecionar pasta"
document.getElementById("startAppButton").addEventListener("click", function() {
    StartAppRequest(); // Chama a função StartAppRequest ao clicar no botão
});

// Armazenando as categorias de cores selecionadas
document.querySelectorAll('.color-picker input[type="checkbox"]').forEach(input => {
    input.addEventListener('change', function() {
        // Recupera as cores selecionadas
        const selectedColors = Array.from(document.querySelectorAll('.color-picker input[type="checkbox"]:checked'))
            .map(checkbox => checkbox.value);
        
        // Armazena as cores selecionadas no localStorage
        localStorage.setItem('selectedColors', JSON.stringify(selectedColors));
    });
});
