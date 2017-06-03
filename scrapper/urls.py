from django.conf.urls import url
from . import views


urlpatterns = [
    url(r'^problem/', views.problem, name = 'problem'),
    url(r'^blog/', views.blog, name = 'blog'),
    url(r'^$', views.temple, name = 'temple'),
]
