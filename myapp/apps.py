# Importa a classe AppConfig do módulo django.apps, que é utilizada para configurar a aplicação.
from django.apps import AppConfig

# Define a configuração da aplicação chamada 'Myapp'
class MyappConfig(AppConfig):
    # O campo 'default_auto_field' define o tipo de campo utilizado para chaves primárias automaticamente geradas nas tabelas do banco de dados.
    default_auto_field = 'django.db.models.BigAutoField'
    
    # O nome da aplicação no Django. Esse valor deve ser o nome do diretório da aplicação ou o caminho para a aplicação dentro do projeto.
    name = 'myapp'