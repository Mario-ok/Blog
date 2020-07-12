function load_data() {
    if(login_flag=='0'){
        login_button = "<img id=\"head_img\" src='/static/img/head.jpg'>\n" +
            "        <button id=\"login\" onclick=\"window.location.href='/login'\">登录</button>\n" +
            "        <button id=\"register\" onclick=\"window.location.href='/register'\">注册</button>";
        $('#r1').html(login_button)
    }else {
        console.log(login_name);
        console.log(login_flag);
        login_button = "<img id=\"head_img\" src='/static/img/login.png'>\n" +
            "<a id='user' href='/user_detail/'>"+login_name+"</a>" +
            "<button id='quit' onclick=\"window.location.href='/quit'\">退出</button>";
        $('#r1').html(login_button)
    }
    $('#detail_l_base').css('background','red');
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
}
