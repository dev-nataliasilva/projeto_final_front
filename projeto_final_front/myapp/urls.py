from django.urls import path
from . import views

urlpatterns = [
    path("", views.home, name="home"),
    path("introduction", views.introduction, name="introduction"),
    path("steps", views.steps, name="steps"),
    path("result_search", views.result_search, name="result_search")
]