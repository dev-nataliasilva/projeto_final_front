from django.shortcuts import render, HttpResponse

# Create your views here.
def home(request):
    return render(request, "home.html")

def result_search(request):
    return render(request, "result_search.html")