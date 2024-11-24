from pathlib import Path
from enum import Enum
import os

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = 'django-insecure-(2qx6b(6#o=v8z7lid&is87_edlg_@y785qrti3*odr!+@l3%k'
DEBUG = False
ALLOWED_HOSTS = [
    'ondesalvei-afacdb17af64.herokuapp.com',  # Front (própria aplicação) 
    # 'localhost',  
    # '127.0.0.1',  
]

INSTALLED_APPS = [
    'django.contrib.staticfiles',
    'myapp',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
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

# Configuração de arquivos estáticos
STATIC_URL = '/static/'
STATICFILES_DIRS = [
    BASE_DIR / "myapp/static",
]
STATIC_ROOT = BASE_DIR / "myapp/staticfiles"

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

# Simplified static file serving.
# https://warehouse.python.org/project/whitenoise/
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'
