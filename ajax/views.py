from django.shortcuts import render
import json
from django.http import Http404, HttpResponse
from . import getlinks

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
        a = getlinks.codechefAnswers(u)
        print('\n\n\n')
        print(a)
        print('\n\n\n')
        data = json.dumps(a)
        print(data)
        return HttpResponse(data, content_type = "application/json")
