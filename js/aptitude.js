
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
        var searchStr=window.location.search.substring(1).split('&');
        var userId=searchStr[0].replace(/[^0-9]/ig,"");
        var companyId=searchStr[1].replace(/[^0-9]/ig,"");
        var trainId=searchStr[2].replace(/[^0-9]/ig,"");
        console.log(searchStr);
        console.log(userId);
        console.log(companyId);
        console.log(trainId);
        
        $('#subApt').on('click',function(){
            var auditState=$(':checked').val();//审核状态
            var auditRemark=$('#showArea').html();//审核备注
            var subAptitudeUrl='http://192.168.0.152/web/train/qualificationInspecting.action'
            $.ajax({
                type: "get",
                url: subAptitudeUrl,
                data: {
                    userId:userId,//申请用户ID
                    companyId:companyId,//申请用户所在机构ID
                    id:trainId,//培训id
                    auditState:auditState,//审核状态
                    auditRemark:auditRemark//审核备注
                },
                dataType: "json",
                success: function (response) {
                    console.log(response);
                    //window.location.href='../trainAudit.html?trainAudit=2';
                    return false;
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    //alert();
                }
            });
        });

        
});