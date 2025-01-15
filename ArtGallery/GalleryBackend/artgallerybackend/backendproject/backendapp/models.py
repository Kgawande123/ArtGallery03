from django.db import models

class Product(models.Model):
    name = models.CharField(max_length=255)
    type = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.URLField(max_length=500)

    def __str__(self):
        return self.name
    
class Cart(models.Model):
    name = models.CharField(max_length=255)
    type = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.URLField(max_length=1024)

    def __str__(self):
        return self.name
    
class Checkout(models.Model):
    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.IntegerField()
    image = models.URLField(max_length=1024)

    def __str__(self):
        return self.name


class BillingData(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField()
    address = models.TextField()
    city = models.CharField(max_length=255)
    state = models.CharField(max_length=255)
    zip = models.CharField(max_length=10)

    def __str__(self):
        return self.name

from django.db import models


class Contact(models.Model):
    id = models.CharField(max_length=10, primary_key=True)
    name = models.CharField(max_length=255)
    email = models.EmailField()
    message = models.TextField()

    def __str__(self):
        return self.name

