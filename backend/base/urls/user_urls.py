from django.urls import path
from base.views import user_views as views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    #TokenRefreshView,
)


urlpatterns = [
    #path('users/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'), old way to use token using urls.py imports, difference is no customization
    #path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),      # http://127.0.0.1:8000/api/users/login/

    path('register/', views.registerUser, name="register"),     # http://127.0.0.1:8000/api/users/register/

    path('profile/', views.getUserProfile, name="user-profile"),      # http://127.0.0.1:8000/api/users/profile/
    path('profile/update/', views.updateUserProfile, name="user-profile-update"),      # http://127.0.0.1:8000/api/users/profile/update/
    path('', views.getUsers, name="users"),      # http://127.0.0.1:8000/api/users/
    
    path('<str:pk>/', views.getUserById, name="user"),  # http://127.0.0.1:8000/api/<str:pk>/
    path('update/<str:pk>/', views.updateUser, name="user-update"),     # http://127.0.0.1:8000/api/update/<str:pk>/

    path('delete/<str:pk>/', views.deleteUser, name="user-delete"),      # http://127.0.0.1:8000/api/delete/<str:pk>/
]
