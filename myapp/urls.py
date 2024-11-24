# Importa a função 'path' do módulo 'django.urls' para definir as rotas URL da aplicação.
# Importa a variável 'views', que contém as funções que são chamadas quando as URLs são acessadas.
from django.urls import path
from . import views

# Define a lista de rotas URL para a aplicação. Cada rota é associada a uma função em 'views'.
urlpatterns = [
    # Rota para a página inicial (home). Quando a URL raiz ("/") for acessada, a função 'home' será chamada.
    path("", views.home, name="home"),

    # Rota para a página 'introduction'. Quando a URL "/introduction" for acessada, a função 'introduction' será chamada.
    path("introduction", views.introduction, name="introduction"),

    # Rota para a página 'steps'. Quando a URL "/steps" for acessada, a função 'steps' será chamada.
    path("steps", views.steps, name="steps"),

    # Rota para a página de resultados da pesquisa. Quando a URL "/result_search" for acessada, a função 'result_search' será chamada.
    path("result_search", views.result_search, name="result_search")
]