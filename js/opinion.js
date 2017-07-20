$(function(){
    var str=window.location.search;
    var data=lu.getData(str);
    /* var taId=+data.trainAudit;
    console.log(data);
    if(parseInt(taId)==1|2|3|4) {
        console.log("return");
        return;
    } else {
        console.log("init");
    } */


    
    var userId=data.userId;
    var companyId=data.companyId;
    var planId=data.planId


    initData(userId, companyId, planId);
    
    star('star0');
    star('star1');
   
    function star(idName){
        var oStar = document.getElementById(idName);
        if(!oStar){
            return false;
        }
        var aLi = oStar.getElementsByTagName("li");

        var oUl = oStar.getElementsByTagName("ul")[0];

        var oSpan = oStar.getElementsByTagName("span")[1];

        var oP = oStar.getElementsByTagName("p")[0];

        var i = iScore = iStar = 0;

        for (i = 1; i <= aLi.length; i++){

            aLi[i - 1].index = i;

            

            //鼠标移过显示分数

            aLi[i - 1].onmouseover = function (){

                fnPoint(this.index);

                //浮动层显示

                oP.style.display = "block";

                //计算浮动层位置

                oP.style.left = oUl.offsetLeft + this.index * this.offsetWidth - 104 + "px";

                //匹配浮动层文字内容

                oP.innerHTML = "<em><b>" + this.index + "</b> 分 </em>";

            };

            

            //鼠标离开后恢复上次评分

            aLi[i - 1].onmouseout = function (){

                fnPoint();

                //关闭浮动层

                oP.style.display = "none"

            };

            

            //点击后进行评分处理

            aLi[i - 1].onclick = function (){

                iStar = this.index;

                oP.style.display = "none";

                oSpan.innerHTML = "<strong>" + (this.index) + " 分</strong>";

            }

        }
        //评分处理

        function fnPoint(iArg){

            //分数赋值

            iScore = iArg || iStar;

            for (i = 0; i < aLi.length; i++) aLi[i].className = i < iScore ? "on" : "";	

        }
    }


    /**
     * 初始化数据
     */
    function initData(userId, companyId, planId) {
        var planDetailUrl = "http://192.168.0.152/web/train/trainPlanDetail.action";
        $.ajax({
                type: "get",
                url: planDetailUrl,
                data: {
                    userId:userId,//申请用户ID
                    companyId:companyId,//申请用户所在机构ID
                    planId:planId//计划ID
                },
                dataType: "json",
                success: function (response) {
                    
                    console.log(response);
                    if(response.success) {
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
                        if(isEdit == 0) {
                            $(".edit").hide();
                        } else {
                            $(".edit").show();
                        }
                        var typeTxt = "";
                        if(type == 1) {
                            typeTxt = "大会";
                        }
                        var html = "<div><span>培训讲师：</span><span>"+teacherName+"</span></div>"
                                + "<div><span>培训人数：</span><span>"+numbers+"人</span></div>"
                                + "<div><span>培训日期：</span><span>"+trainTime+" "+beginTime+"-"+endTime+"</span></div>"
                                + "<div><span>培训类型：</span><span>"+typeTxt+"</span></div>"
                                + "<div><span>培训时长：</span><span>"+duration+"</span></div>"
                                + "<div><span>培训区域：</span><span>"+cityStr+"</span></div>"
                                + "<div><span>培训地点：</span><span>"+address+"</span></div>"
                                + "<div><span>培训科目：</span><span>"+items+"</span></div>"
                                + "<div><span>培训单位：</span><span>"+companyName+"</span></div>"
                                + "<div><span>负责人：</span><span>"+contactName+"</span></div>"
                                + "<div><span>联系电话：</span><span>"+telephone+" </span><b class=\"tel\">"
                                + "<img src=\"../../images/icon-tel.png\" alt=\"\"></b></div>"
                                + "<div><span>园所规模：</span><span>"+peopleNumber+"</span></div>"
                                + "<div class=\"time\"><b class=\"alarm\">"
                                + "<img src=\"../../images/icon-alarm.png\" ></b><span>"+createTime+"</span></div>";
                        
                    
                        var ctx = document.getElementsByClassName('submit')[0];
                        ctx.innerHTML = html;

                        var step5 = response.data.step5;
                        if(step5) {//已评价
                            var ctx2 = $(".blue>li").eq(1);
                            ctx2.show();
                            console.log(step5);
                            createTime = step5.createTime;
                            var remark = step5.remark;
                            var attitudeNumber = step5.attitudeNumber; //服务态度评分
                            var qualityNumber = step5.qualityNumber;
                                 html = "<div class=\"starBox\">"
                                      + "<div id=\"star0\">"
                                      + "<span>服务态度</span><ul>";
                                      for(var i = 1; i <= 5; i++ ) {
                                          if(i <= attitudeNumber){
                                             html+= "<li class=\"on\"><a href=\"javascript:;\">"+i+"</a></li>";
                                          } else {
                                             html+= "<li><a href=\"javascript:;\">"+i+"</a></li>";
                                          }
                                      }

                                html += "</ul>"
                                      + "<span><strong>"+attitudeNumber+"分</strong></span><p></p></div>"
                                      + "<div id=\"star1\">"
                                      + "<span>服务质量</span><ul>";
                                      for(var i = 1; i <= 5; i++ ) {
                                          if(i <= qualityNumber){
                                             html+= "<li class=\"on\"><a href=\"javascript:;\">"+i+"</a></li>";
                                          } else {
                                             html+= "<li><a href=\"javascript:;\">"+i+"</a></li>";
                                          }
                                      }
                                html += "</ul>"
                                      + "<span><strong>"+qualityNumber+"分</strong></span><p></p></div>"
                                      + "</div>"
                                      + "<div class=\"opi\">"
                                      + "<span class=\"left\">反馈建议：</span>"
                                      + "<span>"+remark+"</span>"
                                      + "</div>"
                                      + "<div class=\"time\">"
                                      + "<b class=\"alarm\"><img src=\"../../images/icon-alarm.png\" ></b>"
                                      + "<span>"+createTime+"</span>"
                                      + "</div>";
                            ctx = document.getElementsByClassName('submit')[1];
                            ctx.innerHTML = html;
                        } else { //未评价
                            if(state == 1) {//已培训
                                $(".main").show();
                            } else if(state == 0) {
                                $(".last>span").eq(0).removeClass("checked");
                                $("#gray").show();
                            }
                        }
                    } else {
                        alert(response.errorstr);
                        console.log(response.errorstr);
                    }
                    return false;
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    //alert();
                }
        });
    }

    //点击按钮提交建议反馈
    $('#btnFeedBack').on('click',function() {
        var flag = true;
        if(flag) {
            flag = false;
            var attitudeNumber = $("#star0>span").eq(1).text().replace(/[^0-9]/ig,"");
            var qualityNumber = $("#star1>span").eq(1).text().replace(/[^0-9]/ig,"");
            var remark = $.trim($("#opinion").val());
            if(!attitudeNumber) {
                alert("请给服务态度评分");
                return false;
            }
            if(!qualityNumber) {
                alert("请给服务质量评分");
                return false;
            }
            if(!remark) {
                alert("请填写反馈建议");
                return false;
            }
            var feedBackUrl = "http://192.168.0.152/web/train/saveTrainPlanFeedback.action";
            $.ajax({
                type: "get",
                url: feedBackUrl,
                data: {
                    userId:userId,//申请用户ID
                    companyId:companyId,//申请用户所在机构ID
                    planId:planId,//计划ID
                    attitudeNumber:attitudeNumber,//服务态度评分
                    qualityNumber:qualityNumber,//服务态度质量
                    remark:remark//反馈内容
                },
                dataType: "json",
                success: function (response) {
                    if(response.success) {
                        window.location.reload();
                    } else {
                        alert(response.errorstr);
                    }
                }
             })
        }
        return false;
    });
    

});