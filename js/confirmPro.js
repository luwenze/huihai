$(function(){

    //点击修改申请按钮显示或隐藏
    $('#showBtn').on('click',function(){
        $(this).toggleClass('change');
        $('.show').slideToggle(100);
        $('.hide').slideToggle(100);
    });

    var searchStr=window.location.search.substring(1).split('&');
    var userId=searchStr[0].replace(/[^0-9]/ig,"");
    var companyId=searchStr[1].replace(/[^0-9]/ig,"");
    var trainId=searchStr[2].replace(/[^0-9]/ig,"");
    var step=searchStr[3].replace(/[^0-9]/ig,"");
    var teacherId;
    var confrmRemark;
    var itemObj={};

    console.log(searchStr);
    console.log(userId);
    console.log(companyId);
    console.log(trainId);
    console.log(step);



    //蓝色框框部分内容获取
    var confirmUrl='http://192.168.0.152/web/train/trainDetailByStep.action'
    $.ajax({
        type: "get",
        url: confirmUrl,
        data: {
            userId: userId,
            companyId: companyId,
            trainId:trainId,
            step:step
        },
        dataType: "json",
        success: function (response) {
            console.log(response);
            var data=response.data;
            console.log(data);
            var step=data.step;//就是上个页面给的step
            var step1=data.step1;
            var step2=data.step2;
            var step3=data.step3;
            var step4=data.step4;



            //step1部分  申请部分
            if(step1){
                //console.log(step1);
                $('#applyNum').html(step1.applyNumber);
                $('#realName').html(step1.realName);
                $('#cityStr').html(step1.cityStr);
                $('#telephone').html(step1.telephone);
                $('#beginTime').html(step1.beginTime);
                timeStr0=step1.beginTime;//设置当前申请下 存储默认开始时间
                $('#endTime').html(step1.endTime);
                timeStr1=step1.endTime;//设置当前申请下 存储默认结束时间
                $('#result0').html(step1.beginTime);//设置默认时间样式
                $('#result1').html(step1.endTime);
                $('#days').html(step1.days);
                $('#fate').html(step1.days);
                var items=step1.items.split(',');
                $('#items').html(items.join(' | '));

                var itemIds=step1.itemIds;
                console.log(itemIds);
                //根据itemIds确定页面中初始选中课程
                //$('#btn').trigger("click");
                //模拟触发点击事件


                //生成页面中的科目结构
                window.lu.getProject(companyId,itemObj,itemIds);

                //样式
                //点击加号按钮的方法
                //点击加号选项显示
                //加好变减号
                //加号按钮一直存在，不需要写在ajax之中
                //每次绑定点击显示方法时，先解除之前的绑定
                $('#add').off('click', clickAddStyle);
                $('#add').on('click', clickAddStyle);
                
                function clickAddStyle(){
                    $('#add').toggleClass('minus');
                    $('#option').toggle(200);
                }
                
                switch(step1.type){
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

            //step2部分 资质审核部分
            if(step2){
                //console.log(step2);
                $('#realPeo').html(step2.realName);
                $('#conTel').html(step2.telephone);
                confrmRemark=step2.auditRemark;//设置备注说明默认值
                $('#auditRemark').html(confrmRemark);
                $('#editExplain').html(confrmRemark);
                
                $('#auditTime').html(step2.auditTime);
            }

            /*获取培训老师部分  start*/
            var getTeacherUrl='http://192.168.0.152/web/train/getTrainTeacher.action?companyId='+companyId;
            $.get(getTeacherUrl,function(response){
                
                var trainTeacherList=JSON.parse(response).data.trainTeacherList;
                console.log(trainTeacherList);
                //生成teacher结构
                $.each(trainTeacherList,function(i,v){
                    $('#trainTeacher').append('<option value="'+v.id+'">'+v.realname+'</option>');
                    if(i==0){
                        teacherId=v.id;
                        console.log(teacherId);
                    }
                });
                //给结构绑定变化事件
                $('#trainTeacher').on('change',function(){
                    teacherId=+this[this.selectedIndex].value;
                });
                
            });


            /*获取培训老师部分  end*/


            
            /*下方修改提交部分  start*/
            $('#subComPro').on('click',function(){
                //1.首先有默认样式
                
                console.log('userId======'+userId);
                console.log('companyId======'+companyId);
                console.log('trainId======'+trainId);
                //console.log('teacherId======'+teacherId);
                //console.log('confrmRemark======'+confrmRemark);
                //console.log('type======'+type);
                //console.log('beginTime======'+timeStr0);
                //console.log('endTime======'+timeStr1);
                //console.log('days======'+step1.days);//默认的时间间隔
                //console.log('items======'+items);
                //console.log('itemIds======'+itemIds);
                var subComUrl='http://192.168.0.152/web/train/doEditTrainApply.action';
                $.ajax({
                    type: "get",
                    url: confirmUrl,
                    data: {
                        userId: userId,
                        companyId: companyId,
                        Id:trainId,
                        teacherId:teacherId,
                        confrmRemark:confrmRemark,
                        type:type,
                        beginTime:beginTime,
                        endTime:endTime,
                        days:days,
                        items:items,
                        itemIds:itemIds
                    },
                    dataType: "json",
                    success: function (response) {
                        console.log(response);

                    },
                    error: function (jqXHR, textStatus, errorThrown) {

                    }
                });

            });

            /*下方修改提交部分  end*/

            

        },
        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
});