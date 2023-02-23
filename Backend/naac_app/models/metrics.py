from django.db import models
from .keyidentifiers import KeyIdentifiers
from .criteria import Criteria


class Metrics(models.Model):
    metric_id = models.AutoField(primary_key=True)
    criteria = models.ForeignKey(
        Criteria, on_delete=models.CASCADE, null=False, db_constraint=False)
    key_identifier = models.ForeignKey(
        KeyIdentifiers, on_delete=models.CASCADE, null=False, db_constraint=False)
    number = models.CharField(max_length=25,null=False)
    type = models.CharField(max_length=25, null=False)
    score = models.IntegerField(null=True)
    question = models.CharField(max_length=25, null=True)
    answer = models.CharField(max_length=25, null=True)

    class Meta:
        db_table = "metrics"

    def __str__(self):
        return str(self.number) + "-" + self.type
