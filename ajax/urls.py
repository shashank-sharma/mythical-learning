from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^getlink$', views.getlink, name = 'getlink'),
    url(r'^getanswer', views.getanswer, name = 'getanswer'),
    url(r'^saveanswer', views.saveanswer, name = 'saveanswer'),
    url(r'^getblog', views.getblog, name = 'getblog'),
    url(r'^saveblog', views.saveblog, name = 'saveblog'),
    url(r'deleteblog', views.deleteblog, name = 'deleteblog'),
    url(r'^save-lang1', views.savelang1, name = 'savelang1'),
    url(r'^save-lang2', views.savelang2, name = 'savelang2'),
    url(r'^save-lang3', views.savelang3, name = 'savelang3'),
    url(r'^save-lang4', views.savelang4, name = 'savelang4'),

    url(r'^cfgetlink', views.cfgetlink, name = 'cfgetlink'),
    url(r'^cfgetanswer', views.cfgetanswer, name = 'cfgetanswer'),
    url(r'^cfdone', views.cfdone, name = 'cfdone'),
    url(r'^saverating1', views.saverating1, name = 'saverating1'),
    url(r'^saverating2', views.saverating2, name = 'saverating2'),
    url(r'^saverating3', views.saverating3, name = 'saverating3'),
    url(r'^saverating4', views.saverating4, name = 'saverating4'),
]
