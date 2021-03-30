from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from base.models import Product
from base.serializers import ProductSerializer

from rest_framework import status


# GET PRODUCTS DB  [# http://127.0.0.1:8000/api/products/
@api_view(['GET'])
def getProducts(request):
    # returns all products from DB
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)     # Serializing the model, serializing products, and set to many meaning many objects        
    return Response(serializer.data)

# GET PRODUCT BY ID        [# http://127.0.0.1:8000/api/products/id
@api_view(['GET'])
def getProduct(request, pk):
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product, many=False)     # Serailize one product, many set to False because we only want one item
    return Response(serializer.data)


