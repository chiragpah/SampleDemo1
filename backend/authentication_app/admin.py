# authentication_app/admin.py
from django.contrib import admin
from .models import User, PotentialUser

class PotentialUserAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'approved')
    actions = ['approve_selected_users']

    def approve_selected_users(self, request, queryset):
        # Update the 'approved' field to True for selected potential users
        queryset.update(approved=True)

        # Create corresponding User records
        for potential_user in queryset:
            new_user = User.objects.create(
                name=potential_user.name,
                email=potential_user.email,
                phone=potential_user.phone,
                password=potential_user.password,
                gender=potential_user.gender,
                date_of_birth=potential_user.date_of_birth,
                location=potential_user.location,
                # Add other fields as needed
            )
            print(f"Created new user: {new_user}")

        self.message_user(request, f'Selected potential users approved and corresponding users created successfully.')

    approve_selected_users.short_description = 'Approve selected potential users and create corresponding users'

admin.site.register(PotentialUser, PotentialUserAdmin)
