from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Product, Order, OrderItem, ShippingAddress

# Using to customize what we want returned from JSON webtoken on login
class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)     # Make id _id to be consistent with frontend and Model
    isAdmin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', '_id', 'username', 'email', 'name', 'isAdmin']      # Return the fields we select

    # fieldname is _id, get_ needs to be added for django standard
    def get__id(self, obj):
        return obj.id       # changes id to _id

    # fieldname is isAdmin grabbing django field and renaming, same as other classes
    def get_isAdmin(self, obj):
        return obj.is_staff

    # fieldname is name, get_ needs to be added for django standard
    def get_name(self, obj):
        name = obj.first_name
        if name == '':          # If name is empty use users email
            name = obj.email
        return name

#  Serializer that will create the token Extends UserSerializer
class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', '_id', 'username', 'email', 'name', 'isAdmin', 'token']      # Return the fields we select

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)      # token needs to be str when returned, access token grants access to account Ex: updating

# Used when Getting items
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'      # Return all fields


# 
class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingAddress
        fields = '__all__'      # Return all fields


# 
class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = '__all__'      # Return all fields


# OrderSerializer serializees Orders, ShippingAddress, and User
class OrderSerializer(serializers.ModelSerializer):
    orders = serializers.SerializerMethodField(read_only=True)
    shippingAddress = serializers.SerializerMethodField(read_only=True)
    user = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Order
        fields = '__all__'      # Return all fields

    def get_orders(self, obj):
        items = obj.orderitem_set.all()
        serializer = OrderItemSerializer(items, many=True)
        return serializer.data

    def get_shippingAddress(self, obj):
        try:
            address = ShippingAddressSerializer(obj.shippingAddress, many=False)
        except: 
            address = False
        return address

    def get_user(self, obj):
        user = obj.user
        serializer = UserSerializer(user, many=False)
        return serializer.data    