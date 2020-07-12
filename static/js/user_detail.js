function detail_l_list(data) {
    if(data == 1){
        $('#detail_l_base').css('background','red');
        $('#detail_l_blog').css('background','#999');
        $('#detail_l_fan').css('background','#999');
        $('#detail_l_love').css('background','#999');
        $.ajax({
            url:'/sql_detail_user/',
            timeout:'10000',
            async:false,
            type:'GET',
            data:{'login_name':login_name},
            success:function (sql_data) {
                if(sql_data['sex']==null){sex = '';}else {sex = sql_data['sex']}
                if(sql_data['age']==null){age = ''}else {age = sql_data['age']}
                if(sql_data['work']==null){work = ''}else {work = sql_data['work']}
                if(sql_data['personal_profile']==null){personal_profile = ''}else {personal_profile = sql_data['personal_profile']}
                detail_base = "<div id=\"detail_c_head\"><img style=\"height: 50px;width: 50px\" src=\"../static/img/head.jpg\">编辑头像</div>\n" +
        "        <div id=\"detail_c_right\">\n" +
        "            <div style='float: left;width: 90%;'>姓名：<span>"+sql_data['name'] +"</span></div><button onclick='editor()' id='editor' style='float: right'>修改</button>\n" +
        "            <div>email：<span>"+sql_data['email'] +"</span></div>\n" +
        "            <div>性别：<span>"+ sex +"</span></div>\n" +
        "            <div>年龄：<span>"+age +"</span></div>\n" +
        "            <div>职业：<span>"+work +"</span></div>\n" +
        "            <div>加入时间：<span>"+sql_data['join_date'] +"</span></div>\n" +
        "            <div>个人简介：<span>"+personal_profile +"</span></div>\n" +
        "        </div>";
        $('#detail_c').html(detail_base)
            }
        });

    }else if (data==2){
        $('#detail_l_base').css('background','#999');
        $('#detail_l_blog').css('background','red');
        $('#detail_l_fan').css('background','#999');
        $('#detail_l_love').css('background','#999');
        $('#detail_c').text('hahahha')
    }else if(data==3){
        $('#detail_l_base').css('background','#999');
        $('#detail_l_blog').css('background','#999');
        $('#detail_l_fan').css('background','red');
        $('#detail_l_love').css('background','#999');
    }else if(data==4){
        $('#detail_l_base').css('background','#999');
        $('#detail_l_blog').css('background','#999');
        $('#detail_l_fan').css('background','#999');
        $('#detail_l_love').css('background','red');
    }
}

function editor() {
    $.ajax({
            url:'/sql_detail_user/',
            timeout:'10000',
            async:false,
            type:'GET',
            data:{'login_name':login_name},
            success:function (sql_data) {
                if(sql_data['sex']==null){sex = ''}else {sex = sql_data['sex']}
                if(sql_data['age']==null){age = ''}else {age = sql_data['age']}
                if(sql_data['work']==null){work = ''}else {work = sql_data['work']}
                if(sql_data['personal_profile']==null){personal_profile = ''}else {personal_profile = sql_data['personal_profile']}
                detail_base = "<div id=\"detail_c_head\"><img style=\"height: 50px;width: 50px\" src=\"../static/img/head.jpg\">编辑头像</div>\n" +
        "        <div id=\"detail_c_right\">\n" +
        "            <form action='/editor_save' method='get'>"+
        "            <div style='float: left;width: 100%;'>姓名：<span id='name' name='name'> "+ sql_data['name']+"</span></div>\n" +
        "            <div>email：<span id='email' name='email'>"+ sql_data['email']+"</span></div>\n" +
        "            <div>性别：<input name='sex' placeholder='' value="+ sex+" ></div>\n" +
        "            <div>年龄：<input name='age' placeholder='' value="+ age+" ></div>\n" +
        "            <div>职业：<input name='work' placeholder='' value="+ work+" ></div>\n" +
        "            <div>加入时间：<span>"+ sql_data['join_date']+"</span></div>\n" +
        "            <div>个人简介：<input name='personal_profile' placeholder='' value="+ personal_profile+" ></div>\n" +
        "            <button type='submit'>保存</button>"+ editor_check+"</form>"+
        "        </div>";
        $('#detail_c').html(detail_base)
            }
        })
}