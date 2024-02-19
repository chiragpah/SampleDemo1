# authentication_app/views.py
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .models import User, PotentialUser
from .serializers import UserSerializer, PotentialUserSerializer

class PotentialUserRegistrationView(generics.CreateAPIView):
    queryset = PotentialUser.objects.all()
    serializer_class = PotentialUserSerializer

class UserRegistrationApprovalView(APIView):
    def post(self, request, *args, **kwargs):
        potential_user_id = request.data.get('potential_user_id')
        try:
            potential_user = PotentialUser.objects.get(pk=potential_user_id, approved=False)
        except PotentialUser.DoesNotExist:
            return Response({'error': 'PotentialUser not found or already approved'}, status=status.HTTP_404_NOT_FOUND)

        # Set approved status to True
        potential_user.approved = True
        potential_user.save()

        # Create corresponding User record
        user_data = {
            'name': potential_user.name,
            'email': potential_user.email,
            'phone': potential_user.phone,
            'password': potential_user.password,
            'gender': potential_user.gender,
            'date_of_birth': potential_user.date_of_birth,
            'location': potential_user.location,
            # Add other fields as needed
        }

        user_serializer = UserSerializer(data=user_data)
        if user_serializer.is_valid():
            user_serializer.save()

            return Response({'message': 'User approved and registered successfully.'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid user data'}, status=status.HTTP_400_BAD_REQUEST)
