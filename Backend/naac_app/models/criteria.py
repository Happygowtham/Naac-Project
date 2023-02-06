from django.db import models


class Criteria(models.Model):
    criteria_id = models.AutoField(primary_key=True)
    number = models.IntegerField(null=False)
    title = models.CharField(max_length=25, null=False)
    qualitative_count = models.IntegerField()
    quantitative_count = models.IntegerField()

    class Meta:
        db_table = "criteria"

    def __str__(self):
        return str(self.number) + "-" + self.title
