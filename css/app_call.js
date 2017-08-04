
var isAndroid;
var isiOS;
		var u = navigator.userAgent;
		isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
		isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
		/*if( isAndroid == true && isiOS == false)
		{
			var oCss = document.createElement("link");
			oCss.setAttribute("rel","stylesheet");
			oCss.setAttribute("type",'text/css');
			oCss.setAttribute('href',Adrfilename);
			$('head')[0].appendChild(oCss);
			title_height = 44;
		}
		else if(isAndroid == false && isiOS == true){
			var oCss = document.createElement("link");
			oCss.setAttribute("rel","stylesheet");
			oCss.setAttribute("type",'text/css');
			oCss.setAttribute('href',Iosfilename);
			$('head')[0].appendChild(oCss);
			title_height = 64;
			
			$('.title_back').click(function(){
				shouldBack();
			});
		}*/
			





function loadURL(url) {
    var iFrame;
    if(isAndroid == false && isiOS == true){
	    iFrame = document.createElement("iframe");
	    iFrame.setAttribute("src", url);
	    iFrame.setAttribute("style", "display:none;");
	    iFrame.setAttribute("height", "0px");
	    iFrame.setAttribute("width", "0px");
	    iFrame.setAttribute("frameborder", "0");
	    document.body.appendChild(iFrame);
	    // 发起请求后这个 iFrame 就没用了，所以把它从 dom 上移除掉
	    iFrame.parentNode.removeChild(iFrame);
	    iFrame = null; 
    }
    else if( isAndroid == true && isiOS == false)
	{
	    $.ajax({
	    	type:"POST",
	    	url:url
	    });
	}
}

//注册成功，通知APP注册成功
function registSuccess(tel, password,name) {
    /* loadURL('{"tel":'+tel+',"password":'+password+'}'); */
    loadURL('&&&tel='+tel+',password='+password+',name='+name);
}


//通知App返回上个页面
function shouldBack(){
	loadURL('&&&name=shouldBack');
}


//审批成功，通知目标用户刷新首页（我加入的机构），由APP完成
function approveSuccess(userId){
    loadURL('&&&name=approveSuccess,userId='+userId);
}


//审批拒绝，通知目标用户刷新首页（我加入的机构），由APP完成
function approveFail(userId,reason){
    loadURL('&&&name=approveFail,userId='+userId+',reason='+reason);
}

//分享，分别传入链接，标题，文本，图片,（文本可以只有一句话或者两句话，不要太大段）
function share(shareUrl,title,text,pic,bbsid){
	loadURL('&&&shareUrl='+shareUrl+',title='+title+',text='+text+',pic='+pic+',bbsid='+bbsid+',name=share');
}

//关闭当前页面（）
function shouldClose(){
    loadURL('&&&name=shouldClose');
}

//上传照片
function uploadAlbum(albumId){
    loadURL('&&&albumId='+albumId+',name=uploadAlbum');
}

//支付（打赏）
function payForArticle(userId,articleId){
    loadURL('&&&userId='+userId+',articleId='+articleId+',name=payForArticle');
}

//修改支付密码
function retrievePayPassword(oldPassword){
	loadURL('&&&oldPassword='+oldPassword+',name=retrievePayPassword');
}

//修改绑定手机
function updateTelphone(){
    loadURL('&&&name=updateTelphone');
}