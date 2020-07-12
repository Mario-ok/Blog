function name_blur(){
    var name = document.getElementById('name');
    if(name.value == ''){
        var data = {'n': '不能为空'};
    }else {
         data = {'n':name.value};
    }
    $.ajax({
        url:'/name_flag/',
        async:false,
        timeout:'10000',
        data:data,
        type:'GET',
        success:function (data) {
            $('#name_flag').text(data)
        }
    })
}

function password_blur() {
    var password = document.getElementById('password');
    var password_1 = document.getElementById('password_1');
    if(password.value == ''){
        var data = {'password':'不能为空'};
    }else {
          data = {'password':password.value,'password_1':password_1.value};
    }
    $.ajax({
        url:'/password_flag/',
        timeout:'10000',
        async: false,
        data:data,
        type:'GET',
        success:function (data) {
            if(data =='密码不能为空'){
                $('#password_flag').text(data)
            }
            else{
                $('#password_flag').text('正确');
                $('#password_1_flag').text(data)
            }


        }
    })
}

function email_blur() {
    var email = document.getElementById('email');
    var data = {'email':email.value};
    $.ajax({
        url:'/email_flag/',
        type:'GET',
        timeout:'10000',
        data : data,
        async:false,
        success:function (data) {
            $('#email_flag').text(data)
        }
    })
}
