// 存储localStorage
export const setStore = (name, content) => {
	if (!name) return;
	if (typeof content !== 'string') {
		content = JSON.stringify(content);
	}
	window.localStorage.setItem(name, content);
}

// 获取localStorage
export const getStore = name => {
	if (!name) return;
	return window.localStorage.getItem(name);
}

// 删除localStorage
export const removeStore = name => {
	if (!name) return;
	window.localStorage.removeItem(name);
}

// 参数是否在指定数组中
export const oneOf = (value, validList) => {
	validList.forEach(item => {
		if (item === value) {
			return true;
		}
	});

	return false;
}



// 清除字符串左右两端空白字符
export const trim = str => {
	return str.replace(/(^\s*)|(\s*$)/g, "");
}

// 数组排序
export const arrSort = (arr, i) => {
	return i === 1 ?
		arr.sort((a, b) => {
			return b - a;
		}) :
		arr.sort((a, b) => {
			return a - b;
		})
}

// 查找数组元素
export const arrIndexOf = (arr, val) => {
	for (let i = 0, iL = arr.length; i < iL; i++) {
		if (arr[i] === val) return i;
	}

	return -1;
}

// 删除数组中的元素
export const arrRemove = (arr, val) => {
	let index = arrIndexOf(arr, val);
	if (index !== -1) {
		arr.splice(index, 1);
	}
}


// 验证十六进制颜色
export const checkColor = colorCode => {
	return /^#[0-9a-fA-F]{3,6}$/.test(colorCode);
}


// 拷贝
export const assign = (defs, opts) => {
	let sets = {};

	for (let p in defs) {
		sets[p] = opts[p] ? opts[p] : defs[p]
	}

	return sets;

}