from django.shortcuts import render,HttpResponse,redirect
from utils.user import *
import json
# Create your views here.
def main(request):
    flag = request.session.get('flag')
    if not flag:
        flag = 0
        name = '无登录'
    else:
        name = request.session.get('name')
    return render(request,'index.html',{'flag':flag,'name':name})

def login(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        password = request.POST.get('password')
        if utils_user_flag(name,password)==True:
            request.session['name']=name
            request.session['flag']='1'
            return redirect('http://127.0.0.1:8000/')
        else:
            flag = '请检查用户名或密码是否正确'
            return render(request,'login.html',{'flag':flag})
    return render(request,'login.html')

def register(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        password = request.POST.get('password')
        password_1 = request.POST.get('password_1')
        email = request.POST.get('email')
        if utils_name_flag(name)==True and password==password_1 and utils_email_flag(email)==True:
            obj = User(name=name,password=password,email=email)
            obj.save()
            user_id = User.objects.get(name=name).id
            obj1 = User_Detail(user_id=user_id)
            obj1.save()
            return redirect('/login/')
        else:
            return render(request,'register.html',{'name':name,'password':password,'password_1':password_1,'email':email,'check':'请检查格式'})
    return render(request,'register.html')

def user_detail(request):
    flag = request.session.get('flag')
    if not flag:
        flag = 0
        name = '无登录'
    else:
        name = request.session.get('name')
    return render(request,'user_detail.html',{'flag': flag, 'name': name})

def quit(request):
    request.session.flush()
    return redirect('http://127.0.0.1:8000/')

def name_flag(request):
    if request.method == 'GET':
        n = request.GET.get('n')
        if utils_name_flag(n)==True:
            return HttpResponse(json.dumps('正确'),content_type='application/json')
        else:
            return HttpResponse(json.dumps(utils_name_flag(n)),content_type='application/json')
    else:
        pass

def password_flag(request):
    if request.method == 'GET':
        password = request.GET.get('password')
        password_1 = request.GET.get('password_1')
        if password == '不能为空':
            return HttpResponse('密码不能为空')
        elif password!=password_1:
            return HttpResponse('密码不一致')
        else:
            return HttpResponse('正确')
    else:
        pass

def email_flag(request):
    if request.method == 'GET':
        email = request.GET.get('email')
        if utils_email_flag(email)==True:
            return HttpResponse('正确')
        else:
            return HttpResponse(json.dumps(utils_email_flag(email)),content_type='application/json')

def sql_detail_user(request):
    if request.method=='GET':
        ajax_name = request.GET.get('login_name')
        user_dict = utils_sql_user(ajax_name)
        return HttpResponse(json.dumps(user_dict),content_type='application/json')

def editor_save(request):
    if request.method=='GET':
        name = request.session.get('name')
        sex = request.GET.get('sex')
        age = request.GET.get('age')
        work = request.GET.get('work')
        personal_profile = request.GET.get('personal_profile')
        if age=='':
            age=None
        obj_id = User.objects.get(name=name).id
        User_Detail.objects.filter(user_id=obj_id).update(sex=sex, age=age, work=work,personal_profile=personal_profile)
    return redirect('/user_detail/')








