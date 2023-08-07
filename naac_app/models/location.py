from django.db import models
from .user import User


class Location(models.Model):
    title = models.CharField(max_length=25, null=False)
    description = models.TextField(null=True)
    incharge = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        db_table = "location"

    def __str__(self):
        return self.title
