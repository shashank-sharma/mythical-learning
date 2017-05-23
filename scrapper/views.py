from django.shortcuts import render
from . import getlinks
from django.contrib.auth.decorators import login_required

# Create your views here.

@login_required
def problem(request):
    return render(request, 'scrapper/problem.html', {})
