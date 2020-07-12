from django.db import models

# Create your models here.
class User(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=20)
    password = models.CharField(max_length=40)
    email = models.CharField(max_length=20)
    join_date = models.DateField(auto_now=True)
    class Meta():
        db_table = 'user'

class User_Detail(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    sex = models.CharField(max_length=1,null=True)
    age = models.IntegerField(null=True)
    work = models.CharField(max_length=10,null=True)
    personal_profile = models.TextField(null=True)
    class Meta():
        db_table = 'user_detail'

