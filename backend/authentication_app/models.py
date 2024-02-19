from django.db import models


class PotentialUser(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=20, null=True, blank=True)
    password = models.CharField(max_length=255)
    gender = models.CharField(max_length=10, choices=[('Male', 'Male'), ('Female', 'Female'), ('Other', 'Other')])
    date_of_birth = models.DateField()
    location = models.CharField(max_length=255)
    approved = models.BooleanField(default=False)
     
    def __str__(self):
        return self.name

class User(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=20, null=True, blank=True)
    password = models.CharField(max_length=255)
    date_of_birth = models.DateField()
    gender = models.CharField(max_length=10, choices=[('Male', 'Male'), ('Female', 'Female'), ('Other', 'Other')])
    location = models.CharField(max_length=255)
    interest = models.ManyToManyField('Interest', blank=True)
    profile_pic = models.ImageField(upload_to='profile_pics/', null=True, blank=True)
    friend_list = models.ManyToManyField('self', symmetrical=False, blank=True)
    send_list = models.ManyToManyField('self', symmetrical=False, related_name='sent_requests', blank=True)
    pending_list = models.ManyToManyField('self', symmetrical=False, related_name='received_requests', blank=True)

    def __str__(self):
        return self.name  
    

class Interest(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name  
