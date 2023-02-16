from django.contrib.auth.models import AbstractUser
from django.db import models

from .userManager import UserManager


class User(AbstractUser):
    pimg = models.TextField(null=True)

    objects = UserManager()

    # Image path to the common file path function
    prefix = "users"

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

    def __str__(self):
        return self.first_name or self.email
