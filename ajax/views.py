from django.shortcuts import render
import json
from django.http import Http404, HttpResponse
from . import getlinks
from mysite.login.models import Language, Answers, Blogs

# Create your views here.

'''
 Get link calls getlinks function from another file which get question id
 From json file and then scrape the given page to provide question details
'''
def getlink(request):
    if request.is_ajax():
        a = getlinks.codechef()
        data = json.dumps(a)
        return HttpResponse(data, content_type = "application/json")
    else:
        raise Http404

# Create javascript and work on AJAX call
def cfgetlink(request):
    if request.is_ajax():
        url, question, content = getlinks.codeforces()
        pack = []
        pack.append(url)
        pack.append(question)
        pack.append(content)
        data = json.dumps(a)
        return HttpResponse(data, content_type = "application/json")
    else:
        raise Http404
'''
 Get answer accept one paramter through link which is question link.
 Question link is used to get the ID of that question and later
 checked in database to get all possible answer related to that id
 After matching it scrape the answer page and return it here

'''
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

def getblog(request):
    if request.is_ajax():
        a = getlinks.ynews()
        data = json.dumps(a)
        return HttpResponse(data, content_type = "application/json")
    else:
        raise Http404

def saveanswer(request):
    u = request.GET['code']
    print(u)
    v = request.GET['url']
    print(v)
    if request.is_ajax():
        language = Language.objects.filter(user = request.user)
        if not language:
            language = " C"
        else:
            language = language.values('lang')[0]['lang']
        ans = Answers.objects.filter(user = request.user, answer = u)
        if ans:
            a = 'no'
        else:
            answer = Answers(user = request.user,
                        question = v,
                        lang = language,
                        answer = u,
                        track = "-")
            answer.save()
            a = "success"
        data = json.dumps(a)
        return HttpResponse(data, content_type = "application/json")

def saveblog(request):
    if request.is_ajax():
        getTitle = request.GET['title']
        getScore = request.GET['score']
        getUrl = request.GET['url']
        getId = request.GET['id']

        blog = Blogs.objects.filter(user = request.user, blogId = getId)
        if blog:
            res = 'no'
        else:
            saveBlog = Blogs(user = request.user,
                        title = getTitle,
                        score = getScore,
                        url = getUrl,
                        blogId = getId)
            saveBlog.save()
            res = "success"
        data = json.dumps(res)
        return HttpResponse(data, content_type = "application/json")

def deleteblog(request):
    if request.is_ajax():
        getId = request.GET['id']

        blog = Blogs.objects.filter(user = request.user,blogId = getId)
        blog.delete()
        res = "success"
        data = json.dumps(res)
        return HttpResponse(data, content_type = "application/json")

'''
 Here save lang is used to save the current language session of that particular
 User permanently. It updates given mode again and again

#################################################################

This can be formated easy by creating one common function and rest other to
link them by it to avoid typing same thing twice
'''
def savelang1(request):
    if request.is_ajax():
        # Update language
        #q = Language(user = request.user, lang = ' C')
        q = Language.objects.filter(user = request.user)
        if not q:
            print(1)
            q = Language(user = request.user, lang = ' C')
            q.save()
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
            q.save()
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
            q.save()
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
            q.save()
        else:
            Language.objects.filter(user = request.user).update(lang = " PYTH")
        a = 'success'
        data = json.dumps(a)
        return HttpResponse(data, content_type = "application/json")
