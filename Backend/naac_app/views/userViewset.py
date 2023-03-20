from rest_framework import viewsets
from naac_app.models import User
from naac_app.serializers import UserSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    search_fields = ["username", "email"]
    filter_fields = {
        'role': ['in'],
        'joc_approve_status': ['exact']
    }
