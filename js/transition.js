$(function(){
    var userId=window.lu.GetQueryString("userId");//登陆的用户Id  经销商
    var companyId=window.lu.GetQueryString("companyId");//
    var transitionUrl = window.lu.baseUrl+'/web/train/checkType.action';

    $(document).ready(function(){
        $(".fakeloader").fakeLoader({
            timeToHide:3000,
            bgColor:"rgba(4, 166, 193,.8)",
            spinner:"spinner2"
        });
    });
    $.ajax({
        type: "get",
        url: transitionUrl,
        data: {
            userId: userId,
            companyId: companyId,
        },
        dataType: "json",
        success: function (response) {

            console.log(response);
            console.log(response.success);
            if(response.success){
                var data=response.data;
                console.log(data);
                console.log(data.userType);
                var userType=data.userType;
                var companyType=data.companyType;
                console.log(companyType);



                var inter = setTimeout(function(){
                    
                    if(companyType==8){//机构为8的时候
                        window.location.href = './trainList01.html?userId=' + userId + '&companyId=' + companyId;
                        


                    }else if(companyType==9){//机构为9的时候
                        window.location.href = 'kindergarten05/trainList05.html?userId=' + userId + '&companyId=' + companyId;


                    }else if(companyType==1){
                        if(data.userType==3){
                            window.location.href = 'teacher04/trainList04.html?userId=' + userId + '&companyId=' + companyId;
                        }else{
                            window.location.href = './trainList01.html?userId=' + userId + '&companyId=' + companyId;
                        }

                    }
                },3000);
                


            }else{
                mui.toast(response.errorstr);
                //console.log('errorcode==============='+response.errorcode);
            }


        },
        error: function (jqXHR, textStatus, errorThrown) {
            //alert();
            //mui.toast(textStatus);
        }
    });
    
});