from naac_app.models import Metrics
from rest_flex_fields import FlexFieldsModelSerializer


class MetricSerializer(FlexFieldsModelSerializer):
    class Meta:
        model = Metrics
        fields = '__all__'
