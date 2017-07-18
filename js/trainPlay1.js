$(function(){
    //点击加号按钮的方法
    // 点击加好选项显示
    //加好变减号
    //加号按钮一直存在，不需要写在ajax之中
    function clickAddStyle(){
        $('#add').on('click',function(){
            $(this).toggleClass('minus');
            $('#option').toggle(200);
        });
    }

    clickAddStyle();
    
    var url='http://192.168.0.152/web/train/trainApply.action'
    $.ajax({
        type: "get",
        url: url,
        data: {
            userId:71942,
            companyId:1324
        },
        dataType: "json",
        success: function(response){
            var data=response.data;
            console.log(data);
            //保存用户信息的两个值
            var userId=data.userId;//申请用户ID
            var companyId=data.companyId;//机构ID
            $('#apNum').html(data.applyNumber);
            

        }
    });
    //选项是动态生成的，需要写在ajax之中
    //下面的选项每一个注册点击事件
    //点击时下面的选项去掉，上面新加一个
    //选项点击事件
    function optClick(){
        $('#option').find('li').on('click',function(){
                var str='<li>'
                        +'<a href="javascript:void(0)">'+$(this).find('a').html()+'</a>'
                        +'<em></em>'
                        +'</li>';
                $(this).remove();
                $(str).insertBefore('.add');
                deleteTag();
        });
    }
    optClick();

    //调用删除标签方法,也是对动态产生的结构进行修改
    deleteTag();

    // 删除标签方法
    function deleteTag(){
        $('#delete').find('li').find('em').on('click',function(){
            if($(this).parent().attr('class')==='add'){
                return;
            }
            $(this).parent().appendTo($('#option'));

            $(this).remove();
            optClick();
        });
    }


    
    
});