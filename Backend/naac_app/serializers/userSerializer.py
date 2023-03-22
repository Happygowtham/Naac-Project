from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_flex_fields import FlexFieldsModelSerializer
# from django.contrib.auth.models import User
from rest_framework.serializers import SerializerMethodField


User = get_user_model()


class UserSerializer(FlexFieldsModelSerializer):
    role_value = serializers.ReadOnlyField(source="get_role_display")
    criteria = SerializerMethodField()

    class Meta:
        model = User
        exclude = ['last_login', 'groups',
                   'user_permissions']
        extra_kwargs = {
            'date_joined': {'read_only': True},
            'password': {'write_only': True, 'required': False}
        }
    
    def create(self, validated_data):
        user = super(UserSerializer, self).create(validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user
