from django.shortcuts import render
from . import getlinks

# Create your views here.

def problem(request):
    return render(request, 'scrapper/problem.html', {})
