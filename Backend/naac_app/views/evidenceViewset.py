from naac_app.models import Evidence
from naac_app.serializers import EvidenceSerializer
from rest_framework import viewsets


class EvidenceViewSet(viewsets.ModelViewSet):
    queryset = Evidence.objects.all()
    serializer_class = EvidenceSerializer
    permission_classes = []
