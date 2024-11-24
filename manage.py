#!/usr/bin/env python
"""Utilitário de linha de comando do Django para tarefas administrativas."""

import os  # Importa o módulo os para interagir com o sistema operacional
import sys  # Importa o módulo sys para manipulação de argumentos de linha de comando


def main():
    """Executa tarefas administrativas."""
    # Define a variável de ambiente DJANGO_SETTINGS_MODULE, que especifica o arquivo de configurações do Django
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'projeto_final_front.settings')
    
    try:
        # Tenta importar a função que executa os comandos de linha de comando do Django
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        # Caso o Django não esteja instalado ou algum erro ocorra na importação, levanta um erro
        raise ImportError(
            "Não foi possível importar o Django. Tem certeza que está instalado e "
            "disponível na variável de ambiente PYTHONPATH? Esqueceu de ativar um ambiente virtual?"
        ) from exc
    
    # Executa o comando passado na linha de comando (ex: python manage.py runserver)
    execute_from_command_line(sys.argv)


if __name__ == '__main__':
    # Chama a função main para executar o processo quando o script manage.py for executado
    main()