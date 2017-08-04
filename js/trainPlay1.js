$(function () {
    //从地址栏取到上个页面的值
    var userId = window.lu.GetQueryString("userId"); //登陆的用户Id  经销商
    var companyId = window.lu.GetQueryString("companyId"); //登陆的用户Id  经销商
    var userType = window.lu.GetQueryString("userType"); //登陆的用户Id  经销商
    var trainId = window.lu.GetQueryString("trainId"); //登陆的用户Id  经销商


    /*var searchStr=window.location.search.substring(1).split('&');
    var userId=searchStr[0].replace(/[^0-9]/ig,"");//用户id
    var companyId=searchStr[1].replace(/[^0-9]/ig,"");//机构id
    var userType=searchStr[2].replace(/[^0-9]/ig,"");//使用者类型
    var trainId=searchStr[3].replace(/[^0-9]/ig,"");//培训id*/





    console.log('userId===' + userId);
    console.log('companyId====' + companyId);
    console.log('userType====' + userType);
    console.log('trainId===' + trainId);

    console.log($('.triangle'));

    //默认三角变换
    //window.lu.setTriangle();



    //定义公共变量
    var applyNumber;
    var applyCompanyId; //先通过机构的第一项获得培训科目
    var trainType = '1'; //培训类型
    var itemObj = {};
    var itemArr = [];
    var trainId;


    /*培训机构 start*/
    var urlOrg = window.lu.baseUrl + '/web/train/trainApply.action'
    $.ajax({
        //async: false,
        type: "get",
        url: urlOrg,
        timeout: 10000,
        data: {
            userId: userId,
            companyId: companyId
        },
        dataType: "json",
        success: function (response) {
            if (!response.success) {
                mui.toast(response.errorstr);
                return false;
            }
            var dataOrg = response.data;
            console.log(dataOrg);
            //保存用户信息的两个值
            userId = dataOrg.userId; //申请用户ID
            companyId = dataOrg.companyId; //机构ID
            applyNumber = dataOrg.applyNumber; //申请编号
            $('#apNum').html(applyNumber); //动态生成用户申请编号

            console.log(applyNumber);
            //动态生成机构option项目
            var companyList = dataOrg.companyList;
            $.each(companyList, function (i, v) {
                console.log(i);
                console.log(v);
                var strOrg = '<option value="' + v.id + '" name="organization">' + v.partname + '</option>';
                $('#organization').append(strOrg);
                if (i == 0) {
                    applyCompanyId = v.id; //设置默认的applyCompanyId的值
                    console.log(applyNumber);
                }
            });
            console.log(applyNumber);

            //根据默认值加载一次
            window.lu.getProject(applyCompanyId, itemObj);
            //填入培训机构id,一个空的对象


            $('#organization').on('change', function () {
                applyCompanyId = this.options[this.selectedIndex].value;
                console.log(applyCompanyId);
                window.lu.getProject(applyCompanyId, itemObj);
            });








        },
        error: function (jqXHR, textStatus, errorThrown) {
            //alert();
            //mui.toast(textStatus);
        },
        complete: function (XMLHttpRequest, status) { //请求完成后最终执行参数
            startIndex = lastIndex;
            if (status == 'timeout') { //超时,status还有success,error等值的情况
                //ajaxTimeoutTest.abort();　　　　　
                mui.toast('超时');
            }　　
        }
    });


    /*培训机构 end*/



    /*提交培訓申請 start*/

    //点击按钮的时候出发提交事件
    console.log(timeStr0);
    console.log(timeStr1);
    console.log(applyNumber);
    $('#subApply').on('click', function () {
        var itemsStr = $.map(itemObj, function (v, i) {
            return v
        }).join(',');
        var itemIdsStr = $.map(itemObj, function (v, i) {
            return i
        }).join(',');
        //验证是否选择了时间
        if (!$('#fate').html()) {
            mui.toast('请选择时间');
            return false;
        }
        //验证时间是是否在之前
        console.log(timeDiffer)
        /*if($('#fate').html()-0<=0){
        }*/

        if (timeDiffer <= 0) {
            return false;
        }


        //用来验证是否选择了科目
        if (itemIdsStr === '' || itemIdsStr === '') {
            mui.toast('请选择科目');
            return false;
        }
        console.log($('#explain'));
        //验证是否提交说明
        if (!$('#explain').val()) {
            mui.toast('请填写详细说明');
            return false;
        }


        var subApplyUrl = window.lu.baseUrl + '/web/train/doTrainApply.action';
        $.ajax({
            type: "get",
            url: subApplyUrl,
            timeout: 10000,
            data: {
                applyNumber: applyNumber, //申请编号
                companyId: companyId, //申请用户所在机构ID
                userId: userId, //申请用户ID
                applyCompanyId: applyCompanyId, //培训机构ID
                beginTime: timeStr0, //培训开始时间
                endTime: timeStr1, //培训结束时间
                days: trainFate, //培训天数
                type: trainType, //培训类型
                remark: $('#explain').val(), //培训说明
                items: itemsStr, //栏目名称，多个逗号
                itemIds: itemIdsStr //栏目ID，多个逗号
            },
            dataType: "json",
            success: function (response) {
                if (!response.success) {
                    mui.toast(textStatus.errorstr);
                    return false;
                }
                console.log(response);
                trainId = response.data;
                console.log(trainId);
                window.location.href = '../trainAudit.html?userId=' + userId + '&companyId=' + companyId + '&trainAudit=1' + '&userType=' + userType + '&trainId=' + trainId;
                return false;
                //./trainAudit.html?userId='+userId+'&companyId='+companyId+'&trainAudit='+(state+1)+'&userType='+userType+'&trainId='+trainId
            },
            error: function (jqXHR, textStatus, errorThrown) {
                //alert();
                //mui.toast(textStatus);
            },
            complete: function (XMLHttpRequest, status) { //请求完成后最终执行参数
                startIndex = lastIndex;
                if (status == 'timeout') { //超时,status还有success,error等值的情况
                    //ajaxTimeoutTest.abort();　　　　　
                    mui.toast('超时');
                }　　
            }
        });


    });
    /*提交培訓申請 end*/


    /*培训类型 start*/
    console.log(trainType);
    $('#trainType').on('change', function () {
        trainType = this.options[this.selectedIndex].value;
        console.log(trainType);
    });
    /*培训类型 end*/





});