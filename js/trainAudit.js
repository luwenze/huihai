$(function(){
    //将地址栏中的字符串转换为对象
    var str=window.location.search;
    var data=lu.getData(str);
    var taId=+data.trainAudit;
    console.log(taId);
    var list=$('#gray').children('li');
    var length=list.length;
    



    //不同的页面传入的id不同，跳转页面现实的内容也不一样
    for(var k=1;k<5;k++){
        console.log(k);
        if(taId===k){
            $('#flow').children('li').each(function(i,v){
                $(this).find('span').eq(0).removeClass('checked');
            });
            for(var i=0;i<k;i++){
                $('#flow').children('li').eq(i).find('span').eq(0).addClass('checked');
            }

            $('#blue').children('li').each(function(i,v){
                if(i>k-1){
                    $(this).remove();
                }
                if(i<k-1){
                    $(this).find('.edit').remove();
                }
            });
            for(var i=length-1;i>=0;i--){
                console.log(i);
                if(i<k-1){
                    console.log(i);
                    $(list).eq(i).remove();
                }
            }
            break;
        }
    }



    // if(taId===1){
    //     //去掉所有的圈圈的样式
    //     $('#flow').find('li').each(function(i,v){
    //         $(this).find('span').eq(0).removeClass('checked');
    //     });
    //     //蓝色圈圈与下面框的值对应
    //     for(var i=0;i<1;i++){
    //         $('#flow').find('li').eq(i).find('span').eq(0).addClass('checked');
    //     }

        
    //     $('#blue').find('li').each(function(i,v){
    //         if(i>0){
    //             $(this).remove();
    //         }
    //     });
    // }else if(taId===2){
    //     $('#flow').find('li').each(function(i,v){
    //         $(this).find('span').eq(0).removeClass('checked');
    //     });
    //     for(var i=0;i<2;i++){
    //         $('#flow').find('li').eq(i).find('span').eq(0).addClass('checked');
    //     }

    //     $('#blue').find('li').each(function(i,v){
    //         if(i>1){
    //             $(this).remove();
    //         }
    //     });
    //     for(var i=length-1;i>=0;i--){
    //         console.log(i);
    //         if(i<1){
    //             console.log(i);
    //             $(list).eq(i).remove();
    //         }
    //     }
    // }else if(taId===3){
    //     $('#blue').find('li').each(function(i,v){
    //         if(i>2){
    //             $(this).remove();
    //         }
    //     });
    //     for(var i=length-1;i>=0;i--){
    //         console.log(i);
    //         if(i<2){
    //             console.log(i);
    //             $(list).eq(i).remove();
    //         }
    //     }
    // }else if(taId===4){
    //     $('#blue').find('li').each(function(i,v){
    //         if(i>3){
    //             $(this).remove();
    //         }
    //     });
    //     for(var i=length-1;i>=0;i--){
    //         console.log(i);
    //         if(i<3){
    //             console.log(i);
    //             $(list).eq(i).remove();
    //         }
    //     }
    // }

});