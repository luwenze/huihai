$(function () {
    var userId = window.lu.GetQueryString("userId"); //登陆的用户Id  经销商
    var companyId = window.lu.GetQueryString("companyId"); //登陆的用户Id  经销商
    var userType;
    var trainId = window.lu.GetQueryString("trainId"); //培训id;
    var iiii = 0;
    var itemIds;

    console.log('userId===' + userId);
    console.log('companyId====' + companyId);
    console.log('userType====' + userType);
    console.log('trainId===' + trainId);



    //获取省市区id
    /*provinceId=step1.provinceId;
    cityId=step1.cityId;
    areaId=step1.areaId;
    */
    //计划id
    var planId;
    var planCompanyId;
    var planCompanyId2; //一个暂存值
    var cStr;
    var address;
    var items;
    var contactName;
    var trainPeoNum; //培训人数
    var telephone;
    var peopleNumber;
    var teacherId;
    var teacherName;
    var type = 1;
    var lvl;
    var provinceId;
    var cityId;
    var areaId;
    var itemIds;
    var step;
    var itemObj = {};
    var itemsStr = [];
    var provinceStr;
    var cityStr;
    var districtStr;


    lvl = 1; //层级


    //有计划id就是修改
    //没有计划id就是申请
    if (window.lu.GetQueryString("planId")) {
        planId = window.lu.GetQueryString("planId"); //

        initData(userId, companyId, planId);
        console.log(userId);
        console.log(companyId);
        console.log(planId);

        function initData(userId, companyId, planId) {
            var planDetailUrl = window.lu.baseUrl + "/web/train/trainPlanDetail.action";
            $.ajax({
                type: "get",
                url: planDetailUrl,
                timeout: 10000,
                data: {
                    userId: userId, //申请用户ID
                    companyId: companyId, //申请用户所在机构ID
                    planId: planId //计划ID
                },
                dataType: "json",
                success: function (response) {

                    console.log(response);
                    if (response.success) {
                        var step4 = response.data.step4;

                        var teacherName = step4.realName;
                        var trainTime = step4.trainTime;
                        var beginTime = step4.beginTime;
                        var endTime = step4.endTime;
                        var numbers = step4.numbers;
                        var trainType = step4.type;
                        var duration = step4.duration;
                        var getCityStr = step4.cityStr;
                        var trainAddress = step4.address;
                        var items = step4.items;
                        itemIds = step4.itemIds;
                        var trainCompanyName = step4.companyName;
                        var trainContactName = step4.contactName;
                        var trainTelephone = step4.telephone;
                        var trainPeopleNumber = step4.peopleNumber;
                        var createTime = step4.createTime;
                        var isEdit = step4.isEdit;
                        var state = step4.state;
                        planCompanyId = step4.planCompanyId;
                        provinceId = step4.provinceId;
                        cityId = step4.cityId;
                        areaId = step4.areaId;


                        window.lu.getProject(companyId, itemObj, itemIds);


                        //获取省市区部分
                        /*获取省市区部分  start*/
                        //获取省是固定的
                        var regionId = 0;
                        lvl = 1;
                        //alert(regionId);
                        getCity(regionId, lvl, 'province'); //获取省的  默认选中的值  的时候的样式
                        getCity(provinceId, 2, 'city');
                        getCity(cityId, 3, 'district');

                        //省市区的默认文字  参数
                        provinceStr = getCityStr.split(' ')[0];
                        cityStr = getCityStr.split(' ')[1];
                        districtStr = getCityStr.split(' ')[2];
                        console.log('districtStr============================' + districtStr);

                        //培训老师部分
                        $('#trainTeacher').val(teacherName)
                            .attr('teacherId', teacherId);
                        //培训人数部分
                        trainPeoNum = numbers;
                        $('#trainPeoNum').val(numbers);

                        //培训日期
                        $('#result0').html(trainTime);
                        yMday = trainTime.replace(/[\u4e00-\u9fa5]/gm, '\/');
                        yMday = yMday.substring(0, yMday.length - 1);
                        //培训开始时间
                        $('#result1').html(beginTime);
                        time0 = beginTime;
                        //培训结束时间
                        $('#result2').html(endTime);
                        time1 = endTime;
                        //培训持续时间
                        $('#interval').html(duration);
                        timeGap = duration;

                        //培训类型
                        console.log($('#trainType').find('option').eq(trainType - 1));
                        $('#trainType').find('option').eq(trainType - 1).attr('selected', true);
                        type = trainType;
                        console.log('============================================' + type);
                        //培训区域
                        $('#province').find('option[value=' + provinceId + ']').attr('selected', true);
                        $('#city').find('option[value=' + cityId + ']').attr('selected', true);
                        $('#district').find('option[value=' + areaId + ']').attr('selected', true);


                        //培训地点
                        $('#place').val(trainAddress);
                        address = trainAddress;




                        //培训计划机构
                        $('#companyName').val(trainCompanyName);
                        companyName = trainCompanyName;

                        //培训负责人
                        $('#manager').val(trainContactName);
                        contactName = trainContactName;

                        //联系电话
                        $('#telephone').val(trainTelephone);
                        telephone = trainTelephone;

                        //园所规模
                        $('#peopleNumber').val(trainPeopleNumber);
                        peopleNumber = trainPeopleNumber;





                    } else {
                        mui.toast(textStatus.errorstr);
                        return false;

                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    mui.toast(jqXHR);
                    mui.toast(textStatus);
                    mui.toast(errorThrown);
                },
                complete: function (XMLHttpRequest, status) { //请求完成后最终执行参数
                    startIndex = lastIndex;
                    if (status == 'timeout') { //超时,status还有success,error等值的情况
                        //ajaxTimeoutTest.abort();　　　　　
                        mui.toast('超时');
                    }　　
                }
            });
        }
    } else {
        //否则为申请
        //申请只有老师的名字
        //其他都没有默认值
        userType = window.lu.GetQueryString("userType"); //使用者类型
        //如果前面传入了老师的id
        //说明这个是通过  申请按钮获取的
        //还没有培训计划

        teacherId = window.lu.GetQueryString("teacherId"); //培训id
        //teacherName = window.lu.getCharFromUtf8(window.lu.GetQueryString("teacherName"));
        var urlStr = window.location.search.split('&');
        teacherName = urlStr[0].split('=')[1];
        teacherName = window.lu.getCharFromUtf8(teacherName);
        console.log('teacherId===' + teacherId);
        console.log('teacherName===' + teacherName);


        //省市区
        provinceId = window.lu.GetQueryString("provinceId");
        cityId = window.lu.GetQueryString("cityId");
        areaId = window.lu.GetQueryString("areaId");
        console.log(provinceId);
        console.log(cityId);
        console.log(areaId);


        //培训科目
        itemIds = '';
        window.lu.getProject(companyId, itemObj, itemIds);


        //可操作步骤值
        step = window.lu.GetQueryString("step"); //培训科目id


        var regionId = 0;
        lvl = 1;
        //alert(regionId);

        getCity(regionId, lvl, 'province'); //获取省的  默认选中的值  的时候的样式
        getCity(provinceId, 2, 'city');
        getCity(cityId, 3, 'district');
    }

    console.log('regionId======================================' + regionId);

    //科目结构
    console.log(items);


    console.log('teacherName============================================' + teacherName); //培训老师部分
    $('#trainTeacher').val(teacherName)
        .attr('teacherId', teacherId);

    //培训人数部分
    $('#trainPeoNum').on('blur', function () {
        trainPeoNum = $('#trainPeoNum').val();
    });

    //培训类型
    //类型
    $('#trainType').on('change', function () {
        type = this[this.selectedIndex].value;
    });

    //培训地点
    $('#place').on('blur', function () {
        address = $('#place').val();
    });


    //负责人
    $('#manager').on('blur', function () {
        contactName = $('#manager').val();
    });

    //联系电话
    $('#telephone').on('blur', function () {
        telephone = $('#telephone').val();
    })

    //园所规模
    $('#peopleNumber').on('blur', function () {
        peopleNumber = $('#peopleNumber').val();
    });





    //培训类型
    //从前面传过来的值
    //$('#trainType')[$('#trainType').selectedIndex].val();



    //培训时长  
    //在  培训时间部分





    //获取市根据省来决定
    $('#province').on('change', function () {
        regionId = this[this.selectedIndex].value;
        lvl = 2;
        getCity(regionId, lvl, 'city');
    });

    //获取区根据市来决定
    $('#city').on('change', function () {
        regionId = this[this.selectedIndex].value;
        lvl = 3;
        getCity(regionId, lvl, 'district');
    });

    function getCity(regionId, lvl, objId) {
        iiii++;
        console.log('iiii=======================================================================' + iiii);
        console.log('regionId========================' + regionId);
        console.log('lvl========================' + lvl);
        console.log('objId========================' + objId);
        var areaUrl = window.lu.baseUrl + '/web/train/getCity.action';
        $.ajax({
            type: "get",
            url: areaUrl,
            timeout: 10000,
            data: {
                id: regionId,
                lvl: lvl
            },
            dataType: "json",
            success: function (response) {
                if (!response.success) {
                    mui.toast(textStatus.errorstr);
                    return false;
                }
                var data = response.data.listData;
                $('#' + objId).html('<option value="">请选择</option>');
                $.each(data, function (i, v) {
                    var str = '';
                    if (objId === 'province' && v.id === provinceId) {
                        str = '<option value="' + v.id + '" selected>' + v.city + '</option>';
                    } else if (objId === 'city' && v.id === cityId) {
                        str = '<option value="' + v.id + '" selected>' + v.city + '</option>';
                    } else if (objId === 'district' && v.id === areaId) {
                        str = '<option value="' + v.id + '" selected>' + v.city + '</option>';
                    } else {
                        str = '<option value="' + v.id + '">' + v.city + '</option>';
                    }

                    $('#' + objId).append(str);
                });
            },
            error: function (jqXHR, textStatus, errorThrown) {
                //alert();
                mui.toast(textStatus);
            },
            complete: function (XMLHttpRequest, status) { //请求完成后最终执行参数
                startIndex = lastIndex;
                if (status == 'timeout') { //超时,status还有success,error等值的情况
                    //ajaxTimeoutTest.abort();　　　　　
                    mui.toast('超时');
                }　　
            }
        });
    }
    /*获取省市区部分  end*/



    //生成页面中的科目结构
    //这个放在这里会绑定两次










    //省市区
    var city = document.getElementById('city');
    var district = document.getElementById('district');
    //获取省的id和字符
    $('#province').on('change', function () {
        provinceId = this[this.selectedIndex].value;
        provinceStr = this[this.selectedIndex].innerHTML;
    });
    $('#city').on('change', function () {
        cityId = this[this.selectedIndex].value;
        cityStr = this[this.selectedIndex].innerHTML;
    });
    $('#district').on('change', function () {
        areaId = this[this.selectedIndex].value;
        districtStr = this[this.selectedIndex].innerHTML;
    });

    //培训单位名称
    var companyName;
    $('#companyName').on('blur', function () {
        companyName = this.value;
    });

    //培训单位是否存在
    console.log('=========================================================');
    $('#companyName').on('blur', function () {
        isHaveCom();

    });



    //isHaveCom();
    function isHaveCom() {
        var companyUrl = window.lu.baseUrl + '/web/train/checkCompanyName.action';
        console.log(companyUrl);
        $.ajax({
            type: "get",
            url: companyUrl,
            timeout: 10000,
            data: {
                companyName: companyName
            },
            dataType: "json",
            success: function (response) {
                if (!response.success) {
                    mui.toast(response.errorstr);
                    return false;
                }
                console.log(response);
                data = response.data;
                console.log(data);
                //如果存在
                if (data) {
                    $('#popup').show(200);
                    flag = true;
                    $('#domBox').html('');
                    var str = '';
                    $.each(data, function (i, v) {
                        str = '<li class="mui-table-view-cell" id="' + v.id + '">' +
                            '<a class="mui-navigate-right">' +
                            v.fullname +
                            '</a>' +
                            '</li>';

                        $('#domBox').append(str);
                    });
                    //点击的时候改变planCompanyId2的值

                    $('.mui-table-view-cell').on('click', function () {
                        var htmlStr = $(this).find('a').html()
                        planCompanyId2 = $(this).attr('id');
                        companyName = htmlStr;
                        $('#companyName').val(htmlStr);
                    });

                    //点击使用关闭，修改值
                    $('#use').off('click').on('click', function () {
                        planCompanyId = planCompanyId2;
                        console.log(planCompanyId)
                        $('#popup').hide(200);
                    });
                    //点击不使用关闭，不修改值
                    $('#noUse').off('click').on('click', function () {
                        console.log(planCompanyId)
                        $('#popup').hide(200);
                    });

                    $('#againSelect').show();
                    $('#againSelect').on('click', function () {

                        $('#popup').show(200);
                    });


                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                //alert();
                mui.toast(textStatus);
            },
            complete: function (XMLHttpRequest, status) { //请求完成后最终执行参数
                startIndex = lastIndex;
                if (status == 'timeout') { //超时,status还有success,error等值的情况
                    //ajaxTimeoutTest.abort();　　　　　
                    mui.toast('超时');
                }　　
            }
        });
    }



    console.log('itemIds============================' + itemIds);


    var flag = false; //假设不存在

    $('#planSub').on('click', function () {

        //城市文本用空格分隔
        cStr = provinceStr + ' ' + cityStr + ' ' + districtStr;

        //培训日期
        yMday = $('#result0').html();
        yMday = yMday.replace(/[\u4e00-\u9fa5]/gm, '\/');
        yMday = yMday.substring(0, yMday.length - 1);
        console.log(yMday);

        //培训时间
        time0 = $('#result1').html();
        time1 = $('#result2').html();

        //培训地点
        address = $('#place').val();



        //培训科目文字为
        itemsStr = [];
        itemIdsStr = [];
        var aList = $('#delete').find('.add').prevAll('li').find('a');
        $.each(aList, function (i, v) {
            itemsStr.push($(v).html());
            itemIdsStr.push($(v).parent('li').attr('id'));
        });



        itemsStr = itemsStr.join(',');
        itemIdsStr = itemIdsStr.join(',');
        console.log(itemsStr);

        console.log('userId============================' + userId);
        console.log('trainId============================' + trainId);
        console.log('planId============================' + planId);
        console.log('companyId============================' + companyId);
        console.log('planCompanyId============================' + planCompanyId);
        console.log('trainPeoNum============================' + trainPeoNum);
        console.log('yMday============================' + yMday);
        console.log('time0============================' + time0);
        console.log('time1============================' + time1);
        console.log('timeGap============================' + timeGap);
        console.log('type============================' + type);
        console.log('provinceId============================' + provinceId);
        console.log('cityId============================' + cityId);
        console.log('areaId============================' + areaId);
        console.log('cStr============================' + cStr);
        console.log('address============================' + address);
        console.log('itemIdsStr============================' + itemIdsStr);
        console.log('itemsStr============================' + itemsStr);
        console.log('companyName============================' + companyName);
        console.log('contactName============================' + contactName);
        console.log('telephone============================' + telephone);
        console.log('peopleNumber============================' + peopleNumber);


        //进行表单验证
        //参训人数
        if (!trainPeoNum) {
            mui.toast('请输入参训人数');
            return false;
        }
        //时间验证
        var myDate = new Date();

        if (new Date(yMday) < myDate) {
            mui.toast('请输入以后的日期');
            return false;
        }
        if (!timeGap) {
            mui.toast('请输入正确的时间');
        } else if (timeGap <= 0) {
            mui.toast('请输入正确的时间');
        }

        //省市区
        if (!provinceStr) {
            mui.toast('请选择省');
            return false;
        }
        if (!cityStr) {
            mui.toast('请选择市');
            return false;
        }
        if (!districtStr) {
            mui.toast('请选择区');
            return false;
        }
        if (!address) {
            mui.toast('请填写具体地址');
            return false;
        }
        if (!itemIdsStr) {
            mui.toast('请选择培训科目');
            return false;
        }
        if (!companyName) {
            mui.toast('请输入培训单位');
            return false;
        }
        if (!contactName) {
            mui.toast('请输入负责人名称');
            return false;
        }
        if (!contactName) {
            mui.toast('请输入负责人名称');
            return false;
        }
        var myreg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
        if (!myreg.test(telephone)) {
            mui.toast('请输入正确的手机号码');
            return false;
        }
        if (!peopleNumber) {
            mui.toast('请输入园所规模');
            return false;
        }

        console.log(1);
        subAjax();
    });

    function subAjax() {
        console.log(type);
        console.log(planId);
        var planSubUrl = window.lu.baseUrl + '/web/train/saveTrainPlan.action';
        $.ajax({
            type: "get",
            url: planSubUrl,
            timeout: 10000,
            data: {
                userId: userId, //用户ID
                trainId: trainId, //培训ID
                planId: planId, //计划id
                companyId: companyId, //机构ID
                planCompanyId: planCompanyId, //培训计划机构ID
                numbers: trainPeoNum, //培训人数
                trainTime: yMday, //培训日期
                beginTime: time0, //开始时间
                endTime: time1, //结束时间
                duration: timeGap, //时长
                type: type, //培训类型
                provinceId: provinceId, //省份ID
                cityId: cityId, //城市ID
                areaId: areaId, //区域ID
                cityStr: cStr, //城市文本空格分隔
                address: address, //培训地点
                itemIds: itemIdsStr, //培训科目ID，多个逗号
                items: itemsStr, //培训科目文本，多个逗号
                companyName: companyName, //参训单位
                contactName: contactName, //负责人
                telephone: telephone, //联系电话
                peopleNumber: peopleNumber //园所规模
            },
            dataType: "json",
            success: function (response) {
                if (!response.success) {
                    mui.toast(textStatus.errorstr);
                    return false;
                }
                console.log(response);
                var data = response;

                if (planId) {
                    window.location.href = '../trainAudit.html?userId=' + userId + '&companyId=' + companyId + '&trainAudit=' + (4) + '&userType=' + userType + '&trainId=' + trainId + '&item.step=' + step;
                } else {
                    window.location.href = '../trainAudit.html?userId=' + userId + '&companyId=' + companyId + '&trainAudit=' + (4) + '&userType=' + userType + '&trainId=' + trainId + '&item.step=' + step;
                }

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

    }









});