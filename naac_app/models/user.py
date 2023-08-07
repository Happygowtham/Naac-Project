from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models
from .criteria import Criteria
from .year import Year


class UserManager(BaseUserManager):
    """Define a model manager for User model with no username field."""

    use_in_migrations = True

    def _create_user(self, username, password, email, **extra_fields):
        print('password: ', password)
        """Create and save a User with the given email and password."""
        if not email:
            raise ValueError('The given email must be set')
        email = self.normalize_email(email)

        user = self.model(username=username, **extra_fields)
        user.save(using=self._db)
        user.set_password(password)
        user.save()
        return user

    def create_user(self, email, password=None, username=None, **extra_fields):
        """Create and save a regular User with the given email and password."""
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(username, password, email, **extra_fields)

    def create_superuser(self, email, password, username=None, **extra_fields):
        """Create and save a SuperUser with the given email and password."""
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self._create_user(username, email, password, **extra_fields)


class User(AbstractUser):
    faculty_code = models.CharField(null=True, max_length=5)
    access = models.ManyToManyField(Criteria, related_name="user_access")
    access_year = models.ManyToManyField(Year, related_name="access_year")

    objects = UserManager()

    # Image path to the common file path function
    prefix = "users"

    def __str__(self):
        return self.first_name or self.email
    
    @property
    def get_access(self):
        access = self.access.all()
        skills_list = []
        for skill in access:
            skills_list.append(skill.title)

        return skills_list
