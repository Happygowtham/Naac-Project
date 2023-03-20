from rest_framework.decorators import action
from rest_framework.views import Response
from naac_app.models import Metrics
from naac_app.serializers import MetricSerializer
from rest_framework import viewsets


class MetricViewSet(viewsets.ModelViewSet):
    queryset = Metrics.objects.all()
    serializer_class = MetricSerializer
    filterset_fields = ['criteria', 'key_identifier']