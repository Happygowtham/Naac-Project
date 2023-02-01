from naac_app.models import Criteria
from naac_app.serializers import CriteriaSerializer
from rest_framework.viewsets import ModelViewSet


class CriteriaViewSet(ModelViewSet):
    queryset = Criteria.objects.all()
    serializer_class = CriteriaSerializer
    search_fields = ['name']
