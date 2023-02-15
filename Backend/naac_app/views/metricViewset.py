from naac_app.models import Metrics
from naac_app.serializers import MetricSerializer
from rest_framework import viewsets


class MetricViewSet(viewsets.ModelViewSet):
    queryset = Metrics.objects.all()
    serializer_class = MetricSerializer
    permission_classes = []
