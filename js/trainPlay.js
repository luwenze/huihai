mui.init({
			swipeBack:true //启用右滑关闭功能
		});


        //var yMday=document.getElementById('result0');//内容是后来mui生成的，所以取不到
        var yMday='2017/12/12';
        var time0='12:00';
        var time1='12:00';
        var timeGap='';
        console.log(yMday);
        (function ($) {
            $.init();
           
            var result0 = $('#result0')[0];
            var result1 = $('#result1')[0];
            var btns = $('.btn');
            btns.each(function (i, btn) {
                btn.addEventListener('tap', function () {
                    var optionsJson = this.getAttribute('data-options') || '{}';
                    var options = JSON.parse(optionsJson);
                    var id = this.getAttribute('id');
                    /*
                     * 首次显示时实例化组件
                     * 示例为了简洁，将 options 放在了按钮的 dom 上
                     * 也可以直接通过代码声明 optinos 用于实例化 DtPicker
                     */

                    var date=0;
                    var picker = new $.DtPicker(options);
                    var time1,time2,gap,s,m,h;

                    picker.show(function (rs) {
                        /*
                         * rs.value 拼合后的 value
                         * rs.text 拼合后的 text
                         * rs.y 年，可以通过 rs.y.vaue 和 rs.y.text 获取值和文本
                         * rs.m 月，用法同年
                         * rs.d 日，用法同年
                         * rs.h 时，用法同年
                         * rs.i 分（minutes 的第二个字母），用法同年
                         */
                        if (id === 'start') {
                            result0.innerText = rs.y.text + '年' + rs.m.text + '月' + rs.d.text +
                                '日';
                            interval();   
                            //console.log(rs.value.split('-').join('\'));
                        } else if(id==='demo5'){
                            result1.innerText = rs.h.text + ':' + rs.i.text;
                            interval();
                            time0=rs.h.value+':'+rs.i.value;
                            console.log(time0);

                        }else if(id==='demo6'){
                            result2.innerText = rs.h.text + ':' + rs.i.text;
                            interval();
                            time1=rs.h.value+':'+rs.i.value;
                            console.log(time1);
                        }
                        /* 
                         * 返回 false 可以阻止选择框的关闭
                         * return false;
                         */
                        /*
                         * 释放组件资源，释放后将将不能再操作组件
                         * 通常情况下，不需要示放组件，new DtPicker(options) 后，可以一直使用。
                         * 当前示例，因为内容较多，如不进行资原释放，在某些设备上会较慢。
                         * 所以每次用完便立即调用 dispose 进行释放，下次用时再创建新实例。
                         */
                        picker.dispose();
                    });

                    function interval(){
                    date=result0.innerText.replace(/[\u4e00-\u9fa5]/g,'/');
                    date=date.substring(0,date.length-1);
                    time1=new Date(date+' '+result1.innerText);
                    time2=new Date(date+' '+result2.innerText);
                    gap=time2.getTime()-time1.getTime();
                    if(gap<=0){
                        jQuery('#interval').html('结束时间必须在开始时间之后')
                                            .css('color','#d42121');
                    }else{
                        var s=gap/1000;
                        var m=s/60%60;
                        var h=s/3600;
                        h=Math.floor(h);
                        if(h<1){
                            jQuery('#interval').html(m+'分钟').css('color','#555555');
                            timeGap=m+'分钟';
                        }else{
                            jQuery('#interval').html(h+'小时'+m+'分钟').css('color','#555555');
                            timeGap=h+'小时'+m+'分钟';
                        }
                        console.log(timeGap);

                    }
                }

                }, false);
            });


            
        })(mui);