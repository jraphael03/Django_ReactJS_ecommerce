from django.urls import path
from base.views import product_views as views


urlpatterns = [
    path('', views.getProducts, name="products"),      # http://127.0.0.1:8000/api/products/
    path('<str:pk>/', views.getProduct, name="product"),      # http://127.0.0.1:8000/api/products/id

    path('delete/<str:pk>/', views.deleteProduct, name="product-delete"),   # http://127.0.0.1:8000/api/delete/<str:pk>/
]
