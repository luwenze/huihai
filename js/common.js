/**
 * lu方法封装
 */
(function () {
    if (!window.lu) {
        window.lu = {};
    };

    window.lu = {
        baseUrl: 'http://192.168.0.152',
        userType: null,
        getData: function (str) {
            var obj = {};
            if (str.indexOf('?') != -1) {
                str = str.substr(1);
            }
            var arr = str.split('&');
            arr.forEach(function (value, index) {
                var arr1 = value.split('=');
                obj[arr1[0]] = arr1[1];
            })
            return obj;
        },

        /*获取地址栏数据  方法start*/
        GetQueryString: function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]);
            return null;
        },
        /*获取地址栏数据  方法end*/

        /*将URL中的UTF-8字符串转成中文字符串 start*/
        getCharFromUtf8: function (str) {
            var cstr = "";
            var nOffset = 0;
            if (str == "")
                return "";
            str = str.toLowerCase();
            nOffset = str.indexOf("%e");
            if (nOffset == -1)
                return str;
            while (nOffset != -1) {
                cstr += str.substr(0, nOffset);
                str = str.substr(nOffset, str.length - nOffset);
                if (str == "" || str.length < 9)
                    return cstr;
                cstr += this.utf8ToChar(str.substr(0, 9));
                str = str.substr(9, str.length - 9);
                nOffset = str.indexOf("%e");
            }
            return cstr + str;
        },
        /*将URL中的UTF-8字符串转成中文字符串 end*/


        /*将编码转换成字符  start*/
        utf8ToChar: function (str) {
            var iCode, iCode1, iCode2;
            iCode = parseInt("0x" + str.substr(1, 2));
            iCode1 = parseInt("0x" + str.substr(4, 2));
            iCode2 = parseInt("0x" + str.substr(7, 2));
            return String.fromCharCode(((iCode & 0x0F) << 12) | ((iCode1 & 0x3F) << 6) | (iCode2 & 0x3F));
        },
        /*将编码转换成字符  end*/


        /*培训科目  start*/
        getProject: function (id, itemObj, itIds) {

            console.log(id);
            var urlPro = this.baseUrl + '/web/train/getTrainItem.action';
            $.ajax({
                //async: false,
                type: "get",
                url: urlPro,
                timeout: 10000,
                data: {
                    applyCompanyId: id
                },
                dataType: "json",
                success: function (response) {
                    if (!response.success) {
                        mui.toast(response.errorstr);
                        return false;
                    }
                    var data = response.data;


                    var trainItemList = data.trainItemList;
                    console.log(trainItemList);
                    //每次切换机构时要先清空  选中的和未选中的课程名称
                    var list = $('#delete').find('li');
                    console.log(list);
                    $.each(list, function (i, v) {
                        if ($(v).attr('class') == 'add') {
                            return;
                        }
                        $(v).remove();
                    });
                    $('#option').html('');
                    for (var i = 0; i < trainItemList.length; i++) {
                        //console.log(trainItemList[i]);
                        var str = '<li id="' + trainItemList[i].id + '">' +
                            '<a href="javascript:void(0)">' + trainItemList[i].name + '</a>' +
                            '</li>';
                        $('#option').append(str);
                    }
                    optClick();
                    deleteTag();
                    console.log('itemIds==========' + itIds);
                    if (itIds) {
                        var items = itIds.split(',');
                        console.log(items);
                        console.log(items[0]);
                        console.log(items[1]);
                        for (var j = trainItemList.length - 1; j >= 0; j--) {
                            console.log('j============' + j);
                            //console.log('trainItemList[j].id============'+trainItemList[j].id);
                            for (var k = 0; k < items.length; k++) {
                                console.log('items[i]========' + items[k]);
                                if (trainItemList[j].id == items[k]) {
                                    $('#option').find('li').eq(j).trigger("click");
                                    continue;
                                }
                            }
                        }
                    }

                    //加号标签点击事件  
                    $('#add').off('click');
                    $('#add').on('click', clickAddStyle);

                    function clickAddStyle() {
                        $('#add').toggleClass('minus');
                        $('#option').toggle(200);
                    }

                    //option结构生成完毕以后，模拟触发点击事件
                    /*for(var j=0;j<trainItemList.length;j++){
                        if(){

                        }
                    }*/
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    //mui.toast(textStatus);
                },
                complete: function (XMLHttpRequest, status) { //请求完成后最终执行参数
                    if (status == 'timeout') { //超时,status还有success,error等值的情况
                        //ajaxTimeoutTest.abort();　　　　　
                        mui.toast('超时');
                    }　　
                }
            });
            //选项是动态生成的，需要写在ajax之中
            //下面的选项每一个注册点击事件
            //点击时下面的选项去掉，上面新加一个
            //选项点击事件
            optClick();

            function optClick() {
                $('#option').find('li').on('click', fn1);
            }




            //调用删除标签方法,也是对动态产生的结构进行修改
            //$('#option').off('click');
            deleteTag();
            // 删除标签方法
            function deleteTag() {
                $('#delete').find('li').find('em').on('click', function () {
                    if ($(this).parent().attr('class') === 'add') {
                        return;
                    }
                    //$(this).parent().appendTo($('#option'));
                    var str = '<li id="' + $(this).parent().attr('id') + '">' +
                        '<a href="javascript:void(0)">' + $(this).prev().html() + '</a>' +
                        '</li>';
                    $(this).parent().remove();
                    $('#option')
                        .append(str)
                        .find('li')
                        .off('click', fn1)
                        .on('click', fn1);

                    //将移除的课程从对象中删除
                    delete itemObj[$(this).parent().attr('id')];
                    console.log(itemObj);
                    console.log('itemObj=======================');
                    itemIds = [];
                    items = [];
                    console.log(itemIds);
                    for (var k in itemObj) {
                        itemIds.push(k);
                        items.push(itemObj[k]);
                    }
                    console.log('itemObj==========================');
                    console.log(itemObj);
                });

            }





            //将选项  添加到已选中部分
            function fn1() {
                var str = '<li id="' + $(this).attr('id') + '">' +
                    '<a href="javascript:void(0)">' + $(this).find('a').html() + '</a>' +
                    '<em></em>' +
                    '</li>';
                $(this).remove();
                $(str).insertBefore('.add');
                $.each($('#delete').find('li'), function (i, v) {
                    if ($(this).attr('class') === 'add') {
                        return;
                    }
                    $(this).find('em').off('click');
                });

                deleteTag();

                //将添加的课程保存到对象中
                itemObj[$(this).attr('id')] = $(this).find('a').html();
                console.log(itemObj);
                console.log('itemObj=======================');
                itemIds = [];
                items = [];
                console.log('itemIds==========================');
                console.log(itemIds);
                for (var k in itemObj) {
                    itemIds.push(k);
                    items.push(itemObj[k]);
                }
                console.log('itemIds==========================');
                console.log(itemIds);
            }

        },
        /*培训科目 end*/

        /*变换按钮中三角的方向 start*/
        setTriangle: function () {
            if ($('.triangle')) {
                $('.triangle').on('click', function () {
                    $(this).toggleClass('up');
                });
            }
        },
        /*变换按钮中三角的方向 end*/

        /*获取红点方法 start*/
        getRedPoint: function (userId, companyId, lasttime, applyState) {
            console.log('userId=================================' + userId);
            console.log('companyId=================================' + companyId);
            console.log('lasttime=================================' + lasttime)
            mui.ajax({
                type: "get",
                url: window.lu.baseUrl + "/web/train/checkRedDto.action",
                async: true,
                data: {
                    'userId': userId,
                    'companyId': companyId,
                    'time': lasttime, //上一次调用的时间
                },
                dataType: "json",
                timeout: 1000,
                success: function (response) {
                    if (!response.success) {
                        mui.toast(response.errorstr);
                        return false;
                    }
                    console.log('==============================lasttime' + lasttime);
                    var data = response.data;
                    console.log(data);

                    checkRedDto1 = data.checkRedDto1;
                    checkRedDto2 = data.checkRedDto2;
                    checkRedDto3 = data.checkRedDto3;

                    window.location.time = data.time;
                    console.log('使用之后======================================time' + window.location.time)

                    if (applyState === '' || applyState === 5) {
                        window.location[companyId].checkRedDto1 += checkRedDto1;
                        window.location[companyId].checkRedDto2 += checkRedDto2;
                        window.location[companyId].checkRedDto3 += checkRedDto3;

                    }
                    //当applyState是0时，刷新第二个分类
                    if (applyState === 0 || applyState === 6) {
                        window.location[companyId].checkRedDto1 = 0;
                        window.location[companyId].checkRedDto2 += checkRedDto2;
                        window.location[companyId].checkRedDto3 += checkRedDto3;

                    }
                    if (applyState === 1 || applyState === 7) {
                        window.location[companyId].checkRedDto2 = 0;
                        window.location[companyId].checkRedDto1 += checkRedDto1;
                        window.location[companyId].checkRedDto3 += checkRedDto3;

                    }
                    if (applyState === 2 || applyState === 8) {
                        window.location[companyId].checkRedDto3 = 0;
                        window.location[companyId].checkRedDto1 += checkRedDto1;
                        window.location[companyId].checkRedDto2 += checkRedDto2;


                    }
                    /*if(applyState==''){

                    }*/
                    console.log('checkRedDto1=======' + checkRedDto1);
                    if (window.location[companyId].checkRedDto1 !== 0) {
                        jQuery('.mui-control-item').eq(1).addClass('hint');
                    } else {
                        jQuery('.mui-control-item').eq(1).removeClass('hint');
                    }
                    console.log(window.location[companyId].checkRedDto2);
                    if (window.location[companyId].checkRedDto2 !== 0) {
                        jQuery('.mui-control-item').eq(2).addClass('hint');
                    } else {
                        jQuery('.mui-control-item').eq(2).removeClass('hint');
                    }

                    if (window.location[companyId].checkRedDto3 !== 0) {
                        jQuery('.mui-control-item').eq(3).addClass('hint');
                    } else {
                        jQuery('.mui-control-item').eq(3).removeClass('hint');
                    }

                },
                error: function (jqXHR, textStatus, errorThrown) {
                    //alert();
                    //mui.toast(textStatus);
                },
                complete: function (XMLHttpRequest, status) { //请求完成后最终执行参数
                    if (status == 'timeout') { //超时,status还有success,error等值的情况
                        //ajaxTimeoutTest.abort();　　　　　
                        mui.toast('超时');
                    }　　
                }
            });
        },
        /*获取红点方法 end*/

        /*推出页面  start*/
        shouldClose: function () {    
            this.loadURL('&&&name=shouldClose');
        },
        /*推出页面  end*/


        loadURL: function (url) {
            var iFrame;
            var isAndroid;
            var isiOS;
            var u = navigator.userAgent;
            isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
            isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            if (isAndroid == false && isiOS == true) {
                iFrame = document.createElement("iframe");
                iFrame.setAttribute("src", url);
                iFrame.setAttribute("style", "display:none;");
                iFrame.setAttribute("height", "0px");
                iFrame.setAttribute("width", "0px");
                iFrame.setAttribute("frameborder", "0");
                document.body.appendChild(iFrame);
                // 发起请求后这个 iFrame 就没用了，所以把它从 dom 上移除掉
                // iFrame.parentNode.removeChild(iFrame);
                // iFrame = null;
            } else if (isAndroid == true && isiOS == false) {
                jQuery.ajax({
                    type: "POST",
                    url: url
                });
            }
        },

        //这个限制是汉字数的两倍
        wordLimit: function (obj, limit) {
            var val = $(obj).val().length;
            if (val > limit) {
                mui.toast('至多输入' + limit + '个字符!');
                //汉字的个数
                str = ($(obj).val().replace(/\w/g, "")).length;
                //非汉字的概述
                abcnum = $(obj).val().length - str;

                if (str * 2 + abcnum > 2 * limit) {
                    $(obj).val($(obj).val().substring(0, limit));
                }
            }
        }
    };
})();