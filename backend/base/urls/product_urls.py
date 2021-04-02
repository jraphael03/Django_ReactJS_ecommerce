from django.urls import path
from base.views import product_views as views


urlpatterns = [
    path('', views.getProducts, name="products"),      # http://127.0.0.1:8000/api/products/
    path('create/', views.createProduct, name="product-create"),   # http://127.0.0.1:8000/api/create/
    path('<str:pk>/', views.getProduct, name="product"),      # http://127.0.0.1:8000/api/products/id
    path('update/<str:pk>/', views.updateProduct, name="product-update"),   # http://127.0.0.1:8000/api/update/<str:pk>/
    path('delete/<str:pk>/', views.deleteProduct, name="product-delete"),   # http://127.0.0.1:8000/api/delete/<str:pk>/
]
