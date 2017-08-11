// 存储localStorage / sessionStorage
export const setStore = (name, content, isLocal = false) => {
	if (!name) return;
	if (typeof content !== 'string') {
		content = JSON.stringify(content);
	}

	if (isLocal) {
		localStorage.setItem(name, content);
	} else {
		sessionStorage.setItem(name, content);
	}
}

// 获取localStorage / sessionStorage
export const getStore = (name, isLocal = false) => {
	if (!name) return;
	return isLocal ?
		localStorage.getItem(name) :
		sessionStorage.getItem(name);
}

// 删除localStorage / sessionStorage
export const removeStore = (name, isLocal = false) => {
	if (!name) return;
	if (isLocal) {
		localStorage.removeItem(name);
	} else {
		sessionStorage.removeItem(name);
	}
}

// 清空localStorage / sessionStorage
export const clearStore = (isLocal = false) => {
	if (isLocal) {
		localStorage.clear();
	} else {
		sessionStorage.clear();
	}
}

// 参数是否在指定数组中
export const oneOf = (value, validList) => {
	for (let i = 0, iL = validList.length; i < iL; i++) {
		if (value == validList[i]) {
			return true;
		}
	}
	return false;
}



// 清除字符串左右两端空白字符
export const trim = (str) => {
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

// 加密
export const encrypt = s => {
	let
		fnl = "",
		code = 0;
	s = '' + s;

	for (let i = 0; i < s.length; i++) {
		code = s.charCodeAt(i) & 0x7f ^ (8 << 7 - i % 8 | 8 >> i % 8 | 0x80) & 0xff;
		fnl += code.toString(16);
	}
	return fnl;
}

// 解密
export const decrypt = s => {
	let
		fnl = "",
		code = 0;
	s = '' + s;

	for (let i = 0; i < s.length >> 1; i++) {
		code = new Number("0x" + s.substr(i * 2, 2));
		fnl += String.fromCharCode((code ^ (8 << 7 - i % 8 | 8 >> i % 8 | 0x80)) & 0x7f);
	}
	return fnl;
}

// 禁止/释放页面滚动方法
export const pageScroll = (function() {
	const fn = function(e) {
		e.preventDefault();
		e.stopPropagation();
	};
	let islock = false;

	return {
		lock: function() {
			if (islock) return;
			islock = true;
			document.addEventListener('touchmove', fn);
		},
		unlock: function() {
			islock = false;
			document.removeEventListener('touchmove', fn);
		}
	};
})();