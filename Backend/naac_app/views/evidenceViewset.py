from naac_app.models import Evidence
from naac_app.serializers import EvidenceSerializer
from rest_framework import viewsets


class EvidenceViewSet(viewsets.ModelViewSet):
    queryset = Evidence.objects.all()
    serializer_class = EvidenceSerializer
    permission_classes = []

    
    # def create(self, request, format=None):
    #     evid = Evidence.objects.filter(metrics__metric_id=request.metrics)
    #     serializer = EvidenceSerializer(data=request.data, many=many)
    #     serializer.is_valid(raise_exception=True)
    #     evidence_number = request.user # you can change here
    #     Book.objects.bulk_create(book_list)
    #     return Response({}, status=status.HTTP_201_CREATED)