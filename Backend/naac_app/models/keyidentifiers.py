from django.db import models
from .criteria import Criteria
from .user import User


class KeyIdentifiers(models.Model):
    key_identifiers_id = models.AutoField(primary_key=True)
    criteria = models.ForeignKey(
        Criteria, on_delete=models.CASCADE, null=False, db_constraint=False)
    number = models.IntegerField(null=False)
    title = models.CharField(max_length=25, null=False)
    weightage = models.CharField(max_length=256)
    incharge = models.ManyToManyField(User)

    class Meta:
        db_table = "key_identifiers"

    def __str__(self):
        return str(self.number) + "-" + self.title
