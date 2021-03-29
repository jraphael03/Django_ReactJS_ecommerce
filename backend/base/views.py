from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Product
from .products import products
from .serializers import ProductSerializer

# FOR JSON WEBTOKENS (CUSTOMIZING)
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        # data we want to retrieve with our JSON webtoken
        data['username'] = self.user.username
        data['email'] = self.user.email

        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer



@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/products/',
        '/api/products/create/',

        '/api/products/upload/',
        
        '/api/products/<id>/reviews/',

        '/api/products/top/',
        '/api/products/<id>/',

        '/api/products/delete/<id>/',
        '/api/products/<update>/<id>/',
    ]
    return Response(routes)


# GET PRODUCTS DB  [#http://127.0.0.1:8000/api/products/]
@api_view(['GET'])
def getProducts(request):
    # returns all products from DB
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)     # Serializing the model, serializing products, and set to many meaning many objects        
    return Response(serializer.data)

# GET PRODUCT BY ID        [#http://127.0.0.1:8000/api/products/id]
@api_view(['GET'])
def getProduct(request, pk):
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product, many=False)     # Serailize one product, many set to False because we only want one item
    return Response(serializer.data)














# # GET PRODUCT BY ID in products.py       [#http://127.0.0.1:8000/api/products/id]
# @api_view(['GET'])
# def getProduct(request, pk):
#     product = None
#     for i in products:
#         if i['_id'] == pk:      # i[_id] == pk stop looping the dictionary
#             product = i
#             break
#     return Response(product)





# Another way to customize JSONwebtoken
# class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
#     @classmethod
#     def get_token(cls, user):
#         token = super().get_token(user)

#         # Add custom claims
#         token['username'] = user.username
#         token['message'] = 'Hello World'

#         return token

# class MyTokenObtainPairView(TokenObtainPairView):
#     serializer_class = MyTokenObtainPairSerializer