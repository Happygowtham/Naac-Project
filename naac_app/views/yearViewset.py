from naac_app.models import Year
from naac_app.serializers import YearSerializer
from rest_framework import viewsets


class YearViewSet(viewsets.ModelViewSet):
    queryset = Year.objects.all()
    serializer_class = YearSerializer
    permission_classes = []
