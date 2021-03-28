from django.urls import path
from . import views


urlpatterns = [
    path('', views.getRoutes, name="routes"),                   #http://127.0.0.1:8000
    path('products/', views.getProducts, name="products"),      #http://127.0.0.1:8000/api/products/
    path('products/<str:pk>', views.getProduct, name="product"),      #http://127.0.0.1:8000/api/products/
]
