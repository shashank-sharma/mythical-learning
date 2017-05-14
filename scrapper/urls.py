from django.conf.urls import url
from . import views


urlpatterns = [
    url(r'^problem/', views.problem, name = 'problem'),
]
