from naac_app.models import Metrics
from rest_flex_fields import FlexFieldsModelSerializer
from rest_framework import serializers

class MetricSerializer(FlexFieldsModelSerializer):
    class Meta:
        model = Metrics
        fields = '__all__'

    # def validate(self, attrs):
    #     is_multi_year = attrs.get("is_multi_year",False)
    #     type = attrs.get("type","")
    #     if (type=="QLM" and is_multi_year):
    #         raise serializers.ValidationError("Type doesn't match.")
    #     return super(MetricSerializer,self).validate(attrs)


    def to_representation(self, data):
        ret = super().to_representation(data)
        ret['criteria'] = {"id":data.criteria.criteria_id, "name": data.criteria.title, "number": data.criteria.number}
        ret['key_identifiers'] = {"id":data.key_identifier.key_identifiers_id, "name": data.key_identifier.title,  "number": data.key_identifier.number}
        ret['year_options'] = data.year.values('id', 'from_year', 'to_year')
        return ret