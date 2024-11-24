"""
Configuração de URL para o projeto projeto_final_front.

A lista `urlpatterns` roteia URLs para as views. Para mais informações, consulte:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/

Exemplos de views:
    Views baseadas em funções:
    1. Adicione um import:  from my_app import views
    2. Adicione uma URL a `urlpatterns`:  path('', views.home, name='home')

    Views baseadas em classes:
    1. Adicione um import:  from other_app.views import Home
    2. Adicione uma URL a `urlpatterns`:  path('', Home.as_view(), name='home')

    Incluindo outras configurações de URL:
    1. Importe a função `include()`: from django.urls import include, path
    2. Adicione uma URL a `urlpatterns`:  path('blog/', include('blog.urls'))
"""

from django.urls import path, include  # Importação das funções para manipulação de URLs

# A lista `urlpatterns` é responsável por rotear as URLs para as views correspondentes
urlpatterns = [
    # Aqui, estamos incluindo as URLs da aplicação 'myapp'
    path("", include("myapp.urls"))  # Inclui as URLs definidas no arquivo `myapp/urls.py`
]