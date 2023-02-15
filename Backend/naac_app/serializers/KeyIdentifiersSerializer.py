from naac_app.models import KeyIdentifiers
from rest_flex_fields import FlexFieldsModelSerializer


class KeyIdentifiersSerializer(FlexFieldsModelSerializer):
    class Meta:
        model = KeyIdentifiers
        fields = '__all__'
