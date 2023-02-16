from django.urls import include, path
from rest_framework import routers
from naac_app.views import KeyIdentifiersViewSet, CriteriaViewSet, MetricViewSet, LocationViewSet, EvidenceViewSet

router = routers.DefaultRouter()
router.register('criteria', CriteriaViewSet, basename='criteria')
router.register('key-identifiers', KeyIdentifiersViewSet,
                basename='key-identifiers')
router.register('metrics', MetricViewSet, basename='metrics')
router.register('location', LocationViewSet, basename='location')
router.register('evidence', EvidenceViewSet, basename='evidence')

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),
]
