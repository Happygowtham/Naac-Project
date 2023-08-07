from django.db import models


class Year(models.Model):
    from_year = models.IntegerField(null=False)
    to_year = models.IntegerField(null=False)
    is_active_year = models.BooleanField(default=False)

    class Meta:
        db_table = "year"

    def __str__(self):
        return str(self.from_year) + "-" + str(self.to_year)
