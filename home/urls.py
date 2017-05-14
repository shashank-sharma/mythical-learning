from django.conf.urls import url
from . import views


urlpatterns = [
    url(r'^$', views.main_home, name='main_home'),
]
