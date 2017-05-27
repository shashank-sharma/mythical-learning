from django.shortcuts import render
from . import getlinks
from mysite.login.models import Language
from django.contrib.auth.decorators import login_required

# Create your views here.

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
