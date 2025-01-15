from rest_framework import serializers
from .models import Product
from .models import Cart
from .models import Checkout
from .models import BillingData
from .models import Contact

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'type', 'price', 'image']



class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = ['id', 'name', 'type', 'price', 'image']





class CheckoutSerializer(serializers.ModelSerializer):
    class Meta:
        model = Checkout
        fields = ['id', 'image', 'name', 'price', 'quantity']





class BillingDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = BillingData
        fields = [ 'name', 'email', 'address', 'city', 'state', 'zip']






class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ['id', 'name', 'email', 'message']
        

