$(function(){
    $('#radioBox').find('input').on('click',function(){
        if($(this).attr('id')==='check-1'){
            $('#showArea').html('条件符合，同意培训');
        }else{
            $('#showArea').html('条件不符合，拒绝培训');            
        }
    });
});