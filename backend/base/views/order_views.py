from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from base.models import Product, Order, OrderItem, ShippingAddress
from base.serializers import ProductSerializer, OrderSerializer

from rest_framework import status

# ADD ORDER TO DB
@api_view(['POST'])
@permission_classes([IsAuthenticated])  # Any user can place an order
def addOrderItems(request):
    user = request.user
    data = request.data

    orderItems = data['orderItems'] # pull out orderItems

    if orderItems and len(orderItems) == 0:
        return response({'detail' : 'No Order Items'}, status = status.HTTP_400_BAD_REQUEST)
    else:
        # using Order, OrderItem, and ShippingAddress from models.py
        # (1) Create Order
        order = Order.objects.create(
            user = user,
            paymentMethod = data['paymentMethod'],
            taxPrice = data['taxPrice'],
            shippingPrice = data['shippingPrice'],
            totalPrice = data['totalPrice']
        )

        # (2) Create Shipping Address
        shipping = ShippingAddress.objects.create(
            order = order,      # comes from order variable above
            address = data['shippingAddress']['address'],   # Inside of shipping address, pull address (how it was made in the frontend)
            city = data['shippingAddress']['city'],
            state = data['shippingAddress']['state'],
            postalCode = data['shippingAddress']['postalCode'],
            country = data['shippingAddress']['country'],
        )

        # (3) Create OrderItem and set Order to orderItem relationship
        for i in orderItems:
            product = Product.objects.get(_id=i['product'])     # We want to get all items by id and in the frontend the id was placed as product

            item = OrderItem.objects.create(
                product = product,
                order = order,
                name = product.name,
                qty = i['qty'],
                price = i['price'],
                image = product.image.url,
            )
            # (4) Update Stock, (still inside i loop)
            product.countInStock -= item.qty    # Update item amount after selling items
            product.save()
            
        serializer = OrderSerializer(order, many=False)
        return Response(serializer.data)


# GET COMPLETED ORDER FROM THE DB
@api_view(['GET'])
@permission_classes([IsAuthenticated])  
def getOrderById(request, pk):

    user = request.user

    try:
        order = Order.objects.get(_id=pk)
        # two types of users need to view this, customer, and admin
        if user.is_staff or order.user == user:         # if is_staff (django's version of admin) or is the same user
            serializer = OrderSerializer(order, many=False)
            return Response(serializer.data)
        else:
            Response({'detail':'Not authorized to view this order'},
                        status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response({'detail': 'Order does not exist'},
                            status = status.HTTP_400_BAD_REQUEST)