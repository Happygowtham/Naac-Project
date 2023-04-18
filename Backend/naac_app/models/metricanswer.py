from django.db import models


class MetricAnswer(models.Model):
    year = models.ForeignKey('naac_app.Year', on_delete=models.CASCADE)
    metric_id = models.ForeignKey('naac_app.Metrics', on_delete=models.CASCADE)
    answer = models.IntegerField(null=False)

    class Meta:
        db_table = "metric_answer"

    def __str__(self):
        return self.title
