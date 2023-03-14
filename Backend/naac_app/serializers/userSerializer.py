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

    def get_criteria(self, obj):
        print('obj: ', obj.access)
        data = obj.access.all()
        # serialized=UserSerializer(data, many=True)
        # return serialized.data


class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=300, required=True)
    password = serializers.CharField(required=True, write_only=True)


class AuthUserSerializer(serializers.ModelSerializer):
    auth_token = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'is_active',
                  'is_superuser', 'auth_token')
        read_only_fields = ('id', 'is_active',  'is_superuser', 'auth_token')

    def get_auth_token(self, obj):
        try:
            token = Token.objects.get(user_id=obj.id)
        except ObjectDoesNotExist:
            token = Token.objects.create(user=obj)
        return token.key


class PasswordChangeSerializer(serializers.Serializer):
    current_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)

    def validate_current_password(self, value):
        if not self.context['request'].user.check_password(value):
            raise serializers.ValidationError(
                'Current password does not match')
        return value

    def validate_new_password(self, value):
        password_validation.validate_password(value)
        return value

