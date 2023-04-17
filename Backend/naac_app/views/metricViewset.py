from rest_framework.views import Response
from naac_app.models import Metrics, Criteria, KeyIdentifiers
from naac_app.serializers import MetricSerializer
from rest_framework import viewsets
from rest_framework.views import APIView



class MetricViewSet(viewsets.ModelViewSet):
    
    queryset = Metrics.objects.all().order_by('number')
    serializer_class = MetricSerializer
    filterset_fields = ['criteria', 'year']


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
    
    def put(self, request, *args, **kwargs):
        data = request.data
        instances = []
        for temp_dict in data:
            metric_id = temp_dict['metric_id']
            number = temp_dict['number']
            score = temp_dict['score']
            question = temp_dict['question']
            type = temp_dict['type']
            key_identifier = KeyIdentifiers.objects.get(key_identifiers_id=temp_dict['key_identifier'])
            answer = temp_dict['answer']
            criteria = Criteria.objects.get(criteria_id=temp_dict['criteria'])
            obj =Metrics.objects.get(metric_id=metric_id) # self.get_object(metric_id)
            obj.number = number
            obj.score = score
            obj.question = question
            obj.type = type
            obj.key_identifier = key_identifier
            obj.answer = answer
            obj.criteria = criteria
            obj.save()
            instances.append(obj)
        serializer = MetricSerializer(instances, many=True)
        return Response("Updated")