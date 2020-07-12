#判断用户名格式是否正确或重复
import os,django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "Blog.settings")# project_name 项目名称
django.setup()
import re
from main.models import *

def utils_user_flag(name,password):
    flag = False
    sql_user = User.objects.all().values('name','password')
    for sql in sql_user:
        if sql['name']==name and sql['password']==password:
            flag=True
    return flag

def utils_name_flag(name):
    if name == '不能为空'or not name:
        return '命名不能为空'
    else:
        sql_name = User.objects.all().values('name')
        flag = 0
        for sql in sql_name:
            if sql['name']==name:
                flag = 1
        if flag == 1:
            return 'False 重复命名'
        else:
            if name[0].isalpha():
                name_re = re.sub('[a-zA-Z0-9_]', '', name)
                if not name_re:
                    return True
                else:
                    return 'False 格式错误'
            else:
                return 'False 请以字母开头命名'

def utils_email_flag(email):
    if email == None:
        return '邮箱不能为空'
    else:
        sql_email = User.objects.all().values('email')
        flag = 0
        for sql in sql_email:
            if sql['email'] == email:
                flag = 1
        if flag == 1:
            return '邮箱已被注册'
        else:
            if re.match(r'^[0-9a-zA-Z_]{0,19}@[0-9a-zA-Z]{1,13}\.(?:com|cn|net){1,3}$',email):
                return True
            else:
                return '邮箱格式错误'

def utils_sql_user(user_name):
    user_id = User.objects.get(name=user_name).id
    detail = User.objects.filter(id=user_id).values()
    detail1 = User_Detail.objects.filter(user_id=user_id).values()
    list(detail)[0]['join_date']=str(list(detail)[0]['join_date'])
    all_user_detail = dict(list(detail)[0],**list(detail1)[0])
    return all_user_detail



