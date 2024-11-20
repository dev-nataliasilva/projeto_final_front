document.addEventListener("DOMContentLoaded", function () {
    clearLocalStorage(); // Limpa o localStorage toda vez que a página for carregada
    toggleNextButton(); // Verifica se algum checkbox está marcado ao carregar a página
});

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

// Adicionando o evento aos checkboxes para monitorar as seleções
document.querySelectorAll('.color-picker input[type="checkbox"]').forEach(input => {
    input.addEventListener('change', toggleNextButton); // Chama a função para verificar o estado do botão
});

// Adicionando o evento ao botão "Selecionar pasta"
document.getElementById("startAppButton").addEventListener("click", function() {
    StartAppRequest(); // Chama a função StartAppRequest ao clicar no botão
});

// Função para controlar o estado do botão "Próximo" na primeira etapa com base nas cores selecionadas
function toggleNextButton() {
    const selectedColors = Array.from(document.querySelectorAll('.color-picker input[type="checkbox"]:checked'))
        .map(input => input.value); // Obtém os valores das cores selecionadas
    
    const nextButton = document.querySelector('.next-step[data-step="1"]'); // Botão da primeira etapa

    if (selectedColors.length > 0) {
        nextButton.disabled = false; // Habilita o botão
        nextButton.classList.remove('next-step-disabled'); // Remove a classe "next-step-disabled"

        // Armazena as cores selecionadas no localStorage
        localStorage.setItem('selectedColors', JSON.stringify(selectedColors));
    } else {
        nextButton.disabled = true; // Desabilita o botão
        nextButton.classList.add('next-step-disabled'); // Adiciona a classe "next-step-disabled"

        // Remove as cores selecionadas do localStorage
        localStorage.removeItem('selectedColors');
    }
}

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