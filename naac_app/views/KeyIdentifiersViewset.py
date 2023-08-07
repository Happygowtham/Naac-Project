from naac_app.models import KeyIdentifiers
from naac_app.serializers import KeyIdentifiersSerializer
from rest_framework import viewsets


class KeyIdentifiersViewSet(viewsets.ModelViewSet):
    queryset = KeyIdentifiers.objects.all()
    serializer_class = KeyIdentifiersSerializer
    permission_classes = []
