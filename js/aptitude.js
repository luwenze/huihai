
$(function(){
    alert(1)
    $('#radioBox').find('label').on('click',function(){
        alert(2);
        
        if($(this).attr('class')==='check'){
            return;
        }
        $(this)
            .toggleClass('check')
            .siblings('label')
            .removeClass('check');
        if($(this).attr('for')==='radio1'){
            $('#showArea').html('条件符合，同意培训');
        }else if($(this).attr('for')==='radio2'){
            $('#showArea').html('条件不符合，拒绝培训');
        }

    });
    
});