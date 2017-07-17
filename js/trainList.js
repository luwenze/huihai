mui.init();
    /*mui('.mui-table-view-cell').on('tap','a',function(){
        document.location.href=this.href;
    });*/
    mui('.mui-slider-group').on('tap','a',function(){
        window.top.location.href=this.href;
    });

            
			
			



    (function($) {
        //tab栏注册点击事件
        
        //初始化
        var userId=71993;//登陆的用户Id
        var applyState='';//点击栏目状态，无时为全部，1待确认，2、3待完成，4已完成
        var companyId=72252;//用户登录的机构Id
        var pagesize=3;//控制每一次加载的条数
        var lastIndex=0;//初始时默认为0
        var startIndex=0;//初始时第一页为0


        
        
        

        //阻尼系数
        var deceleration = mui.os.ios?0.003:0.0009;
        $('.mui-scroll-wrapper').scroll({
            bounce: false,
            indicators: true, //是否显示滚动条
            deceleration:deceleration
        });
        $.ready(function() {
            //循环初始化所有下拉刷新，上拉加载。
            


            //进入页面时，默认为全部状态

            //在这里把所有元素都初始加载上

            var all=document.querySelector('.mui-table-view');
            console.log(all);
            getList(userId,applyState,companyId,startIndex,pagesize,all,0,true);
            /*$.each(document.querySelectorAll('.mui-scroll .mui-control-item'),function(i,v){
                console.log(i);
                console.log(v);
                $(v).on('tap',function(){
                    var aId=this.getAttribute('href');
                    alert(aId);
                    getList(userId,applyState,companyId,startIndex,pagesize,ul,i,true);                    
                });
            });*/

            //给每一个tab栏注册点击事件
            //点击以后，会刷新该栏目下的项目
            $('.mui-scroll').on('tap','.mui-control-item',function(){
                
                console.log(this);
                //获取到每一个a标签的href指向，通过href得到要作用的ul
                var aHref=this.getAttribute('href');
                aHref=aHref.substr(1,aHref.length-1);
                console.log(aHref);                
                var aUl=document.getElementById(aHref).querySelector('.mui-table-view');
                aUl.innerHTML='';
                var aIndex=aUl.getAttribute('index');
                //每次点击lastIndex都会初始化
                lastIndex=0;
                /**
                 * state:               index
                 * 全部：''                0
                 * 待审核：0               1
                 * 待确认：1               2
                 * 待完成：2               3
                 * 已完成：4
                 */
                if(aIndex==0){
                    applyState='';
                    
                }else if(aIndex==1){
                    applyState=0;
                }else if(aIndex==2){
                    applyState=1;
                }else if(aIndex==3){
                    applyState=2;
                }
                console.log('index='+aIndex+'========applyState='+applyState);
                getList(userId,applyState,companyId,0,pagesize,aUl,aIndex,true);
                

            });
            
            


            $.each(document.querySelectorAll('.mui-slider-group .mui-scroll'), function(index, pullRefreshEl) {
                //每一个菜单都会遍历到，导致a自增了四次
                //a++;
                //console.log(a);
                console.log(this);
                $(pullRefreshEl).pullToRefresh({
                    //下拉刷新
                    down: {
                        auto:true,
                        callback: function() {
                            //下拉刷新，值都恢复到默认值
                            //lastIndex=0;
                            startIndex=0;
                            var self = this;
                            setTimeout(function() {
                                var ul = self.element.querySelector('.mui-table-view');
                                var tabIndex=ul.getAttribute('index')-0;
                                // ul.insertBefore(createFragment(ul, index, 10, true), ul.firstChild);
                                // self.endPullDownToRefresh();
                                // createFragment(ul, index, 5, false);
                                //ul是作用的ul
                                //index是指第几个tab
                                //1是创建的个数
                                //最后的布尔值代表了重新加载列表项的顺序，false大到小
                                ul.innerHTML='';
                                console.log('startIndex-----'+startIndex);
                                //console.log('lastIndex-----'+lastIndex);
                                getList(userId,applyState,companyId,startIndex,pagesize,ul,index,true);
                                
                                //console.log(fragment);
                                self.endPullDownToRefresh();
                            }, 1000);
                        }
                    },
                    //上拉加载更多
                    up: {
                        callback: function() {
                            //console.log(a);
                            var self = this;
                            setTimeout(function() {
                                var ul = self.element.querySelector('.mui-table-view');

                                // 控制在不同的tab栏下刷新出来的项目也不同
                                var tabIndex=ul.getAttribute('index')-0;
                                /**
                                 * state:               index
                                 * 全部：''                0
                                 * 待审核：0               1
                                 * 待确认：1               2
                                 * 待完成：2               3
                                 * 已完成：4
                                 */
                                if(tabIndex==0){
                                    applyState='';
                                }else if(tabIndex==1){
                                    applyState=0;
                                }else if(tabIndex==2){
                                    applyState=1;
                                }else if(tabIndex==3){
                                    applyState=2;
                                }
                                console.log(lastIndex);
                                if(lastIndex!=-1){
                                    
                                    console.log(index);
                                    console.log('startIndex-----'+startIndex);
                                    console.log('lastIndex-----'+lastIndex);
                                    startIndex=lastIndex;//将每次更新后的的lastIndex赋值给startIndex;
                                    //每次刷新都会更新startIndex的值，这样每次下拉结果都不一样
                                    getList(userId,applyState,companyId,startIndex,pagesize,ul,index,false);
                                    

                                }
                                self.endPullUpToRefresh();
                            }, 1000);
                            if(lastIndex==-1){
                                var loading=document.querySelectorAll('.mui-pull-loading')[index];
                                console.log(loading);
                                loading.innerHTML='亲没有下一页啦！';
                            }
                        }

                    }
                });
            });
            /* var createFragment = function(ul, index, count, reverse) {
                var length = ul.querySelectorAll('li').length;
                var fragment = document.createDocumentFragment();
                var li;
                for (var i = 0; i < count; i++) {
                    li = document.createElement('li');
                    li.className = 'mui-table-view-cell';
                    li.setAttribute('tab',index+1);
                    li.setAttribute('index',(length + (reverse ? (count - i) : (i + 1))));
                    fragment.appendChild(li);
                }
                return fragment;
            };*/
            function getList(userId,applyState,companyId,startIndex,pageSize,ul,index,reverse){
                        //userId 登录的用户ID
                        //state 点击栏目状态
                        //companyId  用户登录的机构ID
                        //startIndex 分页（开始位置
                        //pageSize 分页（每页显示的条数)
                        //ul 添加li的ul对象
                        //index 第几个tab
                        //reverse 控制正放置与反放置
                //定义了fragment
                var fragment;
                mui.ajax({
                    type: "get",
                    url: "http://192.168.0.152/web/train/trainList.action",
                    async: true,
                    data: {
                        'userId':userId,
                        'state':applyState,
                        'companyId':companyId,
                        'startIndex':startIndex,
                        'pageSize':pageSize
                    },
                    dataType: "json",
                    timeout: 1000,
                    success: function(response) {

                        
                        var length = ul.querySelectorAll('li').length;
                        var data=response.data,
                            userType=data.userType,//角色类型
                            dataList=data.listData,//数据列表
                            pageCount=data.pageCount,//总条数
                            page=pageCount/pagesize,//总条数除以每一页的条数等于  总页数
                            reg = /[\u4e00-\u9fa5]/gm;//匹配汉字
                            lastIndex=data.lastIndex;//下一页开始位置，-1表示无下一页
                            //获取到下一页开始的位置，每次刷新都会更新下一次开始的位置
                            startIndex++;
                            console.log(startIndex);
                            console.log(page);       
                            

                        //fragment为创建的div
                        //fragment = document.createElement('div');


                        for(var i=0;i<pagesize;i++){
                            var item=null,//数据中的每一项
                                applyNumber=null,//申请编号
                                cityStr=null,//省市区
                                items=null,//培训科目
                                realname=null,//申请人名称
                                createTime=null,//创建时间
                                state=null;//所处阶段
                            //该项对应的数据
                            var strLeft='';
                            item=dataList[i];
                            if(item===undefined){
                                return;
                            }
                            applyNumber=item.applyNumber;//申请编号
                            cityStr=item.cityStr;
                            //cityStr=item.cityStr.split(' ');
                            //cityStr=(cityStr[0]?cityStr[0]:)+'省'+cityStr[1]+'市'+(cityStr[2]?cityStr[2]+'区':'');//申请区域
                            items=item.items.split(',');//培训科目数组
                            realname=item.realname;//申请人
                            createTime=item.createTime.split(reg);//创建时间数组
                            state=item.state;//本条记录所处阶段
                            

                            //1.构建right部分
                            var right=document.createElement('div');
                            right.className='right';

                            //右边number部分字符串
                            var numStr='';
                            if(state===0){
                                numStr='<div class="number">'
                                            +'<span>申请编号:</span>'
                                            +'<span class="applyId">'+applyNumber+'</span>'
                                            +'<span id="state0" class="state">【待审核】</span>'
                                        +'</div>';
                            }else if(state===1){
                                numStr='<div class="number">'
                                            +'<span>申请编号:</span>'
                                            +'<span class="applyId">'+applyNumber+'</span>'
                                            +'<span id="state1" class="state">【待确定】</span>'
                                        +'</div>';
                            }else if(state===2){
                                numStr='<div class="number">'
                                            +'<span>申请编号:</span>'
                                            +'<span class="applyId">'+applyNumber+'</span>'
                                            +'<span id="state2" class="state">【待完成】</span>'
                                        +'</div>';
                            }else if(state===4){
                                numStr='<div class="number">'
                                            +'<span>申请编号:</span>'
                                            +'<span class="applyId">'+applyNumber+'</span>'
                                            +'<span id="state3" class="state">【已完成】</span>'
                                        +'</div>';
                            }

                            //右边area部分字符串
                            var areaStr='<div class="area">'
                                            +'<b></b>'
                                            +'<span>区域:</span>'
                                            +'<span>'+cityStr+'</span>'
                                        +'</div>';
                            //右边project部分字符串
                            var proStr='';
                            proStr= '<div class="project">'
                                                +'<div class="fl">培训科目:</div>'
                                                +'<div class="right clearfix">';
                            for(var j=0;j<items.length;j++){
                                proStr+='<span>'+items[j]+' | </span>';
                            }
                            proStr+='</div>'+
                                '</div>';

                            //右边people部分
                            var peoStr='';
                            peoStr='<div class="people">'
                                        +'<b></b>'
                                        +'<span>申请人:</span>'
                                        +'<span>'+realname+'</span>'
                                    +'</div>';

                            right.innerHTML=numStr+areaStr+proStr+peoStr;


                            //2.左边部分
                            var strLeft='<div class="fl">'
                                    +'<div class="time">'
                                        +'<div>'
                                            +'<span class="date">'+createTime[2]+'</span>'
                                        +'</div>'
                                        +'<div>'
                                            +'<span class="month">'+createTime[1]+'月</span>'
                                        +'</div>'
                                        +'<div>'
                                            +'<span class="year">'+createTime[0]+'</span>'
                                        +'</div>'
                                    +'</div>'
                                +'</div>';
                            //3.设置跳转的a标签
                            var a=document.createElement('a');
                            a.setAttribute('href','../trainAudit.html?trainAudit='+state);


                            //4.创建一个li用来接收制作好的元素与字符串
                            var li=document.createElement('li');
                            li.className="mui-table-view-cell";
                            li.innerHTML=strLeft;
                            var left=li.getElementsByTagName('div')[0];
                            li.appendChild(right);
                            li.insertBefore(a,left);
                            li.setAttribute('tab',index+1);
                            //li.setAttribute('index',(length + (reverse ? (pageSize - i) : (i + 1))));
                            
                            if(reverse===true){//下拉刷新
                                li.setAttribute('index',(length + (reverse ?  (i + 1): (pageSize - i))));                            
                                ul.appendChild(li);

                            }else{//上拉加载更多
                                // if(index){
                                //     alert('没有下一页了');
                                //     return;
                                // }
                                
                                console.log(lastIndex);
                                li.setAttribute('index',(length + (reverse ?  (pageSize - i): (i + 1))));                            
                                ul.appendChild(li);
                                startIndex=lastIndex;
                                console.log(startIndex);

                            }

                        
                        }
                        // console.log(fragment);
                        // return fragment;
                        
                    },
                    error: function(xhr, type, errorThrown) {
                        
                    },
                    complete:function(){
                        startIndex=lastIndex;
                    }

                });
                //console.log(fragment);
                console.log(startIndex);
            }

        });

        

        //获得列表中的li元素的方法
       
    })(mui);
