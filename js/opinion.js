$(function(){
    var str=window.location.search;
    var data=lu.getData(str);
    var taId=+data.trainAudit;
    console.log(taId);
    if(taId===1|2|3|4){
        return;
    }
    star('star0');
    star('star1');
   
    function star(idName){
        var oStar = document.getElementById(idName);

        var aLi = oStar.getElementsByTagName("li");

        var oUl = oStar.getElementsByTagName("ul")[0];

        var oSpan = oStar.getElementsByTagName("span")[1];

        var oP = oStar.getElementsByTagName("p")[0];

        var i = iScore = iStar = 0;

        for (i = 1; i <= aLi.length; i++){

            aLi[i - 1].index = i;

            

            //鼠标移过显示分数

            aLi[i - 1].onmouseover = function (){

                fnPoint(this.index);

                //浮动层显示

                oP.style.display = "block";

                //计算浮动层位置

                oP.style.left = oUl.offsetLeft + this.index * this.offsetWidth - 104 + "px";

                //匹配浮动层文字内容

                oP.innerHTML = "<em><b>" + this.index + "</b> 分 </em>";

            };

            

            //鼠标离开后恢复上次评分

            aLi[i - 1].onmouseout = function (){

                fnPoint();

                //关闭浮动层

                oP.style.display = "none"

            };

            

            //点击后进行评分处理

            aLi[i - 1].onclick = function (){

                iStar = this.index;

                oP.style.display = "none";

                oSpan.innerHTML = "<strong>" + (this.index) + " 分</strong>";

            }

        }
        //评分处理

        function fnPoint(iArg){

            //分数赋值

            iScore = iArg || iStar;

            for (i = 0; i < aLi.length; i++) aLi[i].className = i < iScore ? "on" : "";	

        }
    }


    //点击按钮提交建议反馈
    // $('#opinion').on('keyup',function(){
    //     $(this).html($(this).val());
    // });

    $('#btn').on('click',function(){
        $('#showRight').html($('#opinion').val());
        $(this).remove();        
        return false;
    });
    

});