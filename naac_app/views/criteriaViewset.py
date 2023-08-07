from naac_app.models import Criteria
from naac_app.serializers import CriteriaSerializer
from rest_framework import viewsets


class CriteriaViewSet(viewsets.ModelViewSet):
    queryset = Criteria.objects.all()
    serializer_class = CriteriaSerializer
    permission_classes = []
