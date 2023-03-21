from rest_framework.views import Response
from naac_app.models import Metrics, Criteria, KeyIdentifiers
from naac_app.serializers import MetricSerializer
from rest_framework import viewsets
from rest_framework.views import APIView



class MetricViewSet(viewsets.ModelViewSet):
    queryset = Metrics.objects.all()
    serializer_class = MetricSerializer
    filterset_fields = ['criteria']

class MetricBulkCreate(APIView):
    def post(self, request):
        data = request.data
        metrics = []
        for dt in data:
            metrics.append(
                Metrics(
                    number=dt['number'],
                    score=dt['score'],
                    question=dt['question'],
                    type=dt['type'],
                    key_identifier=KeyIdentifiers.objects.get(key_identifiers_id=dt['key_identifier']),
                    answer=dt['answer'],
                    criteria=Criteria.objects.get(criteria_id=dt['criteria'])
                ))
        Metrics.objects.bulk_create(metrics)
        return Response("success")