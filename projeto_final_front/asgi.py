"""
Configuração ASGI para o projeto "projeto_final_front".

Este arquivo expõe a função "application" como uma variável de nível de módulo, 
que é o ponto de entrada para servidores ASGI.

Para mais informações sobre este arquivo, veja:
https://docs.djangoproject.com/en/5.1/howto/deployment/asgi/
"""

# Importa o módulo 'os' para poder interagir com variáveis de ambiente do sistema operacional.
import os

# Importa a função 'get_asgi_application' do Django, que cria o objeto ASGI necessário para o servidor.
from django.core.asgi import get_asgi_application

# Define a variável de ambiente 'DJANGO_SETTINGS_MODULE' com o caminho para o arquivo de configurações do Django.
# Isso indica ao Django qual módulo de configurações ele deve usar. No caso, está usando 'projeto_final_front.settings'.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'projeto_final_front.settings')

# A função 'get_asgi_application' cria o objeto 'application' necessário para um servidor ASGI.
# Este objeto será usado para processar as requisições assíncronas no servidor.
application = get_asgi_application()