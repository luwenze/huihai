$(function () {
    //定义公共变量
    var applyNumber;
    var companyId=72281;
    var userId=75660;
    var applyCompanyId;//先通过机构的第一项获得培训科目
    var trainType='1';//培训类型
    var itemObj={};
    var itemArr=[];
    var trainId;

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

    /*培训机构 start*/
    var urlOrg = 'http://192.168.0.152/web/train/trainApply.action'
    $.ajax({
        //async: false,
        type: "get",
        url: urlOrg,
        data: {
            userId: userId,
            companyId: companyId 
        },
        dataType: "json",
        success: function (response) {
            var dataOrg = response.data;
            console.log(dataOrg);
            //保存用户信息的两个值
            userId = dataOrg.userId; //申请用户ID
            companyId = dataOrg.companyId; //机构ID
            applyNumber=dataOrg.applyNumber;//申请编号
            $('#apNum').html(applyNumber); //动态生成用户申请编号

            //动态生成机构option项目
            var companyList = dataOrg.companyList;
            $.each(companyList, function (i, v) {
                console.log(i);
                console.log(v);
                var strOrg = '<option value="' + v.id + '" name="organization">' + v.partname + '</option>';
                $('#organization').append(strOrg);
                if(i==0){
                    applyCompanyId=v.id;//设置默认的applyCompanyId的值
                    console.log(applyNumber);
                }
            });
            console.log(applyNumber);
            
            //根据默认值加载一次
            getProject();

            $('#organization').on('change',function(){
                applyCompanyId = this.options[this.selectedIndex].value;
                console.log(applyCompanyId);
                getProject();
            });

            
        /*培训科目  start*/
            function getProject(){
                

                console.log(applyCompanyId);
                var urlPro = 'http://192.168.0.152/web/train/getTrainItem.action'
                $.ajax({
                    //async: false,
                    type: "get",
                    url: urlPro,
                    data: {
                        applyCompanyId: applyCompanyId
                    },
                    dataType: "json",
                    success: function (response) {
                        var data = response.data;


                        var trainItemList = data.trainItemList;
                        console.log(trainItemList);
                        //每次切换机构时要先清空  选中的和未选中的课程名称
                        var list=$('#delete').find('li');
                        console.log(list);
                        $.each(list,function(i,v){
                            if($(v).attr('class')=='add'){
                                return;
                            }
                            $(v).remove();
                        });
                        $('#option').html('');
                        for (var i = 0; i < trainItemList.length; i++) {
                            console.log(trainItemList[i]);
                            var str = '<li id="' + trainItemList[i].id + '">' +
                                '<a href="javascript:void(0)">' + trainItemList[i].name + '</a>' +
                                '</li>';
                            $('#option').append(str);
                        }
                        optClick();
                        deleteTag();

                    },
                    error: function (jqXHR, textStatus, errorThrown) {

                    }
                });
                //选项是动态生成的，需要写在ajax之中
                //下面的选项每一个注册点击事件
                //点击时下面的选项去掉，上面新加一个
                //选项点击事件
                optClick();

                function optClick() {
                    $('#option').find('li').on('click', fn1);
                }




                //调用删除标签方法,也是对动态产生的结构进行修改
                //$('#option').off('click');
                deleteTag();
                // 删除标签方法
                function deleteTag() {
                    $('#delete').find('li').find('em').on('click', function () {
                        if ($(this).parent().attr('class') === 'add') {
                            return;
                        }
                        //$(this).parent().appendTo($('#option'));
                        var str = '<li id="'+$(this).parent().attr('id')+'">' +
                            '<a href="javascript:void(0)">' + $(this).prev().html() + '</a>' +
                            '</li>';
                        $(this).parent().remove();
                        $('#option')
                            .append(str)
                            .find('li')
                            .off('click', fn1)
                            .on('click', fn1);
                        
                        //将移除的课程从对象中删除
                        delete itemObj[$(this).parent().attr('id')];
                        console.log(itemObj);
                        itemArr=$.map(itemObj,function(v,i){
                            console.log(i);
                            console.log(v);
                            return v;
                        });
                        console.log(itemArr);
                    });
                    
                }

                

                

                //将选项  添加到已选中部分
                function fn1() {
                    var str = '<li id="'+$(this).attr('id')+'">' +
                        '<a href="javascript:void(0)">' + $(this).find('a').html() + '</a>' +
                        '<em></em>' +
                        '</li>';
                    $(this).remove();
                    $(str).insertBefore('.add');
                    $('#delete').find('li').find('em').off('click');
                    deleteTag();

                    //将添加的课程保存到对象中
                    itemObj[$(this).attr('id')]=$(this).find('a').html();
                    console.log(itemObj);
                }

            }
        /*培训科目 end*/
            
        },
        error: function (jqXHR, textStatus, errorThrown) {

        }
    });


    /*培训机构 end*/



    /*培训类型 start*/
    console.log(trainType);
    $('#trainType').on('change',function(){
        trainType = this.options[this.selectedIndex].value;
        console.log(trainType);
    });
    /*培训类型 end*/
    
    

    /*提交培訓申請 start*/

    //点击按钮的时候出发提交事件
    $('#subApply').on('click',function(){
        //alert('提交了');
        alert(timeStr0);
        alert(timeStr1);
        console.log(applyNumber);
        var subApplyUrl='http://192.168.0.152/web/train/doTrainApply.action';
        $.ajax({
            type: "get",
            url: subApplyUrl,
            data: {
                applyNumber:applyNumber,//申请编号
                companyId:companyId,//申请用户所在机构ID
                userId:userId,//申请用户ID
                applyCompanyId:applyCompanyId,//培训机构ID
                beginTime:timeStr0,//培训开始时间
                endTime:timeStr1,//培训结束时间
                days:trainFate,//培训天数
                type:trainType,//培训类型
                remark:$('#explain').val(),//培训说明
                items:$.map(itemObj,function(v,i){return v}).join(','),//栏目名称，多个逗号
                itemIds:$.map(itemObj,function(v,i){return i}).join(',')//栏目ID，多个逗号
            },
            dataType: "json",
            success: function (response) {
                console.log(response);
                trainId=response.data;
                console.log(trainId);
                window.location.href='../trainAudit.html?trainAudit=1';
                return false;
            },
            error: function (jqXHR, textStatus, errorThrown) {
                //alert();
            }
        });
        
    });
    

    function dianji(){
        
    }
    /*提交培訓申請 end*/

});