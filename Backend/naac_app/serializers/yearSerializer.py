from naac_app.models import Year
from rest_flex_fields import FlexFieldsModelSerializer


class YearSerializer(FlexFieldsModelSerializer):
    class Meta:
        model = Year
        fields = '__all__'
