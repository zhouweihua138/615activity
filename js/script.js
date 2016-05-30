$(function(){
	$('.cj').luckDraw({
		line:3, //几行
		list:4, //几列
		click: ".bt", //点击对象
		arrLucks: ["100枚金币", "20免邮券", "50免邮券", "谢谢参与！", "50枚金币", "神秘大礼", "20枚金币", "100免邮券", "谢谢参与！", "神秘大礼"],  //奖项，用数组传递，数组长度为10
		sBigLuck: "神秘大礼",  //大奖项，需是在奖项数组中存在
		bIsOut: true  //大奖项是否已抽完，当值为true时将不再抽取大奖
	});
	redrawBtn();
	$(".jieguo,.dialog").click(function () {
	    $(".dialog").hide();
	});
});

function checkFormAward() {
    var sMobile = $(".frm-award input[name=mobile]").val();
    if (sMobile == "") {
        alert("未输入手机号码");
        return false;
    } else {
        return true;
    }
}
function redrawBtn() {
    $(".bt").css({ "width": $(".cj li").width(), "height": $(".cj li>div").height(), "line-height": $(".cj li>div").height() + "px" });
}
window.onresize = function () {
    redrawBtn();
};

$.fn.extend({
	luckDraw:function(data){
		var anc = $(this); //祖父元素
		var list = anc.children("li");
		var click; //点击对象
		var lineNumber; //几行 3
		var	listNumber; //几列 4
		var thisWidth;
		var thisHeight;
	    //如实物奖品每天2份，从后台取得数据后，如果当天全部奖品已经送出，则不可再获得实物奖品
		var arrLucks = ["100枚金币", "20免邮券", "50免邮券", "谢谢参与！", "50枚金币", "神秘大礼", "20枚金币", "100免邮券", "谢谢参与！", "神秘大礼"];   //12个奖项	    
		var sBigLuck = "神秘大礼";    //接收一个项做为过滤项
		var bIsOut = true;   //大奖是否已抽完，默认设置抽完，防止调用时没有设置此参数造成损失

		if (data.line == null) { return; } else { lineNumber = data.line; }
		if (data.list == null) { return; } else { listNumber = data.list; }
		if (data.click == null) { return; } else { click = data.click; }
		if (data.arrLucks == null) { return; } else { arrLucks = data.arrLucks; }
		if (data.sBigLuck == null) { return; } else { sBigLuck = data.sBigLuck; }
		if (data.bIsOut == null) { return; } else { bIsOut = data.bIsOut; }

		var iIndex = getStrIndexInArr(arrLucks, sBigLuck) + 1;   //取出大奖所在的位置， n个位置有大奖，需改用数组存储

		var all = listNumber * lineNumber - (lineNumber - 2) * (listNumber - 2)  //应该有的总数
		if(all>list.length){ //如果实际方块小于应该有的总数
			for(var i=0;i<(all-list.length);i++){
				anc.append("<li>"+ parseInt(list.length+i+1)+"</li>");
			}
		}
		
		list = anc.children("li");

		list.each(function (index) {
			if(index+1 > all){
				$(this).remove();
			}
			$(this).children("div").html(arrLucks[index]);
		});
		var ix = 0;
		var speed = 100;
		var Countdown = 1000; //倒计时
		var isRun = false;
		var dgTime = 200;

        //获取指定字符在数组中的位置，即数组下标
		function getStrIndexInArr(arr, str) {
		    // 如果可以的话，调用原生方法
		    if (arr && arr.indexOf) {
		        return arr.indexOf(str);
		    }

		    var len = arr.length;
		    for (var i = 0; i < len; i++) {
		        // 定位该元素位置
		        if (arr[i] == str) {
		            return i;
		        }
		    }

		    // 数组中不存在该元素
		    return -1;
		}

		$(click).click(function(){
			if(isRun){
				return;
			} else {
			    var stime = 1;
                //大奖抽完则从随机数中过滤掉该值
			    if (bIsOut) {
			        stime = Math.floor(Math.random() * 10 + 1);      //10为奖项数目
			        while (stime == iIndex) {
			            stime = Math.floor(Math.random() * 10 + 1);
			        }
			        alert("大奖已抽完: 大奖位置: " + iIndex + ", 中奖位置: " + stime);
			    } else {
			        stime = Math.floor(Math.random() * 10 + 1);      //10为奖项数目
			        alert("大奖还有: 大奖位置: " + iIndex + ", 中奖位置: " + stime);
			    }

				
				//$('.zt').html('已点击，结果是数字<span> '+stime+' </span>号中奖');  ///可注释掉


				dgTime += stime*10 + 40;
					
				//speedUp();
				uniform();
			}
		});
		function speedUp(){ //加速
			isRun = true;
			list.removeClass("adcls");
			list.eq(ix).addClass("adcls");
			ix++;
			init(ix);
			speed -= 50;
			if(speed == 100){
				clearTimeout(stop);
				uniform();
			}else{
				var stop = setTimeout(speedUp,speed);
			}
		}
		function uniform() { //匀速
		    isRun = true;
			list.removeClass("adcls");
			list.eq(ix).addClass("adcls");
			ix++;
			init(ix);
			Countdown -= 50 ;
			if(Countdown == 0){
				clearTimeout(stop);
				speedDown();
			}else{
				var stop = setTimeout(uniform,speed);
			}
		}
		function speedDown(){ //减速
			list.removeClass("adcls");
			list.eq(ix).addClass("adcls");
			ix++;
			init(ix);
			speed += 10;
			if(speed == dgTime+20){
				clearTimeout(stop);
				end();
			}else{
				var stop = setTimeout(speedDown,speed);
			}
		} 
		function end(){
			if(ix == 0){
				ix = 10;    //此处需要与设立的奖项数量相同
			}
			$('.jieguo').html('恭喜，抽中：<span> ' + arrLucks[ix-1] + ' </span>').parent(".dialog").show();  ///抽奖结果
			initB();
		}
		///--归0
		function init(o){
			if(o == all){
				ix = 0;	
			}
		}
		///
		function initB(){
			ix = 0;
			dgTime = 200;
			speed = 100;
			Countdown = 1000;
			isRun = false;
		}
	}
});   
