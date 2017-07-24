from django.shortcuts import render

# Create your views here.

def main_home(request):
    print('---------')
    if request.user.is_authenticated():
        return render(request, 'home.html', {})
    else:
        return render(request, 'home/main_home.html', {})

def about(request):
    return render(request, 'about.html', {})

def faq(request):
    return render(request, 'faq.html', {})

def fsecurity(request):
    return render(request, 'fsecurity.html', {})

def fcontact(request):
    return render(request, 'fcontact.html', {})

def view404(request):
    return render(request, '404.html', {})
