from django.http import JsonResponse
from naac_app.models import Criteria, KeyIdentifiers, Metrics, Evidence

def progress_view(request):
    criteria_data = {}
    identifier_data = {}
    for criteria in Criteria.objects.all():
        identifier_per = []
        for identifier in KeyIdentifiers.objects.filter(criteria=criteria):
            metrics_all = Metrics.objects.filter(key_identifier=identifier)
            availed_metrics = set(list(Evidence.objects.filter(metrics__in=metrics_all).values_list("metrics__metric_id",flat=True)))
            try:
                identi_per = (len(availed_metrics)/len(metrics_all)) * 100
            except:
                identi_per = 0
            identifier_per.append(identi_per)
            identifier_data.update({identifier.key_identifiers_id: identi_per})
        print(identifier_per)
        try:
            cri_per = (sum(identifier_per)/(len(identifier_per) * 100)) * 100
        except:
            cri_per = 0
        criteria_data.update({criteria.criteria_id:cri_per })
    return JsonResponse({"identifier": identifier_data, "criteria":criteria_data})
