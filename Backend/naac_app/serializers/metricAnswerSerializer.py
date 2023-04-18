from naac_app.models import MetricAnswer
from rest_flex_fields import FlexFieldsModelSerializer


class MetricAnswerSerializer(FlexFieldsModelSerializer):
    class Meta:
        model = MetricAnswer
        fields = '__all__'

    def to_representation(self, data):
        ret = super().to_representation(data)
        ret['year'] = {"id":data.year.id, "name": str(data.year.from_year) + "-" + str(data.year.to_year)}
        return ret