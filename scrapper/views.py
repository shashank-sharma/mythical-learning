from django.shortcuts import render

# Create your views here.

def problem(request):
    return render(request, 'scrapper/problem.html', {})
