from django.contrib import admin
from django.urls import path, include

from django.conf import settings
from django.conf.urls.static import static      # Function that allows us to connect urls

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('base.urls')),      #include(nameOfApp.fileToUse)
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)        # Set url you want to add, then which folder do you want to look into  (url, folder) both settings can be found in settings file