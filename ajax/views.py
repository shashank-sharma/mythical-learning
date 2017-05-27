from django.shortcuts import render
import json
from django.http import Http404, HttpResponse
from . import getlinks
from mysite.login.models import Language

# Create your views here.

def getlink(request):
    if request.is_ajax():
        a = getlinks.codechef()
        data = json.dumps(a)
        return HttpResponse(data, content_type = "application/json")
    else:
        raise Http404

def getanswer(request):
    u = request.GET['link']
    if request.is_ajax():
        language = Language.objects.filter(user = request.user)
        if not language:
            language = " C"
        else:
            language = language.values('lang')[0]['lang']
        a = getlinks.codechefAnswers(u, language)
        data = json.dumps(a)
        print(data)
        return HttpResponse(data, content_type = "application/json")

def savelang1(request):
    if request.is_ajax():
        # Update language
        #q = Language(user = request.user, lang = ' C')
        q = Language.objects.filter(user = request.user)
        if not q:
            print(1)
            q = Language(user = request.user, lang = ' C')
        else:
            print(2)
            Language.objects.filter(user = request.user).update(lang = ' C')
        a = 'success'
        data = json.dumps(a)
        return HttpResponse(data, content_type = "application/json")

def savelang2(request):
    if request.is_ajax():
        q = Language.objects.filter(user = request.user)
        if not q:
            q = Language(user = request.user, lang = " C++14")
        else:
            Language.objects.filter(user = request.user).update(lang = " C++14")
        a = 'success'
        data = json.dumps(a)
        return HttpResponse(data, content_type = "application/json")

def savelang3(request):
    if request.is_ajax():
        q = Language.objects.filter(user = request.user)
        if not q:
            q = Language(user = request.user, lang = " JAVA")
        else:
            Language.objects.filter(user = request.user).update(lang = " JAVA")
        a = 'success'
        data = json.dumps(a)
        return HttpResponse(data, content_type = "application/json")

def savelang4(request):
    if request.is_ajax():
        q = Language.objects.filter(user = request.user)
        if not q:
            q = Language(user = request.user, lang = " PYTH")
        else:
            Language.objects.filter(user = request.user).update(lang = " PYTH")
        a = 'success'
        data = json.dumps(a)
        return HttpResponse(data, content_type = "application/json")
