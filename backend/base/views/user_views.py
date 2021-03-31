from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from django.contrib.auth.models import User
from base.serializers import ProductSerializer, UserSerializer, UserSerializerWithToken

# FOR JSON WEBTOKENS (CUSTOMIZING)
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from django.contrib.auth.hashers import make_password
from rest_framework import status



# CREATE JSON WEBTOKEN
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        # data we want to retrieve with our JSON webtoken
        # data['username'] = self.user.username
        # data['email'] = self.user.email

        # use serializer to loop through the data we want
        serializer = UserSerializerWithToken(self.user).data

        for k, v in serializer.items():     # k for key, v for value
            data[k] = v

        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

# POST REGISTER USER
@api_view(["POST"])
def registerUser(request):
    data = request.data
    #print('DATA:', data)

    # if data is entered create user, except if the user(email) already exists
    try:
        user = User.objects.create(      # Inside of user.create is all of the data we want to get, then teh data will be stored inside of user which will then be serialized and returned to the frontend
            first_name = data['name'],       # We are using first_name for the full name 
            username = data['email'],       # email is being set as the username
            email = data['email'],
            password = make_password(data['password'])      # make_password is an import that will hash the password
        )

        serializer = UserSerializerWithToken(user, many=False)      # UserSerializerWithToken so we can immediately create a token
        return Response(serializer.data)
    except:
        message = {'detail': 'User with this email already exists'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)



# GET USERS DB          [# http://127.0.0.1:8000/api/users/profile/
@api_view(['GET'])
@permission_classes([IsAuthenticated])      # imported to block anyone from url if they are not authenticated
def getUserProfile(request):
    user = request.user         # this user gets taken from JSON webtoken, does not work with admin login
    serializer = UserSerializer(user, many=False)     # Serializing the model, serializing user, and set to False meaning one object
    return Response(serializer.data)


@api_view(['GET'])          # http://127.0.0.1:8000/api/users/
@permission_classes([IsAdminUser])      # imported to block anyone from url if they are not isAdminUser
def getUsers(request):
    # returns all products from DB
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)     # Serializing the model, serializing products, and set to many meaning many objects        
    return Response(serializer.data)