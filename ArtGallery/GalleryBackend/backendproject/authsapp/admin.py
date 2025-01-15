from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

# Customize the admin interface for the CustomUser model
class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ['username', 'email', 'first_name', 'last_name', 'phone_number', 'is_staff']
    list_filter = ['is_staff', 'is_superuser', 'is_active']
    search_fields = ['username', 'email']
    ordering = ['username']

# Register the CustomUser model with the admin interface
admin.site.register(CustomUser, CustomUserAdmin)
