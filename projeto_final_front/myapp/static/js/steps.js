document.querySelectorAll('.next-step').forEach(button => {
    console.log("ACIONOU!");
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
