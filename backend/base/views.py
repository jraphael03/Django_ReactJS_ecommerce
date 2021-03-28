from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .products import products

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


# GET PRODUCTS FROM PRODUCTS.PY FILE   [#http://127.0.0.1:8000/api/products/]
@api_view(['GET'])
def getProducts(request):
    return Response(products)

# GET PRODUCT BY ID        [#http://127.0.0.1:8000/api/products/id]
@api_view(['GET'])
def getProduct(request, pk):
    product = None
    for i in products:
        if i['_id'] == pk:      # i[_id] == pk stop looping the dictionary
            product = i
            break
    return Response(product)

