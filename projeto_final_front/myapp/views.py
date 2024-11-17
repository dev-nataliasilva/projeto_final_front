from django.shortcuts import render, HttpResponse
from django.conf import settings 

# Create your views here.
def home(request):
    return render(request, "home.html")

def introduction(request):
    return render(request, "introduction.html")

def steps(request):
    return render(request, 'steps.html', {
        'color_categories': settings.COLOR_CATEGORIES
    })

def result_search(request):
    return render(request, "result_search.html")
