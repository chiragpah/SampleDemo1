# authentication_app/urls.py
from django.urls import path
from .views import PotentialUserRegistrationView, UserRegistrationApprovalView

urlpatterns = [
    path('register/', PotentialUserRegistrationView.as_view(), name='potential-user-registration'),
    #path('approve-registration/', UserRegistrationApprovalView.as_view(), name='approve-registration'),
    # Add more URL patterns as needed
]
