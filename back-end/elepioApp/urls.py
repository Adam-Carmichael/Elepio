from django.conf.urls import url 
from elepioApp import views 
 
urlpatterns = [
    url(r'^api/getBoard$', views.getBoard),
    url(r'^api/createBoard$', views.createBoard),
    url(r'^api/getPlayer$', views.getPlayer),
    url(r'^api/createPlayer$', views.createPlayer),
    url(r'^api/elepioApp$', views.elepioApp_list),
    url(r'^api/elepioApp/(?P<pk>[0-9]+)$', views.elepioApp_detail),
    url(r'^api/elepioApp/published$', views.elepioApp_list_published)
]
