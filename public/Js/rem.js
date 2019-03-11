(function (designWidth) {

	function setHtmlRem(designWidth) {

		//手机端最大安全屏幕尺寸 640px
		var maxWidth = 640;

		//手机端最小安全屏幕尺寸 320px
		var minWidth = 320;

		//页面设计尺寸
		designWidth = designWidth === undefined ? maxWidth : designWidth >= maxWidth ? maxWidth : designWidth <= minWidth ? minWidth : designWidth;

		//获取页面的html元素的宽度 getBoundingClientRect()

		var html = document.documentElement;

		var htmlWidth = html.getBoundingClientRect().width;

		var rem = document.getElementById('rem');
		if (rem) {
			rem.remove();
		}

		//创建sytyle
		var style = document.createElement('style');

		style.setAttribute('id', 'rem');

		style.type = 'text/css';

		//只有手机端才设置html元素的字体大小
		if (htmlWidth <= designWidth) {

			
			style.innerHTML = 'html{font-size:' + htmlWidth / designWidth * 100 + 'px}';


		} else {

			style.innerHTML = 'html{font-size: 100px;}';

		}

		document.getElementsByTagName('head')[0].appendChild(style);


	}

	setHtmlRem(designWidth);

	var _timers = [];
	window.onresize = function () {
		//函数节流
		var timer = setTimeout(function () {
			setHtmlRem(designWidth);
			_timers = [];
		}, 500)

		_timers.push(timer);

		for (var i = 1; i < _timers.length; i++) {
			clearTimeout(_timers[i]);
		}
		
	}

})();

