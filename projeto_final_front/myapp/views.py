from django.shortcuts import render, HttpResponse

# Create your views here.
def home(request):
    return render(request, "home.html")

def introduction(request):
    return render(request, "introduction.html")

def steps(request):
    return render(request, "steps.html")

def result_search(request):
    return render(request, "result_search.html")
