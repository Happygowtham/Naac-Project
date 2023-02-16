from naac_app.models import Location
from rest_flex_fields import FlexFieldsModelSerializer


class LocationSerializer(FlexFieldsModelSerializer):
    class Meta:
        model = Location
        fields = '__all__'
