from django.conf.urls import url
from . import views


urlpatterns = [
    url(r'about/', views.about, name='about'),
    url(r'faq/security', views.fsecurity, name='fsecurty'),
    url(r'faq/contact', views.fcontact, name='fcontact'),
    url(r'faq/', views.faq, name='faq'),
    url(r'^$', views.main_home, name='main_home'),
]
