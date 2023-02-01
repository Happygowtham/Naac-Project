from naac_app.models import Criteria
from rest_flex_fields import FlexFieldsModelSerializer


class CriteriaSerializer(FlexFieldsModelSerializer):
    class Meta:
        model = Criteria
        fields = '__all__'
