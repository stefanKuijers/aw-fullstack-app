
export function updateArrayItem(array, index, newItem) {
	return array
		.slice(0, index)
		.concat(newItem)
		.concat(array.slice(index + 1));
};

export function deleteArrayItem(array, index) {
	return array
		.slice(0, index)
		.concat(array.slice(index + 1));
};

export function getById(array, id) {
	return array.filter(item => item.id == id)[0];
}

export function deepCopy(obj) {
	return JSON.parse(JSON.stringify(obj));
}