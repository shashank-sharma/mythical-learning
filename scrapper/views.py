from django.shortcuts import render
from . import getlinks
from mysite.login.models import Language, Rating
from django.contrib.auth.decorators import login_required

# Create your views here.

@login_required
def temple(request):
    return render(request, 'scrapper/temple.html', {})

@login_required
def blog(request):
    return render(request, 'scrapper/blog.html', {})

@login_required
def cpp(request):
    rating = Rating.objects.filter(user = request.user)

    A = 'btn btn-floating btn'
    B = 'btn btn-floating btn'
    C = 'btn btn-floating btn'
    D = 'btn btn-floating btn'

    if not rating:
        A += ' pulse'
        B += ' pulse'
        C += ' pulse'
        D += ' pulse'
    else:
        rating = rating.values('rating')[0]['rating']
        if rating == 'A':
            A = A + ' red pulse'
        elif rating == 'B':
            B = B + ' red pulse'
        elif rating == 'C':
            C = C + ' red pulse'
        else:
            D = D + ' red pulse'
    return render(request, 'scrapper/cpp.html', {'A': A, 'B': B, 'C': C, 'D': D})

@login_required
def problem(request):
    language = Language.objects.filter(user = request.user)

    c = 'btn btn-floating btn'
    cpp = 'btn btn-floating btn'
    java = 'btn btn-floating btn'
    python = 'btn btn-floating btn'

    if not language:
        c += ' pulse'
        cpp += ' pulse'
        java += ' pulse'
        python += ' pulse'
    else:
        language = language.values('lang')[0]['lang']
        if language == ' C':
            c = c + ' red pulse'
        elif language == ' C++14':
            cpp = cpp + ' red pulse'
        elif language == ' JAVA':
            java = java + ' red pulse'
        elif language == ' PYTH':
            python = python + ' red pulse'
    return render(request, 'scrapper/problem.html', {'c': c, 'cpp': cpp, 'java': java, 'python': python})
