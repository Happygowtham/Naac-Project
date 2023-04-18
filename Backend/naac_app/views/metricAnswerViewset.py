from naac_app.models import MetricAnswer
from naac_app.serializers import MetricAnswerSerializer
from rest_framework import viewsets


class MetricAnswerViewSet(viewsets.ModelViewSet):
    queryset = MetricAnswer.objects.all()
    serializer_class = MetricAnswerSerializer
    filterset_fields = ['metric_id', 'year']
