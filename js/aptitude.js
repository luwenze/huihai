
jQuery(function(){
    jQuery('#radioBox').find('label').on('click',function(){
        
        if(jQuery(this).attr('class')==='check'){
            return;
        }
        jQuery(this)
            .toggleClass('check')
            .siblings('label')
            .removeClass('check');
        if(jQuery(this).attr('for')==='radio1'){
            jQuery('#showArea').html('条件符合，同意培训');
        }else if(jQuery(this).attr('for')==='radio2'){
            jQuery('#showArea').html('条件不符合，拒绝培训');
        }

    });
    
});