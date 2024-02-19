# authentication_app/serializers.py
from rest_framework import serializers
from .models import User, PotentialUser

class PotentialUserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = PotentialUser
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
