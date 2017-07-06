mui.init();
    mui('.mui-table-view-cell').on('tap','a',function(){
        document.location.href=this.href;
    });
    (function($) {
        //tab栏注册点击事件
        


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
    })(mui);
