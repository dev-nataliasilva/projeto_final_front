"""
Configuração WSGI para o projeto projeto_final_front.

Este arquivo expõe o callable WSGI como uma variável de nível de módulo chamada ``application``.

Para mais informações sobre este arquivo, consulte:
https://docs.djangoproject.com/en/5.1/howto/deployment/wsgi/
"""

import os  # Importa o módulo os para manipulação do sistema operacional

from django.core.wsgi import get_wsgi_application  # Importa a função para obter o callable WSGI

# Define a variável de ambiente DJANGO_SETTINGS_MODULE com o caminho do arquivo de configurações
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'projeto_final_front.settings')

# Chama a função get_wsgi_application() para obter a aplicação WSGI
application = get_wsgi_application()  # Este é o callable WSGI que será usado pelo servidor