from django.conf.urls import url 
from elepioApp import views 
 
urlpatterns = [
    url(r'^api/getBoard$', views.board),
    url(r'^api/elepioApp$', views.elepioApp_list),
    url(r'^api/elepioApp/(?P<pk>[0-9]+)$', views.elepioApp_detail),
    url(r'^api/elepioApp/published$', views.elepioApp_list_published)
]
