$(function () {


    var userId = window.lu.GetQueryString("userId"); //登陆的用户Id  经销商
    var companyId = window.lu.GetQueryString("companyId"); //登陆的用户Id  经销商
    var trainAudit = window.lu.GetQueryString("trainAudit"); //登陆的用户Id  经销商
    var userType = window.lu.GetQueryString("userType"); //登陆的用户Id  经销商
    var trainId = window.lu.GetQueryString("trainId"); //登陆的用户Id  经销商
    var planId = window.lu.GetQueryString("planId"); //登陆的用户Id  经销商
    console.log(planId);

    console.log('===============');
    console.log(userId);
    console.log(companyId);
    console.log(trainAudit);
    console.log(userType);
    console.log(trainId);


    /* var taId=+data.trainAudit;
    console.log(data);
    if(parseInt(taId)==1|2|3|4) {
        console.log("return");
        return;
    } else {
        console.log("init");
    } */



    /*var userId=data.userId;
    var companyId=data.companyId;
    var planId=data.planId
*/

    initData(userId, companyId, planId);

    star('star0');
    star('star1');

    function star(idName) {
        var oStar = document.getElementById(idName);
        if (!oStar) {
            return false;
        }
        var aLi = oStar.getElementsByTagName("li");

        var oUl = oStar.getElementsByTagName("ul")[0];

        var oSpan = oStar.getElementsByTagName("span")[1];

        var oP = oStar.getElementsByTagName("p")[0];

        var i = iScore = iStar = 0;

        for (i = 1; i <= aLi.length; i++) {

            aLi[i - 1].index = i;



            //鼠标移过显示分数

            aLi[i - 1].onmouseover = function () {

                fnPoint(this.index);

                //浮动层显示

                oP.style.display = "block";

                //计算浮动层位置

                oP.style.left = oUl.offsetLeft + this.index * this.offsetWidth - 104 + "px";

                //匹配浮动层文字内容

                oP.innerHTML = "<em><b>" + this.index + "</b> 分 </em>";

            };



            //鼠标离开后恢复上次评分

            aLi[i - 1].onmouseout = function () {

                fnPoint();

                //关闭浮动层

                oP.style.display = "none"

            };



            //点击后进行评分处理

            aLi[i - 1].onclick = function () {

                iStar = this.index;

                oP.style.display = "none";

                oSpan.innerHTML = "<strong>" + (this.index) + " 分</strong>";

            }

        }
        //评分处理

        function fnPoint(iArg) {

            //分数赋值

            iScore = iArg || iStar;

            for (i = 0; i < aLi.length; i++) aLi[i].className = i < iScore ? "on" : "";

        }
    }


    /**
     * 初始化数据
     */
    function initData(userId, companyId, planId) {

        console.log('===============================');
        console.log(planId);
        var planDetailUrl = window.lu.baseUrl + '/web/train/trainPlanDetail.action';
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

                //alert(1);

                console.log(response);
                if (response.success) {
                    var step4 = response.data.step4;

                    var teacherName = step4.realName;
                    var trainTime = step4.trainTime;
                    var beginTime = step4.beginTime;
                    var endTime = step4.endTime;
                    var numbers = step4.numbers;
                    var type = step4.type;
                    var duration = step4.duration;
                    var cityStr = step4.cityStr;
                    var address = step4.address;
                    var items = step4.items;
                    var companyName = step4.companyName;
                    var contactName = step4.contactName;
                    var telephone = step4.telephone;
                    var peopleNumber = step4.peopleNumber;
                    var createTime = step4.createTime;
                    var isEdit = step4.isEdit;
                    var state = step4.state;
                    var provinceId = step4.provinceId;
                    var cityId = step4.cityId;
                    var areaId = step4.areaId;
                    if (isEdit == 0) {
                        $(".edit").hide();
                    } else {
                        $(".edit").show().attr('href', './teacher04/trainPlay.html?userId=' + userId + '&companyId=' + companyId + '&planId=' + planId + '&trainId=' + trainId);

                    }
                    var typeTxt = "";
                    if (type == 1) {
                        typeTxt = "大会";
                    }

                    var html = '<div>' +
                        '<span>培训讲师：&nbsp;</span>' +
                        '<span>' + teacherName + '</span>' +
                        '</div>' +
                        '<div>' +
                        '<span>培训人数：&nbsp;</span>' +
                        '<span>' + numbers + '</span>' +
                        '</div>' +
                        '<div>' +
                        '<span>培训日期：&nbsp;</span>' +
                        '<span>' + trainTime + ' ' + beginTime + '-' + endTime + '</span>' +
                        '</div>' +
                        '<div>' +
                        '<span>培训类型：&nbsp;</span>' +
                        '<span>' + ['入园', '大会'][type - 1] + '</span>' +
                        '</div>' +
                        '<div>' +
                        '<span>培训时长：&nbsp;</span>' +
                        '<span>' + duration + '</span>' +
                        '</div>' +
                        '<div>' +
                        '<span>培训区域：&nbsp;</span>' +
                        '<span>' + cityStr + '</span>' +
                        '</div>' +
                        '<div class="lr">' +
                        '<span class="fl">培训地点：&nbsp;</span>' +
                        '<span>' + address + '</span>' +
                        '</div>' +
                        '<div class="lr">' +
                        '<span class="fl">培训科目：&nbsp;</span>' +
                        '<span style="padding-left:0.15rem">' + items.replace(/\,/g, ' | ') + '</span>' +
                        '</div>' +
                        '<div>' +
                        '<span>培训单位：&nbsp;</span>' +
                        '<span>' + companyName + '</span>' +
                        '</div>' +
                        '<div>' +
                        '<span>负责人：&nbsp;&nbsp;&nbsp;</span>' +
                        '<span style="margin-left:0.35rem">' + contactName + '</span>' +
                        '</div>' +
                        '<div>' +
                        '<span>联系电话：&nbsp;</span>' +
                        '<span>' + telephone + '</span>' +
                        '<a class="tel" href:"tel:' + telephone + '"><img src="../../images/icon-tel.png" alt=""></a>' +
                        '</div>' +
                        '<div>' +
                        '<span>园所规模：&nbsp;</span>' +
                        '<span>' + peopleNumber + '</span>' +
                        '</div>'

                        +
                        (isEdit == 0 ? '' : '<button type="submit" onclick="return false;" id="teaSubTrain">确认培训</button>')

                        +
                        '<div class="time">' +
                        '<b class="alarm"><img src="../../images/icon-alarm.png" ></b>' +
                        '<span>' + createTime + '</span>' +
                        '</div> '


                    var ctx = document.getElementsByClassName('submit')[0];
                    ctx.innerHTML = html;
                    console.log(planId);

                    teaSubTra(planId);

                    var step5 = response.data.step5;
                    if (step5) { //已评价
                        var ctx2 = $(".blue>li").eq(1);
                        ctx2.show();
                        console.log(step5);
                        createTime = step5.createTime;
                        var remark = step5.remark;
                        var attitudeNumber = step5.attitudeNumber; //服务态度评分
                        var qualityNumber = step5.qualityNumber;
                        html = "<div class=\"starBox\">" +
                            "<div id=\"star0\">" +
                            "<span>服务态度</span><ul>";
                        for (var i = 1; i <= 5; i++) {
                            if (i <= attitudeNumber) {
                                html += "<li class=\"on\"><a href=\"javascript:;\">" + i + "</a></li>";
                            } else {
                                html += "<li><a href=\"javascript:;\">" + i + "</a></li>";
                            }
                        }

                        html += "</ul>" +
                            "<span><strong>" + attitudeNumber + "分</strong></span><p></p></div>" +
                            "<div id=\"star1\">" +
                            "<span>服务质量</span><ul>";
                        for (var i = 1; i <= 5; i++) {
                            if (i <= qualityNumber) {
                                html += "<li class=\"on\"><a href=\"javascript:;\">" + i + "</a></li>";
                            } else {
                                html += "<li><a href=\"javascript:;\">" + i + "</a></li>";
                            }
                        }
                        html += "</ul>" +
                            "<span><strong>" + qualityNumber + "分</strong></span><p></p></div>" +
                            "</div>" +
                            "<div class=\"opi\">" +
                            "<span class=\"left\">反馈建议：</span>" +
                            "<span>" + remark + "</span>" +
                            "</div>" +
                            "<div class=\"time\">" +
                            "<b class=\"alarm\"><img src=\"../../images/icon-alarm.png\" ></b>" +
                            "<span>&nbsp;" + createTime + "</span>" +
                            "</div>";
                        ctx = document.getElementsByClassName('submit')[1];
                        ctx.innerHTML = html;
                    } else { //未评价
                        if (state == 2) {


                        } else if (state == 1) { //已培训
                            $(".main").show();
                            //$("#gray").show();

                        } else if (state == 0) {
                            $(".last>span").eq(0).removeClass("checked");

                            $("#gray").show();
                        }
                    }
                } else {
                    console.log(response.errorstr);
                }
                return false;
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert('hehehe');
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

    //点击按钮提交建议反馈
    $('#btnFeedBack').on('click', function () {
        var flag = true;
        if (flag) {
            flag = false;
            var attitudeNumber = $("#star0>span").eq(1).text().replace(/[^0-9]/ig, "");
            var qualityNumber = $("#star1>span").eq(1).text().replace(/[^0-9]/ig, "");
            var remark = $.trim($("#opinion").val());
            if (!attitudeNumber) {
                alert("请给服务态度评分");
                return false;
            }
            if (!qualityNumber) {
                alert("请给服务质量评分");
                return false;
            }
            if (!remark) {
                alert("请填写反馈建议");
                return false;
            }
            var feedBackUrl = window.lu.baseUrl + "/web/train/saveTrainPlanFeedback.action";
            $.ajax({
                type: "get",
                url: feedBackUrl,
                timeout: 10000,
                data: {
                    userId: userId, //申请用户ID
                    companyId: companyId, //申请用户所在机构ID
                    planId: planId, //计划ID
                    attitudeNumber: attitudeNumber, //服务态度评分
                    qualityNumber: qualityNumber, //服务态度质量
                    remark: remark //反馈内容
                },
                dataType: "json",
                success: function (response) {
                    if (response.success) {
                        window.location.href = 'opinion.html?userId=' + userId + '&companyId=' + companyId + '&planId=' + planId;
                    } else {
                        mui.toast(response.errorstr);
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
            })
        }
        return false;
    });


    //点击确认培训按钮确认培训
    function teaSubTra(planId) {
        $('#teaSubTrain').on('click', function () {
            var teaSubTrainUrl = window.lu.baseUrl + '/web/train/doTrainAccomplish.action';
            $.ajax({
                type: "get",
                url: teaSubTrainUrl,
                timeout: 10000,
                data: {
                    userId: userId, //申请用户ID
                    companyId: companyId, //申请用户所在机构ID
                    id: planId //计划ID
                },
                dataType: "json",
                success: function (response) {
                    if (!response.success) {
                        mui.toast(response.errorstr);
                        return false;
                    }
                    console.log(response);
                    window.location.href = 'formDetails.html?userId=' + userId + '&companyId=' + companyId + '&trainAudit=' + trainAudit + '&userType=' + userType + '&trainId=' + trainId + '&planId=' + planId;
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
        });
    }






});