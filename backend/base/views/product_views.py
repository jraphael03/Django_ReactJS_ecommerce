from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from base.models import Product, Review
from base.serializers import ProductSerializer

from rest_framework import status


# GET PRODUCTS DB  [# http://127.0.0.1:8000/api/products/
@api_view(['GET'])
def getProducts(request):
    # returns all products from DB
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)     # Serializing the model, serializing products, and set to many meaning many objects        
    return Response(serializer.data)

# GET PRODUCT BY ID        [# http://127.0.0.1:8000/api/products/id/
@api_view(['GET'])
def getProduct(request, pk):
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product, many=False)     # Serailize one product, many set to False because we only want one item
    return Response(serializer.data)


# CREATE PRODUCT AS ADMIN        [# http://127.0.0.1:8000/api/create/
@api_view(['POST'])
@permission_classes([IsAdminUser])
def createProduct(request):

    user = request.user

    product = Product.objects.create(
        user = user,
        name = 'Sample Name',
        price = 0,
        brand = 'Sample Brand',
        countInStock = 0,
        category = 'Sample Category',
        description = ''
    )

    serializer = ProductSerializer(product, many=False)     # Serailize one product, many set to False because we only want one item
    return Response(serializer.data)


# UPDATE PRODUCT BY ID AS ADMIN        [# http://127.0.0.1:8000/api/update/<str:pk>/
@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateProduct(request, pk):
    data = request.data
    product = Product.objects.get(_id=pk)

    product.name = data['name']
    product.price = data['price']
    product.brand = data['brand']
    product.countInStock = data['countInStock']
    product.category = data['category']
    product.description = data['description']

    product.save()

    serializer = ProductSerializer(product, many=False)     # Serailize one product, many set to False because we only want one item
    return Response(serializer.data)


# DELETE PRODUCT BY ID USING ADMIN       [ # http://127.0.0.1:8000/api/delete/<str:pk>/
@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(request, pk):
    product = Product.objects.get(_id=pk)
    product.delete()
    return Response('Product deleted')


# UPLOAD AN IMAGE TO DB     # http://127.0.0.1:8000/api/upload/
@api_view(['POST'])
def uploadImage(request):
    data = request.data

    product_id = data[ 'product_id' ]
    product = Product.objects.get(_id=product_id)   # where to set image

    product.image = request.FILES.get('image')      # Send image back to frontend with get
    product.save()

    return Response('Image was uploaded')


# UPLOAD REVIEW TO DB    # http://127.0.0.1:8000/api/products/<str:pk>/reviews/
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProductReview(request, pk):
    user = request.user
    product = Product.objects.get(_id=pk)
    data = request.data

    #1 - Review already exists (prevent another)
    alreadyExists = product.review_set.filter(user=user).exists()
    if alreadyExists:
        content = {'detail': 'Product already reviewed'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)
    #2 - No Rating or 0 (let user know they did not review)
    elif data['rating'] == 0:
        content = {'detail': 'Please select a rating'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)
    #3 - Create review
    else:
        review = Review.objects.create(
            user=user,
            product=product,
            name=user.first_name,
            rating=data['rating'],      # called rating in frontend
            comment=data['comment'],
        )
        # Find the length of all reviews we have for Product (numReviews)
        reviews = product.review_set.all()
        product.numReviews = len(reviews)

        # Calculate rating from all reviews
        total = 0
        for i in reviews:       # loop to pull all reviews
            total += i.rating

        product.rating = total / len(reviews)       # total number divide ratings
        product.save()

        return Response('Review Added')
