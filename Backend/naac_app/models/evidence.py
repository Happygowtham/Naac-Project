from django.db import models
from . import Criteria, Metrics, Location


class Evidence(models.Model):
    year_from = models.IntegerField(null=True)
    year_to = models.IntegerField(null=False)
    criteria = models.ForeignKey(Criteria, on_delete=models.CASCADE)
    metrics = models.ForeignKey(Metrics, on_delete=models.CASCADE)
    evidence_number = models.IntegerField(null=False)
    description = models.TextField(null=True)
    status = models.CharField(max_length=25, null=False)
    evidence_file = models.FileField()
    location = models.ForeignKey(Location, on_delete=models.CASCADE)

    class Meta:
        db_table = "evidence"

    def __str__(self):
        return str(self.evidence_number)
