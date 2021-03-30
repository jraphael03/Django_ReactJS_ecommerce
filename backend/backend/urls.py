from django.contrib import admin
from django.urls import path, include

from django.conf import settings
from django.conf.urls.static import static      # Function that allows us to connect urls

urlpatterns = [
    path('admin/', admin.site.urls),
    #path('api/', include('base.urls')),      #include(nameOfApp.fileToUse)
    path('api/products/', include('base.urls.product_urls')),
    path('api/users/', include('base.urls.user_urls')),
    path('api/orders/', include('base.urls.order_urls')),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)        # Set url you want to add, then which folder do you want to look into  (url, folder) both settings can be found in settings file