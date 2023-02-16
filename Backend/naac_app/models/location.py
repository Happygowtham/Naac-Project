from django.db import models


class Location(models.Model):
    title = models.CharField(max_length=25, null=False)
    description = models.TextField(null=True)

    class Meta:
        db_table = "location"

    def __str__(self):
        return self.title
