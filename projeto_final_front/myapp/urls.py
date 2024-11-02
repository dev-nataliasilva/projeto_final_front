from django.urls import path
from . import views

urlpatterns = [
    path("", views.home, name="home"),
    path("result_search", views.result_search, name="result_search")
]