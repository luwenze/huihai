$(function(){
    //点击加号按钮的方法
    // 点击加好选项显示
    //加好变减号

    function clickAdd(){
        $('#add').on('click',function(){
            $(this).toggleClass('minus');
            $('#option').toggle(200);
        });
    }

    clickAdd();
    

    //下面的选项每一个注册点击事件
    //点击时下面的选项去掉，上面新加一个
    $('#option').find('li').on('click',function(){
        var str='<li>'
                +'<a href="javascript:void(0)">'+$(this).find('a').html()+'</a>'
                +'<em></em>'
                +'</li>';
        $(this).remove();
        $(str).insertBefore('.add');
        deleteTag();
    });


    deleteTag();

    // 删除标签方法
    function deleteTag(){
        $('#delete').find('li').find('em').on('click',function(){
            if($(this).parent().attr('class')==='add'){
                return;
            }
            $(this).parent().remove();
            
        });
    }


    
    
});