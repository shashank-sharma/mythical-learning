from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^getlink$', views.getlink, name = 'getlink')
]
