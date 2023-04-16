from naac_app.models import Metrics
from rest_flex_fields import FlexFieldsModelSerializer


class MetricSerializer(FlexFieldsModelSerializer):
    class Meta:
        model = Metrics
        fields = '__all__'

    def to_representation(self, data):
        ret = super().to_representation(data)
        ret['criteria'] = {"id":data.criteria.criteria_id, "name": data.criteria.title, "number": data.criteria.number}
        ret['key_identifiers'] = {"id":data.key_identifier.key_identifiers_id, "name": data.key_identifier.title,  "number": data.key_identifier.number}
        return ret