## Módulo de Inteligência Artificial - Projeto _Onde Salvei?_
Este projeto tem como objetivo criar uma aplicação web que permite aos usuários buscar imagens baseado em cores e receber o endereço desses arquivos filtrados de acordo com a paleta de cores escolhida pelo usuário. Ele combina um backend em **Django**, uma IA para reconhecimento de cores e um desktop agent para localizar as imagens e calcular a média RGB.

### 📋 Estrutura do Projeto
#### **Módulo da Aplicação Web**
Desenvolvido com o framework **Django**, este módulo é responsável por renderizar as páginas HTML e servir os arquivos estáticos. O frontend apresenta uma interface responsiva e intuitiva, com seções dedicadas para busca de cores, navegação entre etapas e exibição dos resultados. Ele interage com a API para enviar requisições ao modelo de IA e processar os resultados do reconhecimento de cores.

#### **Módulo da Rede Neural Artificial**
A Inteligência Artificial foi desenvolvida com **TensorFlow** e **Python** para classificar cores com base em arrays RGB fornecidos como entrada. O sistema foi estruturado de forma modular, com:
- **Treinamento**: A pasta `train` contém os scripts e dados necessários para treinar o modelo.
- **Inferência**: A pasta `inference` é dedicada a processar as previsões do modelo treinado.

Essa organização facilita a manutenção e escalabilidade do sistema.  
[Repositório do módulo de IA](https://github.com/dev-nataliasilva/projeto_final_ia)

#### **Módulo da API REST**
Uma API REST foi construída usando o **Django REST Framework** para conectar o frontend ao modelo de IA. A API permite o envio de arrays RGB como JSON e retorna as classificações de cores. O backend serve tanto o frontend quanto a API, gerenciando a comunicação direta com o modelo de IA para entregar os resultados processados.  
[Repositório da API](https://github.com/dev-nataliasilva/projeto_final_api)

#### **Módulo do Agent Desktop**
O Agent Desktop é uma aplicação para desktops que permite aos usuários selecionar uma pasta com imagens. Ele calcula a média das cores (em formato RGB) de cada imagem e exibe essas informações. A aplicação inclui:
- Uma interface gráfica para facilitar a seleção de pastas.
- Um ícone no system tray para acesso rápido às funcionalidades.
  
[Repositório do Agent Desktop](https://github.com/dev-nataliasilva/projeto_final_agent)

### 🚀 Como Executar
- Requisitos:
    - Python 3.8+
- Pacotes listados no arquivo requirements.txt. Para instalá-los, execute:
```bash
pip install -r requirements.txt
```
#### Aplicação Web
Para iniciar o servidor:
```bash
python manage.py runserver
```

### 📝 Licença
Este projeto está sob a licença MIT. Sinta-se livre para utilizá-lo e modificá-lo conforme necessário.

### 🎓 Objetivo
Este código integra o ecossistema do produto _Onde Salvei?_, desenvolvido como parte do Projeto de Conclusão de Curso da graduação em Ciência da Computação.
