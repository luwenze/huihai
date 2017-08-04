$(function () {
    //["userId=71941", "companyId=71473", "trainAudit=3", "userType=2"]
    //将地址栏中的字符串转换为对象


    var userId = window.lu.GetQueryString("userId"); //登陆的用户Id  经销商
    var companyId = window.lu.GetQueryString("companyId"); //登陆的用户Id  经销商
    var trainAudit = window.lu.GetQueryString("trainAudit"); //登陆的用户Id  经销商
    var userType = window.lu.GetQueryString("userType"); //登陆的用户Id  经销商
    if (window.lu.GetQueryString("trainId")) {
        var trainId = window.lu.GetQueryString("trainId"); //登陆的用户Id  经销商
    }
    var step = -1;
    if (window.lu.GetQueryString("step")) {
        step = window.lu.GetQueryString("step"); //登陆的用户Id  经销商
    }



    /*console.log(searchStr);
    var userId=searchStr[0].replace(/[^0-9]/ig,"");
    var companyId=searchStr[1].replace(/[^0-9]/ig,"");
    var trainAudit=searchStr[2].replace(/[^0-9]/ig,"");
    var userType=searchStr[3].replace(/[^0-9]/ig,"");*/
    /*if(searchStr[4]){
        var trainId=searchStr[4].replace(/[^0-9]/ig,"");//计划id
    }
    var step=-1;
    if(searchStr[5]){
        step=searchStr[5].substring(10,searchStr[5].length);//是否可操作
    }*/


    console.log('================');
    console.log(userId);
    console.log(companyId);
    console.log(trainAudit);
    console.log(userType);
    console.log(trainId);
    console.log(step);





    var list = $('#gray').children('li');
    var length = list.length;

    var urldetails = '/web/train/trainDetail.action';

    var urlBystep = '/web/train/trainDetailByStep.action';

    //传过来了一个userType
    var trainAuditUrl = window.lu.baseUrl;

    var urlData = {};

    console.log(step);

    if (step == -1) {
        trainAuditUrl += urldetails; //培训详情
        urlData = {
            userId: userId, //登录的用户ID
            companyId: companyId, //用户登录的机构ID
            trainId: trainId, //计划ID
        }
    } else {
        trainAuditUrl += urlBystep; //按步骤
        urlData = {
            userId: userId, //登录的用户ID
            companyId: companyId, //用户登录的机构ID
            trainId: trainId, //计划ID
            step: step //步骤编号
        }
    }

    console.log(trainAuditUrl);
    $.ajax({
        type: "get",
        url: trainAuditUrl,
        data: urlData,
        timeout: 10000,
        dataType: "json",
        success: function (response) {
            if (!response.success) {
                mui.toast(response.errorstr);
                return false;
            }
            console.log(response.data);
            var data = response.data;
            var step1 = data.step1;
            var step2 = data.step2;
            var step3 = data.step3;
            var step4 = data.step4;



            if (step1) {
                var type = step1.type;
                var provinceId = step1.provinceId;
                var cityId = step1.cityId;
                var areaId = step1.areaId;
                var itemIds = step1.itemIds;
                console.log('step1.items=========' + step1.items);
                var str1 = '<li id="step1">' +
                    '<h3>' +
                    '<span>申请编号：</span>' +
                    '<span>' + step1.applyNumber + '</span>' +
                    '</h3>' +
                    '<div class="submit">' +
                    '<div>' +
                    '<span>申请人：&nbsp;&nbsp;&nbsp;</span>' +
                    '<span style="margin-left:0.08rem">' + step1.realName + '</span>' +
                    '</div>' +
                    '<div>' +
                    '<span>所属区域：</span>' +
                    '<span>' + step1.cityStr + '</span>' +
                    '</div>' +
                    '<div>' +
                    '<span>联系电话：</span>' +
                    '<span>' + step1.telephone + '</span>' +
                    '<a class="tel" href="tel:' + step1.telephone + '"><img src="../images/icon-tel.png" alt=""></a>' +
                    '</div>' +
                    '<div>' +
                    '<span>培训时间：</span>' +
                    '<span>' + step1.beginTime + '-' + step1.endTime + '</span>' +
                    '</div>' +
                    '<div>' +
                    '<span>培训天数：</span>' +
                    '<span>' + step1.days + '天</span>' +
                    '</div>' +
                    '<div class="lr">' +
                    '<span  class="fl">培训科目：</span>' +
                    '<span>' + step1.items.replace(/,/g, ' | ') + '</span>' +
                    '</div>' +
                    '<div>' +
                    '<span>培训类型：</span>' +
                    '<span>' + ['入园', '大会'][step1.type - 1] + '</span>' +
                    '</div>' +
                    '<div class="lr">' +
                    '<span class="fl">详细说明：</span>' +
                    '<div class="right">' + step1.remark + '</div>' +
                    '</div>' +
                    '<div class="time">' +
                    '<b class="alarm"><img src="../images/icon-alarm.png" ></b>' +
                    '<span>' + step1.createTime + '</span>' +
                    '</div>' +
                    '</div>' +
                    '</li>'
                $('#blue').html('').append(str1);
                window.location.href = '#step1';
                $('#gray').find('li').eq(0).hide();
                $('.circle').eq(0).addClass('checked');
            }

            if (step2) {
                var auditTime = step2.auditTime;
                var isEdit2 = step2.isEdit;
                var auditState = step2.auditState;
                var str2 = '<li id="step2">' +
                    '<h3>' +
                    '<span>资质审核</span>' +
                    (isEdit2 == 0 ? '' : '<a class="edit fr" href="region02/aptitude.html?userId=' + userId + '&companyId=' + companyId + '&trainAudit=' + trainAudit + '&userType=' + userType + '&trainId=' + trainId + '"><img src="../images/icon-edit.png" ></a>') +
                    '</h3>' +
                    '<div class="submit">' +
                    '<div>' +
                    '<span>审批人：&nbsp;&nbsp;&nbsp;</span>' +
                    '<span style="margin-left:0.14rem">' + step2.realName + '</span>' +
                    '</div>' +
                    '<div>' +
                    '<span>联系电话：</span>' +
                    '<span>' + step2.telephone + '</span>' +
                    '<a class="tel" href="tel:' + step2.telephone + '"><img src="../images/icon-tel.png" alt=""></a>' +
                    '</div>' +
                    '<div class="lr">' +
                    '<span class="fl">审核批注：</span>' +
                    '<div class="right">' + step2.auditRemark + '</div>' +
                    '</div>' +
                    '<div class="time">' +
                    '<b class="alarm"><img src="../images/icon-alarm.png" ></b>' +
                    '<span>' + step2.auditTime + '</span>' +
                    '</div>' +
                    '</div>' +
                    '</li>'
                $('#blue').append(str2);
                window.location.href = '#step2';
                $('#gray').find('li').eq(1).hide();
                $('.circle').eq(1).addClass('checked');
                if (auditState === 2) {
                    $('#step2').addClass('auditState');
                    $('#step2').find('.tel').find('img').attr('src', '../images/icon-tel1.png');
                    $('#step2').find('.alarm').find('img').attr('src', '../images/icon-alarm1.png');
                }
            }

            if (step3) {
                var isEdit3 = step3.isEdit;
                var teacherId = step3.teacherId;
                var teacherName = step3.teacherName;
                var str3 = '<li id="step3">' +
                    '<h3>' +
                    '<span>确定方案</span>' +
                    (isEdit3 == 0 ? '' : '<a class="edit fr" href="education03/confirmPro.html?userId=' + userId + '&companyId=' + companyId + '&trainAudit=' + trainAudit + '&userType=' + userType + '&trainId=' + trainId + '"><img src="../images/icon-edit.png" ></a>') +
                    '</h3>' +
                    '<div class="submit">' +
                    '<div>' +
                    '<span>审批人：&nbsp;&nbsp;&nbsp;</span>' +
                    '<span style="margin-left:0.14rem">' + step3.realName + '</span>' +
                    '</div>' +
                    '<div>' +
                    '<span>联系电话：</span>' +
                    '<span>' + step3.telephone + '</span>' +
                    '<a class="tel" href="tel:' + step3.telephone + '"><img src="../images/icon-tel.png" alt=""></a>' +
                    '</div>' +
                    '<div class="lr">' +
                    '<span class="fl">审核批注：</span>' +
                    '<div class="right">' + step3.confirmRemark + '</div>' +
                    '</div>' +
                    '<div class="time">' +
                    '<b class="alarm"><img src="../images/icon-alarm.png" ></b>' +
                    '<span>' + step3.confirmTime + '</span>' +
                    '</div>' +
                    '</div>' +
                    '</li>';
                $('#blue').append(str3);
                window.location.href = '#step3';
                $('#gray').find('li').eq(2).hide();
                $('.circle').eq(2).addClass('checked');
            }

            if (step4) {
                var isEdit4 = step4.isEdit;
                var isApply = step4.isApply;
                //var isApply;//只是实验，之后要删掉
                var str4one = '<li id="step4">' +
                    '<h3>' +
                    '<span>培训计划</span>' +
                    '</h3>' +
                    '<div class="submit msgList">' +
                    '<h3>' +
                    '<em class="applyman"></em>' +
                    '<span>培训讲师：' + step4.realName + '</span>' +
                    '</h3>' +
                    '<h3>' +
                    '<em class="applylist"></em>' +
                    '<span>培训信息表单</span>' +
                    '</h3>' +
                    '<ul class="mui-table-view mui-table-view-striped mui-table-view-condensed">';

                var str4two = '';
                if (step4.planList) {
                    str4two = $.map(step4.planList, function (v, i) {
                        console.log(i);
                        var trainId = v.trainId;
                        var planId = v.planId;
                        var strList = '<li class="list">' +
                            '<a href="./formDetails.html?userId=' + userId + '&companyId=' + companyId + '&trainAudit=' + trainAudit + '&userType=' + userType + '&trainId=' + trainId + '&planId=' + planId + '"></a>' +
                            '<div class="mui-table table">' +
                            '<div class="mui-table-cell mui-col-xs-10">' +
                            '<h4 class="mui-ellipsis">' + v.companyName + '</h4>' +
                            '<p class="mui-h6 mui-ellipsis time">' + v.trainTime + ' ' + v.beginTime + '</p>' +
                            '</div>' +
                            '<div class="mui-table-cell mui-col-my mui-text-right">' +
                            '<span class="mui-h5 my-h5 blue">' + (v.state == 0 ? '【待培训】' : (v.state == 1 ? '【待评价】' : '【已完成】')) + '</span>' +
                            '</div>' +
                            '</div>' +
                            '</li>'
                        console.log(v);
                        return strList;

                    }).join('');
                }

                var str4three = (isApply == 0 ? '' :
                        '<form class="check ischeck">' +
                        '<input type="checkbox" name="" value="" class="checkBox" id="checkBox">' +
                        '<span><em id="em"></em>培训老师根据培训场次提交培训信息表单。</span>' +
                        '<button type="submit" onclick="return false" id="createBtn"><em></em>生成表单</button>' +
                        '</form>') +
                    '</ul>' +
                    '</div>' +
                    '</li>'
                var str4 = str4one + str4two + str4three;
                $('#blue').append(str4);
                window.location.href = '#step4';
                console.log($('#gray').find('li').eq(3));
                $('#gray').find('li').eq(3).hide();
                $('.circle').eq(3).addClass('checked');
                if (isApply != 0) {
                    $('#checkBox').on('click', function () {
                        $('.check').toggleClass('ischeck');
                        if ($('#createBtn').prop('disabled') == true) {
                            $('#createBtn').prop('disabled', false);
                        } else {
                            $('#createBtn').prop('disabled', true);
                        }
                    });
                }
                console.log('teacherName====================' + encodeURI(teacherName));
                $('#createBtn').on('click', function () {
                    window.location.href = 'teacher04/trainPlay.html?teacherName=' + teacherName + '&userId=' + userId + '&companyId=' + companyId + '&userType=' + userType + '&trainId=' + trainId + '&teacherId=' + teacherId + '&type=' + type + '&provinceId=' + provinceId + '&cityId=' + cityId + '&areaId=' + areaId + '&itemIds=' + itemIds + '&step=' + step;
                });
            }
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