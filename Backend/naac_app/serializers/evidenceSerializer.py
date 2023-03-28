from naac_app.models import Evidence
from rest_flex_fields import FlexFieldsModelSerializer


class EvidenceSerializer(FlexFieldsModelSerializer):
    class Meta:
        model = Evidence
        fields = '__all__'


