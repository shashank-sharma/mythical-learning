from django.conf.urls import url
from . import views


urlpatterns = [
    url(r'about/', views.about, name='about'),
    url(r'faq/', views.faq, name='faq'),
    url(r'^$', views.main_home, name='main_home'),
]
