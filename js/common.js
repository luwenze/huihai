/**
 * lu方法封装
 */
(function(){
    if (!window.lu) {  
            window.lu = {};  
        };
    
    window.lu={
        getData:function(str){
            var obj = {};
            if(str.indexOf('?') != -1){         
                str = str.substr(1);
            }
            var arr = str.split('&');       
            arr.forEach(function(value,index){
                var arr1 = value.split('=');   
                obj[arr1[0]] = arr1[1];
            })
            return obj;
        },
        // backTag:function(tagName){
        //     var dom=document.querySelectorAll(tagName);

        // }
        /*培训科目  start*/
        getProject:function(id,itemObj,itemIds){

            console.log(id);
            var urlPro = 'http://192.168.0.152/web/train/getTrainItem.action'
            $.ajax({
                //async: false,
                type: "get",
                url: urlPro,
                data: {
                    applyCompanyId: id
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
                        //console.log(trainItemList[i]);
                        var str = '<li id="' + trainItemList[i].id + '">' +
                            '<a href="javascript:void(0)">' + trainItemList[i].name + '</a>' +
                            '</li>';
                        $('#option').append(str);
                    }
                    optClick();
                    deleteTag();
                    console.log(itemIds);
                    var items=itemIds.split(',');
                    console.log(items);
                    console.log(items[0]);
                    console.log(items[1]);
                    for (var j = trainItemList.length-1; j >=0 ; j--) {
                        console.log('j============'+j);
                        //console.log('trainItemList[j].id============'+trainItemList[j].id);
                        for(var k=0;k<items.length-1;k++){
                            console.log('items[i]========'+items[k]);
                            if(trainItemList[j].id==items[k]){
                                $('#option').find('li').eq(j).trigger("click");
                                continue;
                            }
                        }
                    }
                    



                    //option结构生成完毕以后，模拟触发点击事件
                    /*for(var j=0;j<trainItemList.length;j++){
                        if(){

                        }
                    }*/
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
    };
})();
    
    