import Vue from 'vue';

const ToastConstructor = Vue.extend(require('./src/toast.vue'));

const instance = new ToastConstructor({
	el: document.createElement('div')
});

ToastConstructor.prototype.closeToast = function() {
	const el = instance.$el;
	el.classList.remove('zoom-out');
	el.parentNode && el.parentNode.removeChild(el);
};
ToastConstructor.prototype.addCls = function() {
	instance.$el.classList.add('zoom-out');
};


const Toast = (options = {}) => {

	instance.msg = options.msg || '';
	instance.position = options.position || 'bottom';
	instance.duration = ~~options.duration || 3500;
	instance.iconClass = options.iconClass || '';

	document.body.appendChild(instance.$el);

	let timer = setTimeout(() => {
		clearTimeout(timer);
		instance.addCls();
	}, instance.duration);

	instance.timer = setTimeout(() => {
		clearTimeout(instance.timer);
		clearTimeout(timer);
		instance.closeToast();
	}, instance.duration + 300);


};

Vue.prototype.$toast = Toast;
export default Toast;