import Vue from 'vue';

Vue.directive('back', function(el) {
	el.onclick = function() {
		window.history.go(-1)
	}
});