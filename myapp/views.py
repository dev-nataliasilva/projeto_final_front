# Importa a função 'render' do módulo 'django.shortcuts', que é usada para renderizar templates HTML.
# Importa a classe 'HttpResponse' para retornar uma resposta HTTP diretamente, se necessário (não usada neste arquivo).
# Importa o módulo 'settings' do Django para acessar as configurações do projeto, como 'COLOR_CATEGORIES'.
from django.shortcuts import render, HttpResponse
from django.conf import settings

# Função que renderiza a página inicial (home).
# A função 'home' recebe o parâmetro 'request', que contém informações sobre a requisição HTTP.
# O 'render' é utilizado para gerar a resposta e renderizar o template 'home.html'.
def home(request):
    return render(request, "home.html")

# Função que renderiza a página de introdução.
# A função 'introduction' também utiliza o 'render' para gerar a resposta da requisição, renderizando o template 'introduction.html'.
def introduction(request):
    return render(request, "introduction.html")

# Função que renderiza a página de etapas (steps).
# A função 'steps' passa um contexto extra para o template 'steps.html'.
# O contexto contém a configuração 'COLOR_CATEGORIES', que é acessada através de 'settings.COLOR_CATEGORIES'.
def steps(request):
    return render(request, 'steps.html', {
        'color_categories': settings.COLOR_CATEGORIES
    })

# Função que renderiza a página de resultados da pesquisa (result_search).
# Similar às outras funções, o 'render' é usado para gerar a resposta e renderizar o template 'result_search.html'.
def result_search(request):
    return render(request, "result_search.html")