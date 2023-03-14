from rest_framework import viewsets
from naac_app.models import User
from naac_app.serializers import UserSerializer, UserLoginSerializer, PasswordChangeSerializer, AuthUserSerializer
from ..mixins import MultipleSerializerMixin
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    search_fields = ["username", "email"]
    filter_fields = {
        'role': ['in'],
        'joc_approve_status': ['exact']
    }


class AuthViewSet(MultipleSerializerMixin, viewsets.ModelViewSet):
    queryset ={}
    permission_classes = [AllowAny]
    serializer_class = AuthUserSerializer
    serializer_classes = {
        "login": UserLoginSerializer,
        "password_change": PasswordChangeSerializer,
    }

    @action(
        methods=[
            "POST",
        ],
        detail=False,
    )
    def login(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = get_and_authenticate_user(**serializer.validated_data)
        data = self.serializer_class(user).data
        return Response(data=data, status=status.HTTP_200_OK)

    @action(
        methods=[
            "POST",
        ],
        detail=False,
        permission_classes=[
            IsAuthenticated,
        ],
    )
    def logout(self, request):
        token = Token.objects.get(user_id=request.user.id)
        logout(request)
        token.delete()
        data = {"success": "Sucessfully logged out"}
        return Response(data=data, status=status.HTTP_200_OK)

    @action(
        methods=["POST"],
        detail=False,
        permission_classes=[
            IsAuthenticated,
        ],
        url_path="change-password",
    )
    def password_change(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        request.user.set_password(serializer.validated_data["new_password"])
        request.user.save()
        return Response(status=status.HTTP_204_NO_CONTENT)