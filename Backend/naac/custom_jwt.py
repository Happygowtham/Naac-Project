from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from naac_app.models import User

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        data['user'] = User.objects.values().filter(id=self.user.id)[0]
        return data

    # @classmethod
    # def get_token(cls, user):
    #     data = super().get_token(user)
    #     # Add custom claims
    #     data['user'] = User.objects.values().filter(id=user.id)[0]
    #     return data


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
