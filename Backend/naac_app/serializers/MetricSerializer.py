from naac_app.models import Metrics
from rest_flex_fields import FlexFieldsModelSerializer


class MetricSerializer(FlexFieldsModelSerializer):
    class Meta:
        model = Metrics
        fields = '__all__'

    def to_representation(self, data):
        ret = super().to_representation(data)
        ret['criteria'] = {"id":data.criteria.criteria_id, "name": data.criteria.title}
        ret['year'] = {"id":data.year.id, "name": str(data.year.from_year)+' - '+str(data.year.to_year)}
        return ret