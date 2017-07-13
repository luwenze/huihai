mui.init();
    mui('.mui-table-view-cell').on('tap','a',function(){
        document.location.href=this.href;
    });

            
			
			



    (function($) {
        //tab栏注册点击事件

        getList();
        function getList(){
            mui.ajax({
                type: "get",
                url: "http://192.168.0.152/web/train/trainList.action",
                async: true,
                data: {
                    'userId':71993,
                    'state':'',
                    'companyId':72252,
                    'startIndex':0,
                    'pageSize':3
                },
                dataType: "json",
                timeout: 1000,
                success: function(response) {
                    var data=null,
                    userType=null,//角色类型
                    dataList=null,//数据列表
                    item=null,//数据中的每一项
                    applyNumber=null,//申请编号
                    cityStr=null,//省市区
                    items=null,//培训科目
                    realname=null,//申请人名称
                    createTime=null,//创建时间
                    state=null,//所处阶段
                    reg = /[\u4e00-\u9fa5]/gm;//匹配汉字

                    data=response.data;
                    console.log(data);

                    dataList=data.listData;
                    console.log(dataList);

                    for(var i=0;i<dataList.length;i++){
                        //该项对应的数据
                        var strLeft='';
                        console.log(dataList[i]);
                        item=dataList[i];
                        applyNumber=item.applyNumber;//申请编号
                        cityStr=item.cityStr.split(' ');
                        cityStr=cityStr[0]+'省'+cityStr[1]+'市'+cityStr[2]+'区';//申请区域
                        items=item.items.split(',');//培训科目数组
                        realname=item.realname;//申请人
                        createTime=item.createTime.split(reg);//创建时间数组
                        state=item.state;
                        
                        var right=document.createAttribute('div');

                        //右边number部分字符串
                        var numStr='';
                        if(state===0){
                            numStr='<div class="number">'
                                        +'<span>申请编号:</span>'
                                        +'<span class="applyId">'+applyNumber+'</span>'
                                        +'<span id="state0">【待审核】</span>'
                                    +'</div>';
                        }else if(state===1){
                            numStr='<div class="number">'
                                        +'<span>申请编号:</span>'
                                        +'<span class="applyId">'+applyNumber+'</span>'
                                        +'<span id="state1">【待确定】</span>'
                                    +'</div>';
                        }else if(state===2||3){
                            numStr='<div class="number">'
                                        +'<span>申请编号:</span>'
                                        +'<span class="applyId">'+applyNumber+'</span>'
                                        +'<span id="state2">【待完成】</span>'
                                    +'</div>';
                        }else if(state===4){
                            numStr='<div class="number">'
                                        +'<span>申请编号:</span>'
                                        +'<span class="applyId">'+applyNumber+'</span>'
                                        +'<span id="state3">【已完成】</span>'
                                    +'</div>';
                        }
                        //右边area部分字符串
                        var areaStr='<div class="area">'
                                        +'<b></b>'
                                        +'<span>区域:</span>'
                                        +'<span>'+cityStr+'</span>'
                                    +'</div>';
                        //右边project部分字符串
                        //var proStr=
                        


                        var li=document.createAttribute('li');
                        li.className="mui-table-view-cell";
                        strLeft='<div class="fl">'
                                +'<div class="time">'
                                    +'<div>'
                                        +'<span class="date">'+createTime[2]+'</span>'
                                    +'</div>'
                                    +'<div>'
                                        +'<span class="month">'+createTime[1]+'</span>'
                                    +'</div>'
                                    +'<div>'
                                        +'<span class="year">'+createTime[0]+'</span>'
                                    +'</div>'
                                +'</div>'
                            +'</div>';
                            console.log(strLeft);

                        
                        //     +'<div class="right">'
                        //         +'<div class="number">'
                        //             +'<span>申请编号:&nbsp;</span>'
                        //             +'<span class="applyId">'+applyNumber+'</span>';
                        // if(state===0){
                        //     str=str+'<span id="state0">【待审核】</span>';
                        // }else if(state===1){
                        //     str=str+'<span id="state1">【待确定】</span>';                            
                        // }else if(state===2||3){
                        //     str=str+'<span id="state2">【待完成】</span>';                            
                        // }else if(state===4){
                        //     str=str+'<span id="state0">【已完成】</span>';                            
                        // }
                        // str+='</div>'
                        //         +'<div class="area">'
                        //             +'<b></b>&nbsp;'
                        //             +'<span>区域:&nbsp;</span>'
                        //             +'<span>'+cityStr+'</span>'
                        //         +'</div>'
                        //         +'<div class="project">'
                        //             +'<div class="fl">培训科目:</div>'
                        //             +'<div class="right">';    
                        // if(items.length<=4){

                        // }

                                        +'<div>'
                                            +'<span>蒙氏数学 | </span>'
                                            +'<span>蒙氏阅读 | </span>'
                                            +'<span>分级阅读 | </span>'
                                            +'<span>逻辑宝贝</span>'
                                        +'</div>'
                                        +'<div class="two">'
                                            +'<span>蒙氏数学 | </span>'
                                            +'<span>蒙氏阅读 | </span>'
                                            +'<span>分级阅读 | </span>'
                                            +'<span>逻辑宝贝</span>'
                                        +'</div>'
                                    +'</div>'
                                +'</div>'
                                +'<div class="people">'
                                    +'<b></b>&nbsp;'
                                    +'<span>申请人:&nbsp;</span>'
                                    // +'<span>上官幽若'+(index+1)+'的第'+(i+length)+'项</span>'
                                +'</div>'
                            +'</div>';



                        
                    }




                },
                error: function(xhr, type, errorThrown) {
                    
                },

            });
        }
        
        

        //阻尼系数
        var deceleration = mui.os.ios?0.003:0.0009;
        $('.mui-scroll-wrapper').scroll({
            bounce: false,
            indicators: true, //是否显示滚动条
            deceleration:deceleration
        });
        $.ready(function() {
            //循环初始化所有下拉刷新，上拉加载。
            $.each(document.querySelectorAll('.mui-slider-group .mui-scroll'), function(index, pullRefreshEl) {

                
                $(pullRefreshEl).pullToRefresh({
                    down: {
                        auto:true,
                        callback: function() {
                            var self = this;
                            setTimeout(function() {
                                var ul = self.element.querySelector('.mui-table-view');
                                ul.insertBefore(createFragment(ul, index, 5, false), ul.firstChild);
                                //ul是作用的ul
                                //index是指第几个tab
                                //1是创建的个数
                                //最后的布尔值代表了重新加载列表项的顺序，false大到小
                                self.endPullDownToRefresh();
                            }, 1000);
                        }
                    },
                    up: {
                        callback: function() {
                            var self = this;
                            setTimeout(function() {
                                var ul = self.element.querySelector('.mui-table-view');
                                ul.appendChild(createFragment(ul, index, 5));
                                self.endPullUpToRefresh();
                            }, 1000);
                        }
                    }
                });
            });
            var createFragment = function(ul, index, count, reverse) {
                var length = ul.querySelectorAll('li').length;
                var fragment = document.createDocumentFragment();
                var li;
                var str;
                for (var i = 0; i < count; i++) {
                    // li = document.createElement('li');
                    // li.className = 'mui-table-view-cell';
                    // li.innerHTML = '第' + (index + 1) + '个选项卡子项-' + (length + (reverse ? (count - i) : (i + 1)));
                    // fragment.appendChild(li);
                    str='';
                    li = document.createElement('li');
                    li.className = 'mui-table-view-cell';
                    str='<!--给a标签设置点击事件-->'
                            +'<a href="#"></a>'
                            +'<div class="fl">'
                                +'<div class="time">'
                                    +'<div>'
                                        +'<span class="date">24</span>'
                                    +'</div>'
                                    +'<div>'
                                        +'<span class="month">12</span>'
                                    +'</div>'
                                    +'<div>'
                                        +'<span class="year">2017</span>'
                                    +'</div>'
                                +'</div>'
                            +'</div>'
                            +'<div class="right">'
                                +'<div class="number">'
                                    +'<span>申请编号:&nbsp;</span>'
                                    +'<span class="applyId">452221112332111232</span>'
                                    +'<span id="state3">【已完成】</span>'
                                +'</div>'
                                +'<div class="area">'
                                    +'<b></b>&nbsp;'
                                    +'<span>区域:&nbsp;</span>'
                                    +'<span>湖北省武汉市洪山区</span>'
                                +'</div>'
                                +'<div class="project">'
                                    +'<div class="fl">培训科目:</div>'
                                    +'<div class="right">'
                                        +'<div>'
                                            +'<span>蒙氏数学 | </span>'
                                            +'<span>蒙氏阅读 | </span>'
                                            +'<span>分级阅读 | </span>'
                                            +'<span>逻辑宝贝</span>'
                                        +'</div>'
                                        +'<div class="two">'
                                            +'<span>蒙氏数学 | </span>'
                                            +'<span>蒙氏阅读 | </span>'
                                            +'<span>分级阅读 | </span>'
                                            +'<span>逻辑宝贝</span>'
                                        +'</div>'
                                    +'</div>'
                                +'</div>'
                                +'<div class="people">'
                                    +'<b></b>&nbsp;'
                                    +'<span>申请人:&nbsp;</span>'
                                    +'<span>上官幽若'+(index+1)+'的第'+(i+length)+'项</span>'
                                +'</div>'
                            +'</div>';
                        li.innerHTML=str;
                        fragment.appendChild(li);
                }
                return fragment;
            };
        });



        function isChineseChar(str){   
            
        }
    })(mui);
