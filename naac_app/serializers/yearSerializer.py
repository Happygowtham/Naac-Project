from naac_app.models import Year
from rest_flex_fields import FlexFieldsModelSerializer
from rest_framework import serializers


class YearSerializer(FlexFieldsModelSerializer):
    class Meta:
        model = Year
        fields = '__all__'

    def validate(self, attrs):
        is_active_year = attrs.get("is_active_year",False)
        if (Year.objects.filter(is_active_year=True) and is_active_year):
            raise serializers.ValidationError("More than one year can't be active.")
        return super(YearSerializer,self).validate(attrs)

