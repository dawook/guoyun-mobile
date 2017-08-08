import Vue from 'vue';

Vue.directive('back', function(el) {
	el.onclick = function() {
		window.history.go(-1)
	}
});

// 获取焦点
Vue.directive('focus', function(el, {
	value
}) {
	if (value) {
		el.focus();
	}
})