var itemIds;
var items;

console.log('itemIds=====================' + itemIds);
$(function () {
    var comUrl = '/web/train/trainChargeDetermineScheme.action'; //主管确认培训方案
    var alterUrl = '/web/train/doEditTrainApply.action'; //主管修改培训方案
    var subUrl = comUrl; //默认为确认地址
    var subComUrl;

    //点击修改申请按钮显示或隐藏
    $('#showBtn').on('click', function () {
        $(this).toggleClass('change');
        $('.show').slideToggle(100);
        $('.hide').slideToggle(100);

        if (subUrl === comUrl) { //  为确认地址时
            subUrl = alterUrl; //变成修改地址
        } else { //否则为修改地址时
            subUrl = comUrl; //变成确认地址
        }
    });
    console.log('itemIds=====================' + itemIds);

    var userId = window.lu.GetQueryString("userId"); //登陆的用户Id  经销商
    var companyId = window.lu.GetQueryString("companyId"); //登陆的用户Id  经销商
    var trainAudit = window.lu.GetQueryString("trainAudit"); //登陆的用户Id  经销商
    var userType = window.lu.GetQueryString("userType"); //登陆的用户Id  经销商
    var trainId = window.lu.GetQueryString("trainId"); //登陆的用户Id  经销商





    var step = trainAudit - 1;




    var teacherId;
    var confrmRemark;
    var itemObj = {};
    var days;






    var type; //培训类型
    //蓝色框框部分内容获取
    var confirmUrl = window.lu.baseUrl + '/web/train/trainDetailByStep.action';
    console.log(confirmUrl);
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
            console.log('itemIds=====================' + itemIds);


            //step1部分  申请部分
            if (step1) {
                //console.log(step1);
                $('#applyNum').html(step1.applyNumber);
                $('#realName').html(step1.realName);
                $('#cityStr').html(step1.cityStr);
                $('#telephone').html(step1.telephone);
                console.log($('.tel'));
                console.log($('.tel')[0]);

                $('.tel').eq(0).attr('href', 'tel:' + step1.telephone);
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

                console.log('111itemIds=====================' + itemIds);
                //生成页面中的科目结构
                window.lu.getProject(companyId, itemObj, itemIds);

                console.log('115itemIds=====================' + itemIds);


                switch (step1.type) {
                    case 1:
                        $('#type').html('入园');
                        break;
                    case 2:
                        $('#type').html('大会');
                        break;
                }
                $('#remark').html(step1.remark);
                $('#createTime').html(step1.createTime);
            }

            //step2部分 资质审核部分
            if (step2) {
                //console.log(step2);

                $('#realPeo').html(step2.realName);
                $('#conTel').html(step2.telephone);
                if (step2.auditState === 2) {
                    $('.main').html('');
                    $('.blue').find('li').eq(1).addClass('auditState')
                        .find('.tel').find('img').attr('src', '../../images/icon-tel1.png')
                        .end().end()
                        .find('.alarm').find('img').attr('src', '../../images/icon-alarm1.png')
                }
                //设置备注说明默认值
                $('#auditRemark').html(step2.auditRemark);

                $('#auditTime').html(step2.auditTime);
            }

            //step3部分
            if (step3) {
                $('#editExplain').html(step3.confirmRemark);
                //获取培训老师id
                var defaultTeacherId = step3.teacherId;
                var defaultteacherName = step3.teacherName;
            }

            /*获取培训老师部分  start*/
            var getTeacherUrl = window.lu.baseUrl + '/web/train/getTrainTeacher.action?companyId=' + companyId;
            $.get(getTeacherUrl, function (response) {

                var trainTeacherList = JSON.parse(response).data.trainTeacherList;
                console.log(trainTeacherList);
                //生成teacher结构
                $.each(trainTeacherList, function (i, v) {
                    var option = document.createElement('option');
                    $(option).attr('value', v.id).html(v.realname);
                    if (v.id === defaultTeacherId) {
                        $(option).prop('selected', true);
                    }
                    $('#trainTeacher').append(option);
                    if (i == 0) {
                        teacherId = v.id;
                    }

                });
                //给结构绑定变化事件
                $('#trainTeacher').on('change', function () {
                    teacherId = +this[this.selectedIndex].value;
                    console.log('teacherId======' + teacherId);

                });



            });
            /*获取培训老师部分  end*/





            /*获取培训类型 start*/
            //预留位置
            type = step1.type; //设置培训类型默认值
            $('#trainType').find('option').eq(type - 1).prop('selected', true);
            $('#trainType').on('change', function () {
                type = this[this.selectedIndex].value;
            });
            /*获取培训类型 end*/






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




    $('#subComPro').on('click', function () {
        //1.首先有默认样式
        if (subUrl === comUrl) {
            comSub();
        } else {
            alterSub();
        }


    });
    /*确认计划部分  start*/
    function comSub() {
        subComUrl = window.lu.baseUrl + subUrl;
        confrmRemark = $('#editExplain').val();
        console.log('userId======' + userId);
        console.log('companyId======' + companyId);
        console.log('trainId======' + trainId);
        console.log('teacherId======' + teacherId);
        console.log('confrmRemark======' + confrmRemark);
        if (!confrmRemark) {
            mui.toast('请填写备注说明');
            return false;
        }
        $.ajax({
            type: "get",
            url: subComUrl,
            timeout: 10000,
            data: {
                userId: userId,
                companyId: companyId,
                id: trainId,
                teacherId: teacherId,
                confrmRemark: confrmRemark,
            },
            dataType: "json",
            success: function (response) {
                if (!response.success) {
                    mui.toast(response.errorstr);
                    return false;
                }


                if (response.success) {
                    window.location.href = '../trainAudit.html?userId=' + userId + '&companyId=' + companyId + '&trainAudit=3' + '&userType=' + userType + '&trainId=' + trainId;

                } else {
                    mui.toast(response.errorstr);
                    console.log('errorcode===============' + response.errorcode);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                //alert();

            },
            complete: function (XMLHttpRequest, status) { //请求完成后最终执行参数
                if (status == 'timeout') { //超时,status还有success,error等值的情况
                    //ajaxTimeoutTest.abort();　　　　　
                    mui.toast('超时');
                }　　
            }
        });
    }
    /*确认计划部分  end*/





    /*下方修改提交部分  start*/
    function alterSub() {
        console.log('265itemIds=====================' + itemIds);
        confrmRemark = $('#editExplain').val();
        if (!confrmRemark) {
            mui.toast('请填写备注说明');
            return false;
        }

        console.log('items======' + items);
        console.log('itemIds======' + itemIds);
        var itemsStr = items.join(',');
        var itemIdsStr = itemIds.join(',');

        days = parseInt($('#fate').html());
        console.log(days);

        subComUrl = window.lu.baseUrl + subUrl;
        $.ajax({
            type: "get",
            url: subComUrl,
            timeout: 10000,
            data: {
                userId: userId,
                companyId: companyId,
                id: trainId,
                teacherId: teacherId,
                confrmRemark: confrmRemark,
                type: type,
                beginTime: timeStr0,
                endTime: timeStr1,
                days: days,
                items: itemsStr,
                itemIds: itemIdsStr
            },
            dataType: "json",
            success: function (response) {
                if (!response.success) {
                    mui.toast(response.errorstr);
                    return false;
                }

                if (response.success) {
                    window.location.href = '../trainAudit.html?userId=' + userId + '&companyId=' + companyId + '&trainAudit=3' + '&userType=' + userType + '&trainId=' + trainId;
                } else {
                    mui.toast(response.errorstr);
                    console.log('errorcode===============' + response.errorcode);
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
    }
    /*下方修改提交部分  end*/




});