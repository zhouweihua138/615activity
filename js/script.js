$.fn.extend({
    luckDraw: function (data) {
		var anc = $(this); //祖父元素
		var list = anc.children("li");
		var click; //点击对象
		var lineNumber; //几行 3
		var	listNumber; //几列 4
		var thisWidth;
		var thisHeight;
		var stime;  //中奖位置

		if (data.line == null) { return; } else { lineNumber = data.line; }
		if (data.list == null) { return; } else { listNumber = data.list; }
		if (data.click == null) { return; } else { click = data.click; }
		if (data.stime == null) { return; } else { stime = data.stime; }
        
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
		});
		var ix = 0;
		var speed = 100;
		var Countdown = 1000; //倒计时
		var isRun = false;
		var dgTime = 200;
        
		$(click).click(function () {
			if(isRun){
				return;
			} else {
			    dgTime += stime * 10 + 80;
				uniform();
			}
		});

		$.fn.luckDraw.run = function (num) {
		    if (isRun) {
		        return;
		    } else {
		        stime = num;
		        dgTime += stime * 10 + 80;
		        uniform();
		    }
		}
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
		function speedDown() { //减速
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
		function end() {
			if(ix == 0){
				ix = 10;    //此处需要与设立的奖项数量相同
			}
            
		    //抽奖结果弹窗
			switch (ix) {
			    case 1: case 5: case 7:  //金币
			        $(".popup1 .popup-inner .bg,.popup1 .content-box .btn-red").show();
			        $(".popup1 .content-box img").attr({ "src": "images/img_cj_popup_jinbi.png", "alt": "金币" }).css({"width":"100%"});
			        $(".popup1 .content-box p").text("获得" + $(".cj li.adcls div").text());
			        $(".popup2").css("visibility", "hidden");
			        $(".popup1").css("visibility", "visible");
			        $(".mask").css("visibility", "visible");
			        break;
			    case 2:  //20免邮券
			        $(".popup1 .popup-inner .bg,.popup1 .content-box .btn-red").show();
			        $(".popup1 .content-box img").attr({ "src": "images/img_cj_myq_20.png", "alt": $(".cj li.adcls div").text() }).css({ "width": "auto" });
			        $(".popup1 .content-box p").text("获得" + $(".cj li.adcls div").text());
			        $(".popup2").css("visibility", "hidden");
			        $(".popup1").css("visibility", "visible");
                    $(".mask").css("visibility", "visible");
                    break;
			    case 3:  //50免邮券
			        $(".popup1 .popup-inner .bg,.popup1 .content-box .btn-red").show();
			        $(".popup1 .content-box img").attr({ "src": "images/img_cj_myq_50.png", "alt": $(".cj li.adcls div").text() }).css({ "width": "auto" });
			        $(".popup1 .content-box p").text("获得" + $(".cj li.adcls div").text());
			        $(".popup2").css("visibility", "hidden");
			        $(".popup1").css("visibility", "visible");
                    $(".mask").css("visibility", "visible");
                    break;
			    case 4: case 9:  //谢谢参与
			        $(".popup1 .popup-inner .bg,.popup1 .content-box .btn-red").hide();
			        $(".popup1 .content-box img").attr({ "src": "images/img_cj_xxcy.png", "alt": $(".cj li.adcls div").text() }).css({ "width": "auto" });
			        $(".popup1 .content-box p").text($(".cj li.adcls div").text());
			        $(".popup2").css("visibility", "hidden");
			        $(".popup1").css("visibility", "visible");
                    $(".mask").css("visibility", "visible");
                    break;
			    case 6: case 10:  //神秘大礼
			        $(".popup1").css("visibility", "hidden");
			        $(".mask .popup2").css("visibility", "visible");
			        $(".mask").css("visibility", "visible");
                    break;
			    case 8:  //神券-免邮券100
			        $(".popup1 .popup-inner .bg,.popup1 .content-box .btn-red").show();
			        $(".popup1 .content-box img").attr({ "src": "images/img_cj_popup_shenquan.png", "alt": $(".cj li.adcls div").text() }).css({ "width": "100%" });
			        $(".popup1 .content-box p").text("获得" + $(".cj li.adcls div").text());
			        $(".popup2").css("visibility", "hidden");
			        $(".popup1").css("visibility", "visible");
			        $(".mask").css("visibility", "visible");
			}
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
