from django.urls import path
from base.views import order_views as views

urlpatterns = [
    path('', views.getOrders, name='orders'),    # http://127.0.0.1:8000/api/orders/
    path('add/', views.addOrderItems, name='orders-add'),    # http://127.0.0.1:8000/api/add/
    path('myorders/', views.getMyOrders, name='myorders'),    # http://127.0.0.1:8000/api/myorders/

    path('<str:pk>/deliver/', views.updateOrderToDelivered, name='order-delivered'),    # http://127.0.0.1:8000/api/<str:pk>/deliver/
    path('<str:pk>/', views.getOrderById, name='user-order'),    # http://127.0.0.1:8000/api/<str:pk>/
    path('<str:pk>/pay/', views.updateOrderToPaid, name='pay'),    # http://127.0.0.1:8000/api/<str:pk>/pay/
]