/**
 * 封装mui公有方法
 */

function touClass() {
            // 公有方法
            this.touch = function (fn1, fn2) {
                this.addEventListener('touchstart', function (event) {
                    var touch = event.targetTouches[0];
                    // 开始坐标
                    this.startx = touch.pageX;
                    this.starty = touch.pageY;
                })
                this.addEventListener('touchmove', function (event) {
                    var touch = event.targetTouches[0];
                    // 结束坐标
                    this.endx = touch.pageX;
                    this.endy = touch.pageY;
                    var x = this.endx - this.startx;
                    var y = this.endy - this.starty;
                    var w = x < 0 ? x - 1 : x; //x轴的滑动值, w为x的绝对值
                    var h = y < 0 ? y - 1 : y; //y轴的滑动值
                    if (w > h) { //如果是在x轴中滑动,阻止默认事件
                        event.preventDefault(); // 解决微信touchmove冲突并实现上下可滑动
                    }
                })
                this.addEventListener('touchend', function (event) {
                    if ((this.startx - this.endx) >= 100 && fn1) {
                        // 执行左滑回调
                        fn1();
                    }
                    if ((this.endx - this.startx) >= 100 && fn2) {
                        // 执行右滑回调
                        fn2();
                    }
                })
            }
        }

//右滑返回
touClass.call(document);
document.touch('', function () {
    mui.back();
});


if(document.getElementById('backTag')){
        document.getElementById('backTag').addEventListener('tap',function(){
        mui.back();
    });
}
