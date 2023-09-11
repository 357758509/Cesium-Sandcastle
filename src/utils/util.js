
/**
 * @description 判断数据类型
 * @param {Any} val 需要判断类型的数据
 * @return string
 */
export function isType(val) {
	if (val === null) return "null";
	if (typeof val !== "object") return typeof val;
	else return Object.prototype.toString.call(val).slice(8, -1).toLocaleLowerCase();
}

export function getFlatArr(menuList) {
	let newMenuList= JSON.parse(JSON.stringify(menuList));
	return newMenuList.reduce((pre, current) => {
		let flatArr = [...pre, current];
		if (current.children) flatArr = [...flatArr, ...getFlatArr(current.children)];
		return flatArr;
	}, []);
}

export function getShowMenuList(menuList) {
	let newMenuList = JSON.parse(JSON.stringify(menuList));
	return newMenuList.filter(item => {
		item.children?.length && (item.children = getShowMenuList(item.children));
		return !item.meta?.isHide;
	});
}
