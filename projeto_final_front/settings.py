# Importações necessárias
from pathlib import Path  # Para trabalhar com caminhos de arquivos de maneira mais fácil e segura
from enum import Enum  # Para criar um tipo enumerado de cores
import os  # Para manipulação de variáveis de ambiente

# Diretório base do projeto
BASE_DIR = Path(__file__).resolve().parent.parent

# Chave secreta usada para segurança no Django (mantenha-a segura em produção)
SECRET_KEY = 'django-insecure-(2qx6b(6#o=v8z7lid&is87_edlg_@y785qrti3*odr!+@l3%k'

# Configuração de depuração - deve ser False em produção
DEBUG = True

# Hosts permitidos para a aplicação. O Django só irá aceitar requisições de hosts listados aqui.
ALLOWED_HOSTS = [
    'localhost',  # Para desenvolvimento local
    '127.0.0.1',  # Para desenvolvimento local
    'https://ondesalvei-api-3e0bb38ffd71.herokuapp.com/,'  # Endereço da API no Heroku  
    'https://ondesalvei-afacdb17af64.herokuapp.com/',  # Host do frontend no Heroku
    'https://ondesalvei-ia-f31a49c64a2d.herokuapp.com/',  # Host da IA no Heroku
]

# Aplicações instaladas no Django
INSTALLED_APPS = [
    'django.contrib.staticfiles',  # Responsável por servir arquivos estáticos
    'myapp',  # A aplicação criada no projeto
]

# Middleware para segurança e controle de requisições
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',  # Middleware de segurança
    'whitenoise.middleware.WhiteNoiseMiddleware',  # Middleware para servir arquivos estáticos de forma otimizada
    'django.middleware.common.CommonMiddleware',  
    'django.middleware.clickjacking.XFrameOptionsMiddleware',  # Previne ataques de clickjacking
]

# URL root do projeto, que define onde o Django procurará pelas URLs
ROOT_URLCONF = 'projeto_final_front.urls'

# Configuração dos templates - Onde e como os templates HTML serão carregados
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',  # Usando o motor de templates do Django
        'DIRS': [],  # Diretórios adicionais para procurar templates (vazio aqui)
        'APP_DIRS': True,  # Permite procurar templates dentro de diretórios de aplicativos
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
            ],
        },
    },
]

# Definindo a aplicação WSGI para o Django
WSGI_APPLICATION = 'projeto_final_front.wsgi.application'

# Configurações de idioma e fuso horário
LANGUAGE_CODE = 'en-us'  # Configuração do idioma (Inglês dos EUA)
TIME_ZONE = 'UTC'  # Configuração do fuso horário (UTC)
USE_I18N = False  # Desativa a internacionalização
USE_TZ = False  # Desativa o uso de fuso horário

# Configuração para arquivos estáticos (CSS, JavaScript, imagens)
STATIC_URL = '/static/'  # URL base para arquivos estáticos
STATICFILES_DIRS = [
    BASE_DIR / "myapp/static",  # Diretório de arquivos estáticos dentro da aplicação
]
STATIC_ROOT = BASE_DIR / "myapp/staticfiles"  # Diretório onde os arquivos estáticos serão coletados

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'  # Define o tipo padrão de campo auto-incremento para os modelos

# Definindo um Enum para as cores
class Color(Enum):
    Branco = 'Branco'
    Preto = 'Preto'
    Azul = 'Azul'
    Vermelho = 'Vermelho'
    Verde = 'Verde'
    Laranja = 'Laranja'
    Amarelo = 'Amarelo'
    Roxo = 'Roxo'
    Marrom = 'Marrom'

# Criando um dicionário de categorias de cores com base na Enum
COLOR_CATEGORIES = {color.value: color.name for color in Color}

# Configuração para servir arquivos estáticos de forma otimizada em produção
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'