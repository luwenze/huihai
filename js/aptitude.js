jQuery(function () {
    jQuery('#radioBox').find('label').on('click', function () {

        if (jQuery(this).attr('class') === 'check') {
            return;
        }
        jQuery(this)
            .toggleClass('check')
            .siblings('label')
            .removeClass('check');


    });
    //初始化
    var base
    var userId = window.lu.GetQueryString("userId"); //登陆的用户Id  经销商
    var companyId = window.lu.GetQueryString("companyId"); //用户登录的机构Id	
    var trainAudit = window.lu.GetQueryString("trainAudit"); //用户登录的机构Id	
    var userType = window.lu.GetQueryString("userType"); //用户登录的机构Id	
    var trainId = window.lu.GetQueryString("trainId"); //用户登录的机构Id	
    var step = trainAudit - 1;
    var itemObj = {};
    var auditState = 1; //设置审核状态默认值



    console.log(userId);
    console.log(companyId);
    console.log(trainAudit);
    console.log(userType);
    console.log(trainId);


    var confirmUrl = window.lu.baseUrl + '/web/train/trainDetailByStep.action';
    console.log('confirmUrl=================================' + confirmUrl);

    console.log(userId);
    console.log(companyId);
    console.log(trainId);
    console.log(step);
    $.ajax({
        type: "get",
        url: confirmUrl,
        timeout: 10000,
        data: {
            userId: userId,
            companyId: companyId,
            trainId: trainId,
            step: step
        },
        dataType: "json",
        success: function (response) {
            if (!response.success) {
                mui.toast(response.errorstr);
                return false;
            }
            console.log(response);
            var data = response.data;
            console.log(data);
            var step = data.step; //就是上个页面给的step//和全局变量中的step一样
            var step1 = data.step1;
            var step2 = data.step2;
            var step3 = data.step3;
            var step4 = data.step4;



            //step1部分  申请部分
            if (step1) {
                //console.log(step1);
                $('#applyNum').html(step1.applyNumber);
                $('#realName').html(step1.realName);
                $('#cityStr').html(step1.cityStr);
                $('#telephone').html(step1.telephone);
                $('#beginTime').html(step1.beginTime);
                timeStr0 = step1.beginTime.replace(/[\u4e00-\u9fa5]/gm, '\/');
                timeStr0 = timeStr0.substring(0, timeStr0.length - 1); //设置当前申请下 存储默认开始时间
                $('#endTime').html(step1.endTime);
                timeStr1 = step1.endTime.replace(/[\u4e00-\u9fa5]/gm, '\/');
                timeStr1 = timeStr1.substring(0, timeStr1.length - 1); //设置当前申请下 存储默认结束时间
                $('#result0').html(step1.beginTime); //设置默认时间样式
                $('#result1').html(step1.endTime);
                days = step1.days;
                $('#days').html(days);
                $('#fate').html(days);
                items = step1.items.split(',');
                $('#items').html(items.join(' | '));





                itemIds = step1.itemIds;
                console.log(itemIds);
                //根据itemIds确定页面中初始选中课程
                //$('#btn').trigger("click");
                //模拟触发点击事件


                //生成页面中的科目结构
                //window.lu.getProject(companyId,itemObj,itemIds);



                switch (step1.type) {
                    case 1:
                        $('#type').html('大会1');
                        break;
                    case 2:
                        $('#type').html('大会2');
                        break;
                }
                $('#remark').html(step1.remark);
                $('#createTime').html(step1.createTime);
            }

            if (step2) {
                $('#showArea').html(step2.auditRemark);
                jQuery('#radioBox').find('label').eq(step2.auditState - 1).click();
            }



            /*获取培训类型 start*/
            //预留位置
            type = 1; //设置培训类型默认值
            $('#trainType').on('change', function () {
                type = this[this.selectedIndex].value;
            });






            /*获取培训类型 end*/






        },
        error: function (jqXHR, textStatus, errorThrown) {

        },
        complete: function (XMLHttpRequest, status) { //请求完成后最终执行参数
            if (status == 'timeout') { //超时,status还有success,error等值的情况
                ajaxTimeoutTest.abort();　　　　　
                mui.toast('超时');
            }　　
        }
    });






    $('#subApt').on('click', function () {
        var auditState = $('input:checked').val(); //审核状态
        console.log(auditState);
        var auditRemark = $('#showArea').val(); //审核备注
        console.log('auditRemark=========' + auditRemark);

        if (!auditRemark) {
            mui.toast('请填写审核备注');
            return false;
        }
        var subAptitudeUrl = 'http://192.168.0.152/web/train/qualificationInspecting.action'
        $.ajax({
            type: "get",
            url: subAptitudeUrl,
            timeout: 10000,
            data: {
                userId: userId, //申请用户ID
                companyId: companyId, //申请用户所在机构ID
                id: trainId, //培训id
                auditState: auditState, //审核状态
                auditRemark: auditRemark //审核备注
            },
            dataType: "json",
            success: function (response) {
                if (!response.success) {
                    mui.toast(textStatus.errorstr);
                    return false;
                }
                console.log(response);
                window.location.hash = '../trainAudit.html#step2';
                window.location.href = '../trainAudit.html?userId=' + userId + '&companyId=' + companyId + '&trainAudit=' + trainAudit + '&userType=' + userType + '&trainId=' + trainId;

                return false;
            },
            error: function (jqXHR, textStatus, errorThrown) {
                //alert();
                //mui.toast(textStatus);
            },
            complete: function (XMLHttpRequest, status) { //请求完成后最终执行参数
                if (status == 'timeout') { //超时,status还有success,error等值的情况
                    //ajaxTimeoutTest.abort();　　　　　
                    mui.toast('超时');
                }　　
            }
        });
    });


});