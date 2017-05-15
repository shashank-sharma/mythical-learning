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
