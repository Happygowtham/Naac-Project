from django.db import models
from .keyidentifiers import KeyIdentifiers
from .criteria import Criteria


TYPE_CHOICES = (
    ('QLM', 'Qualitative Count'),
    ('QNM', 'Quantitative Count'),
)


class Metrics(models.Model):
    metric_id = models.AutoField(primary_key=True)
    criteria = models.ForeignKey(
        Criteria, on_delete=models.CASCADE, null=False, db_constraint=False)
    key_identifier = models.ForeignKey(
        KeyIdentifiers, on_delete=models.CASCADE, null=False, db_constraint=False)
    number = models.CharField(max_length=25,null=False)
    type = models.CharField(
        max_length=3, choices=TYPE_CHOICES, null=True)
    score = models.IntegerField(null=True)
    question = models.CharField(max_length=254, null=True, blank=True)
    answer = models.TextField(null=True, blank=True)


    class Meta:
        db_table = "metrics"

    def __str__(self):
        return str(self.number) + "-" + self.type
