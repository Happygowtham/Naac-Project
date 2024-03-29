from rest_framework import viewsets
from naac_app.models import User
from naac_app.serializers import UserSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    search_fields = ["username", "email"]
    filterset_fields = ['access']

    def get_queryset(self):
        qs = super().get_queryset()
        params = self.request.query_params
        if 'access_ids' in params:
            ids = [int(i) for i in params['access_ids'].split(',')]
            qs = qs.filter(access__in=ids).distinct()
        return qs