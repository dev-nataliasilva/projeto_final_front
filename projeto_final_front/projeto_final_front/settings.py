from pathlib import Path
from enum import Enum

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = 'django-insecure-(2qx6b(6#o=v8z7lid&is87_edlg_@y785qrti3*odr!+@l3%k'
DEBUG = True
ALLOWED_HOSTS = []

INSTALLED_APPS = [
    'django.contrib.staticfiles',
    'myapp',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'projeto_final_front.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
            ],
        },
    },
]

WSGI_APPLICATION = 'projeto_final_front.wsgi.application'

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = False
USE_TZ = False

STATIC_URL = 'myapp/static/'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

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

# Dicionário de cores para usar no template
COLOR_CATEGORIES = {color.value: color.name for color in Color}

