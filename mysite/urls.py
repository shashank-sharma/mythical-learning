"""mysite URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin
from django.contrib.auth import views as auth_views
from mysite.login import views as login_views
from django.conf.urls import handler404

handler404 = 'home.views.view404'

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^ajax/', include('ajax.urls')),
    url(r'^introduction/', login_views.introduction, name = 'introduction'),
    url(r'^temple/', include('scrapper.urls')),
    url(r'settings/', login_views.update_profile, name='update_profile'),
    url(r'^dashboard/', login_views.dashboard, name='dashboard'),
    url(r'^answers/', login_views.answersview, name='answersview'),
    url(r'^later-blog/', login_views.blogsview, name='blogsview'),
    url(r'^login/$', auth_views.login, {'template_name': 'login.html'}, name='login'),
    url(r'^signup/$', login_views.signup, name='signup'),
    url(r'^logout/$', auth_views.logout, {'next_page': 'login'}, name='logout'),
    url(r'^account_activation_sent/$', login_views.account_activation_sent, name='account_activation_sent'),
    url(r'^activate/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$',
        login_views.activate, name='activate'),
    url(r'^password_reset/$', auth_views.password_reset, name='password_reset'),
    url(r'^password_reset/done/$', auth_views.password_reset_done, name='password_reset_done'),
    url(r'^reset/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$',
        auth_views.password_reset_confirm, name='password_reset_confirm'),
    url(r'^reset/done/$', auth_views.password_reset_complete, name='password_reset_complete'),
    #url(r'^$', login_views.home, name='home'),
    url(r'dashboard/', login_views.home, name='home'),
    url(r'^', include('home.urls')),
]
