from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductViewSet, CartViewSet, CheckoutViewSet, BillingDataViewSet, ContactViewSet,PaymentViewSet

# Create a DefaultRouter instance
router = DefaultRouter()
router.register(r'products', ProductViewSet)  # Removed trailing slash
router.register(r'cart', CartViewSet)        # Removed trailing slash
router.register(r'checkout', CheckoutViewSet)  # Removed trailing slash
router.register(r'billingdata', BillingDataViewSet)  # Removed trailing slash
router.register(r'contacts', ContactViewSet)  # Removed trailing slash
router.register(r'payment', PaymentViewSet, basename='payment')


urlpatterns = [
    path('', include(router.urls)),  # Include all router-generated URLs
]
