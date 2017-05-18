from django.shortcuts import render

# Create your views here.

def main_home(request):
    return render(request, 'home/main_home.html', {})

def about(request):
    return render(request, 'about.html', {})

def faq(request):
    return render(request, 'faq.html', {})
