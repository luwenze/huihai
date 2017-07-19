mui.init({
			swipeBack:true //启用右滑关闭功能
		});
        //设置time0和time1的默认值
        var trainFate=0;
        var timeStr0=timeStr1='2017/12/12';
        
        
        (function ($) {
            $.init();
            var result0 = $('#result0')[0];
            var result1 = $('#result1')[0];
            var btns = $('.btn');
            var time0=time1=Date.parse('2017/12/12');//时间选择框中的默认选项

            var applyForm=document.getElementById('applyForm');
            var fate=applyForm.querySelector('#fate');
            


            //点击日期按钮选择日期时间功能
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
                    var picker = new $.DtPicker(options);
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
                            timeStr0=result0.innerText.replace(/[\u4e00-\u9fa5]/gm, "/");
                            timeStr0=timeStr0.substr(0,timeStr0.length-1);
                            console.log(timeStr0);
                            time0=Date.parse(timeStr0);
                            console.log(time0);//开始时间
                            
                        } else {
                            result1.innerText = rs.y.text + '年' + rs.m.text + '月' + rs.d.text +
                                '日';
                            timeStr1=result1.innerText.replace(/[\u4e00-\u9fa5]/gm, "/");
                            timeStr1=timeStr1.substr(0,timeStr1.length-1);
                            console.log(timeStr1);
                            time1=Date.parse(timeStr1);
                            console.log(time1);//结束时间
                        }
                        var timeDiffer=time1-time0;
                        console.log('time0===='+time0);
                        console.log('time1====='+time1);
                        if(timeDiffer<=0){
                            fate.innerHTML='结束时间应在开始时间之后';
                            fate.style.color='#d42121';
                        }else{
                            fate.innerHTML=timeDiffer/1000/3600/24+'天';
                            fate.style.color='#565656';
                            trainFate=timeDiffer/1000/3600/24;
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
                }, false);
            });


            
        })(mui);