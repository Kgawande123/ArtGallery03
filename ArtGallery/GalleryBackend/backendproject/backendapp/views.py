from rest_framework import viewsets
from .models import Product, Cart, Checkout,BillingData,Contact
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import action
from .serializers import ProductSerializer, CartSerializer, CheckoutSerializer,ContactSerializer

from rest_framework.viewsets import ViewSet
import stripe
from django.conf import settings


# Product viewset
class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

# Cart viewset
class CartViewSet(viewsets.ModelViewSet):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer

# Checkout viewset
class CheckoutViewSet(viewsets.ModelViewSet):
    queryset = Checkout.objects.all()
    serializer_class = CheckoutSerializer



# views.py
from rest_framework import viewsets
from .models import BillingData
from .serializers import BillingDataSerializer

# billingdata.py

class BillingDataViewSet(viewsets.ModelViewSet):
    queryset = BillingData.objects.all()
    serializer_class = BillingDataSerializer

    def create(self, request, *args, **kwargs):
        # Validate and create billing data
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


#Contact.py
class ContactViewSet(viewsets.ModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer


# stripe.py
stripe.api_key = settings.STRIPE_SECRET_KEY

class PaymentViewSet(ViewSet):
    """
    A ViewSet to handle payment intent creation.
    """

    def create(self, request):
        """
        Create a Stripe payment intent.
        """
        data = request.data
        try:
            amount = data.get("amount")
            currency = data.get("currency", "usd")

            if not amount:
                return Response({"error": "Amount is required."}, status=status.HTTP_400_BAD_REQUEST)

            # Convert amount to cents for Stripe (e.g., $10 -> 1000 cents)
            amount_in_cents = int(float(amount) * 100)

            # Create PaymentIntent
            payment_intent = stripe.PaymentIntent.create(
                amount=amount_in_cents,
                currency=currency,
            )

            return Response(
                {"clientSecret": payment_intent.client_secret},
                status=status.HTTP_201_CREATED,
            )
        except stripe.error.StripeError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
