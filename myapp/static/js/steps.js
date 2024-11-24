// Espera o carregamento completo do DOM para garantir que todos os elementos estejam disponíveis
document.addEventListener("DOMContentLoaded", function () {
    clearLocalStorage(); // Limpa o localStorage toda vez que a página for carregada
    toggleNextButton(); // Verifica se algum checkbox está marcado ao carregar a página
});

// Adiciona eventos aos botões "Próximo" para controlar o fluxo entre etapas
document.querySelectorAll('.next-step').forEach(button => {
    button.addEventListener('click', function() {
        let currentStep = parseInt(this.dataset.step); // Obtém o número da etapa atual
        let nextStep = currentStep + 1; // Define o número da próxima etapa

        // Esconde a etapa atual e mostra a próxima
        document.getElementById('step-' + currentStep).style.display = 'none';

        // Se for o último passo, redireciona para a página de resultados
        if (currentStep === 3) {
            const url = this.getAttribute('data-url'); // Obtém a URL para a próxima página
            window.location.href = url; // Redireciona para a página de resultados
        } else {
            // Caso contrário, continua o fluxo normal
            if (document.getElementById('step-' + nextStep)) {
                document.getElementById('step-' + nextStep).style.display = 'block'; // Exibe a próxima etapa
            }

            // Atualiza a barra de progresso
            document.querySelector('.step-' + currentStep).classList.add('completed');
            if (document.querySelector('.step-' + nextStep)) {
                document.querySelector('.step-' + nextStep).classList.add('active');
            }
        }
    });
});

// Adiciona eventos aos checkboxes para monitorar as seleções e atualizar o estado do botão
document.querySelectorAll('.color-picker input[type="checkbox"]').forEach(input => {
    input.addEventListener('change', toggleNextButton); // Chama a função para verificar o estado do botão "Próximo"
});

// Adiciona evento ao botão "Selecionar pasta" para iniciar a requisição ao servidor
document.getElementById("startAppButton").addEventListener("click", function() {
    StartAppRequest(); // Chama a função para enviar a requisição ao servidor
});

// Função que controla o estado do botão "Próximo" na primeira etapa com base nas cores selecionadas
function toggleNextButton() {
    const selectedColors = Array.from(document.querySelectorAll('.color-picker input[type="checkbox"]:checked'))
        .map(input => input.value); // Obtém os valores das cores selecionadas
    
    const nextButton = document.querySelector('.next-step[data-step="1"]'); // Botão da primeira etapa

    if (selectedColors.length > 0) {
        nextButton.disabled = false; // Habilita o botão "Próximo"
        nextButton.classList.remove('next-step-disabled'); // Remove a classe "next-step-disabled"

        // Armazena as cores selecionadas no localStorage
        localStorage.setItem('selectedColors', JSON.stringify(selectedColors));
    } else {
        nextButton.disabled = true; // Desabilita o botão "Próximo"
        nextButton.classList.add('next-step-disabled'); // Adiciona a classe "next-step-disabled"

        // Remove as cores selecionadas do localStorage
        localStorage.removeItem('selectedColors');
    }
}

// Função que faz a requisição para iniciar a aplicação e chamar o endpoint "start_app"
function StartAppRequest() {
    return fetch('http://localhost:5000/start_app', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok'); // Caso haja erro na requisição
        }
        return response.json(); // Converte a resposta para JSON
    })
    .then(data => {
        // Armazena os dados recebidos no localStorage
        localStorage.setItem('startAppData', JSON.stringify(data));

        // Habilita o botão "Iniciar busca!" depois que a requisição for concluída
        const nextButton = document.querySelector('.next-step[data-step="3"]');
        nextButton.disabled = false; // Reabilita o botão
        nextButton.classList.remove('next-step-disabled'); // Remove a classe "next-step-disabled"
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error); // Captura erros
    });
}