document.querySelectorAll('.next-step').forEach(button => {
    button.addEventListener('click', function() {
        let currentStep = parseInt(this.dataset.step);
        let nextStep = currentStep + 1;

        // Esconde a etapa atual e mostra a próxima
        document.getElementById('step-' + currentStep).style.display = 'none';
        document.getElementById('step-' + nextStep).style.display = 'block';

        // Atualiza a barra de progresso
        document.querySelector('.step-' + currentStep).classList.add('completed');
        document.querySelector('.step-' + nextStep).classList.add('active');
    });
});
