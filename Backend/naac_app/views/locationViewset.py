from naac_app.models import Location
from naac_app.serializers import LocationSerializer
from rest_framework import viewsets


class LocationViewSet(viewsets.ModelViewSet):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer
    permission_classes = []
