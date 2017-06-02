from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^getlink$', views.getlink, name = 'getlink'),
    url(r'^getanswer', views.getanswer, name = 'getanswer'),
    url(r'^saveanswer', views.saveanswer, name = 'saveanswer'),
    url(r'^save-lang1', views.savelang1, name = 'savelang1'),
    url(r'^save-lang2', views.savelang2, name = 'savelang2'),
    url(r'^save-lang3', views.savelang3, name = 'savelang3'),
    url(r'^save-lang4', views.savelang4, name = 'savelang4'),
]
