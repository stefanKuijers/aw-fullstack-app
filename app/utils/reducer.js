
export function updateArrayItem(array, index, newItem) {
	return array
		.slice(0, index)
		.concat(newItem)
		.concat(array.slice(index + 1));
};