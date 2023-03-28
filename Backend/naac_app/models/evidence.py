from django.db import models
from . import  Criteria, Metrics, Location, User
from naac.utils.common_functions import get_file_path

class Evidence(models.Model):
    year = models.ForeignKey('naac_app.Year', on_delete=models.CASCADE)
    criteria = models.ForeignKey(Criteria, on_delete=models.CASCADE)
    metrics = models.ForeignKey(Metrics, on_delete=models.CASCADE)
    evidence_number = models.CharField(max_length=25, null=False)
    description = models.TextField(null=True)
    status = models.CharField(max_length=25, null=False)
    evidence_file = models.FileField(upload_to=get_file_path)
    location = models.ForeignKey(Location, on_delete=models.CASCADE)

    class Meta:
        db_table = "evidence"

    def __str__(self):
        return str(self.evidence_number)
