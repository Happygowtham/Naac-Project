from django.contrib.auth.models import BaseUserManager
from django.contrib.auth import get_user_model

User = get_user_model()


class UserManager(BaseUserManager):
    def create_user(self, username, password=None):
        """
        Creates and saves a User with the given username, tenant and password.
        """
        if not username:
            raise ValueError('Users must have an username')

        user = self.model(
            username=username,
            password=password,
        )

        user.save(using=self._db)
        return user

    def create_superuser(self, username, password=None):
        """
        Creates and saves a superuser with the given username, tenant and password.
        """
        user = self.create_user(
            username,
            password=password,
        )
        user.save(using=self._db)
        return user
