/**
 * lu方法封装
 */
(function(){
    if (!window.lu) {  
            window.lu = {};  
        };
    
    window.lu={
        getData:function(str){
            var obj = {};
            if(str.indexOf('?') != -1){         
                str = str.substr(1);
            }
            var arr = str.split('&');       
            arr.forEach(function(value,index){
                var arr1 = value.split('=');   
                obj[arr1[0]] = arr1[1];
            })
            return obj;
        },
    };
})();
    
    