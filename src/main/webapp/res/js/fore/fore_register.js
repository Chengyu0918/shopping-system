$(function () {
    // 刷新下拉框
    $('#select_user_address_province').selectpicker('refresh');
    $('#select_user_address_city').selectpicker('refresh');
    $('#select_user_address_district').selectpicker('refresh');

    // 当选择省份时
    $('#select_user_address_province').change(function () {
        $.ajax({
            type: "GET",
            url: "/tmall/address/" + $(this).val(),
            data: null,
            dataType: "json",
            success: function (data) {
                $(".loader").hide();
                if (data.success) {
                    // 清空城市和区域选项
                    $("#select_user_address_city").empty();
                    $("#select_user_address_district").empty();

                    // 填充城市选项
                    for (var i = 0; i < data.addressList.length; i++) {
                        var address_id = data.addressList[i].address_areaId;
                        var address_name = data.addressList[i].address_name;
                        $("#select_user_address_city").append("<option value='" + address_id + "'>" + address_name + "</option>");
                    }

                    // 填充区域选项
                    for (var j = 0; j < data.childAddressList.length; j++) {
                        var childAddress_id = data.childAddressList[j].address_areaId;
                        var childAddress_name = data.childAddressList[j].address_name;
                        $("#select_user_address_district").append("<option value='" + childAddress_id + "'>" + childAddress_name + "</option>");
                    }

                    // 刷新城市和区域下拉框
                    $('#select_user_address_city').selectpicker('refresh');
                    $("#select_user_address_district").selectpicker('refresh');

                    // 更新页面显示的选项
                    $("span.address-province").text($("#select_user_address_province").find("option:selected").text());
                    $("span.address-city").text($("#select_user_address_city").find("option:selected").text());
                    $("span.address_district").text($("#select_user_address_district").find("option:selected").text());
                } else {
                    alert("加载地区信息失败，请刷新页面再试！");
                }
            },
            beforeSend: function () {
                $(".loader").show();
            },
            error: function () {
                alert("加载地区信息失败，请刷新页面再试！");
            }
        });
    });

    // 当选择城市时
    $("#select_user_address_city").change(function () {
        $.ajax({
            type: "GET",
            url: "/tmall/address/" + $(this).val(),
            data: null,
            dataType: "json",
            success: function (data) {
                $(".loader").hide();
                if (data.success) {
                    // 清空区域选项
                    $("#select_user_address_district").empty();

                    // 填充区域选项
                    for (var i = 0; i < data.addressList.length; i++) {
                        var address_id = data.addressList[i].address_areaId;
                        var address_name = data.addressList[i].address_name;
                        $("#select_user_address_district").append("<option value='" + address_id + "'>" + address_name + "</option>");
                    }

                    // 刷新区域下拉框
                    $('#select_user_address_district').selectpicker('refresh');

                    // 更新页面显示的选项
                    $("span.address-city").text($("#select_user_address_city").find("option:selected").text());
                    $("span.address_district").text($("#select_user_address_district").find("option:selected").text());
                } else {
                    alert("加载地区信息失败，请刷新页面再试！");
                }
            },
            beforeSend: function () {
                $(".loader").show();
            },
            error: function () {
                alert("加载地区信息失败，请刷新页面再试！");
            }
        });
    });

    // 当选择区域时，更新页面显示
    $("#select_user_address_district").change(function () {
        $("span.address_district").text($(this).find("option:selected").text());
    });

    // 当输入详细地址时，同步显示在页面上
    $("#textarea_details_address").bind('input propertychange', function () {
        $(".address_details").text($(this).val());
    });

    // 当用户名输入框获得焦点时
    $("#user_name").focus(function () {
        $(this).css("border", "1px solid #3879D9")
            .next().text("请输入用户名").css("display", "inline-block").css("color", "#00A0E9");
    });

    // 当密码输入框获得焦点时
    $("#user_password").focus(function () {
        $(this).css("border", "1px solid #3879D9")
            .next().text("请输入密码").css("display", "inline-block").css("color", "#00A0E9");
    });

    // 当再次输入密码框获得焦点时
    $("#user_password_one").focus(function () {
        $(this).css("border", "1px solid #3879D9")
            .next().text("请再次输入密码").css("display", "inline-block").css("color", "#00A0E9");
    });

    // 当昵称输入框获得焦点时
    $("#user_nickname").focus(function () {
        $(this).css("border", "1px solid #3879D9")
            .next().text("请输入昵称").css("display", "inline-block").css("color", "#00A0E9");
    });

    // 当出生日期输入框获得焦点时
    $("#user_birthday").focus(function () {
        $(this).css("border", "1px solid #3879D9")
            .next().text("请输入出生日期").css("display", "inline-block").css("color", "#00A0E9");
    });

    // 当输入框失去焦点时，恢复默认样式
    $(".form-text").blur(function () {
        $(this).css("border-color", "#cccccc")
            .next().css("display", "none");
    });

    // 非空验证和密码格式验证
    $("#register_sub").click(function () {
        var user_name = $.trim($("input[name=user_name]").val());
        var user_password = $.trim($("input[name=user_password]").val());
        var user_password_one = $.trim($("input[name=user_password_one]").val());
        var user_nickname = $.trim($("input[name=user_nickname]").val());
        var user_birthday = $.trim($("input[name=user_birthday]").val());
        var reg = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])/);

        if (user_name == null || user_name === "") {
            $("#user_name").css("border", "1px solid red")
                .next().text("请输入用户名").css("display", "inline-block").css("color", "red");
            return false;
        } else if (user_password == null || user_password === "") {
            $("#user_password").css("border", "1px solid red")
                .next().text("请输入密码").css("display", "inline-block").css("color", "red");
            return false;
        } else if (user_password_one == null || user_password_one === "") {
            $("#user_password_one").css("border", "1px solid red")
                .next().text("请重复输入密码").css("display", "inline-block").css("color", "red");
            return false;
        } else if (!reg.test(user_password)) {
            $("#user_password").css("border", "1px solid red")
                .next().text("密码格式必须包含数字、字母和特殊字符").css("display", "inline-block").css("color", "red");
            return false;
        } else if (user_password !== user_password_one) {
            $("#user_password_one").css("border", "1px solid red")
                .next().text("两次输入密码不相同").css("display", "inline-block").css("color", "red");
            return false;
        } else if (user_nickname == null || user_nickname === "") {
            $("#user_nickname").css("border", "1px solid red")
                .next().text("请输入昵称").css("display", "inline-block").css("color", "red");
            return false;
        } else if (user_birthday == null || user_birthday === "") {
            $("#user_birthday").css("border", "1px solid red")
                .next().text("请选择出生日期").css("display", "inline-block").css("color", "red");
            return false;
        }

        // 发送注册请求
        $.ajax({
            type: "POST",
            url: "/tmall/register/doRegister",
            data: {
                "user_name": user_name,
                "user_password": user_password,
                "user_nickname": user_nickname,
                "user_birthday": user_birthday,
                "user_gender": $("input[name=user_gender]:checked").val(),
                "user_address": $("#select_user_address_district").val()
            },
            dataType: "json",
            success: function (data) {
                if (data.success) {
                    // 注册成功，显示提示消息
                    $(".msg").stop(true, true).animate({
                        opacity: 1
                    }, 550, function () {
                        $(".msg").animate({
                            opacity: 0
                        }, 1500, function () {
                            location.href = "/tmall/login";
                        });
                    });
                } else {
                    // 注册失败，显示错误消息
                    $("#user_name").css("border", "1px solid red")
                        .next().text(data.msg).css("display", "inline-block").css("color", "red");
                }
            },
            error: function (data) {
                location.reload(true);
            }
        });
    });
});
