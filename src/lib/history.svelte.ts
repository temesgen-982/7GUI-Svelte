// T is a placeholder for whatever type

export function createHistory<T>(initialValue: T) {
	const history = $state<T[]>([initialValue]);
	let index = $state(0);
	const current = $derived(history[index]);
	const canUndo = $derived(index > 0);
	const canRedo = $derived(index < history.length - 1);

	function update(newValue: T) {
		history.splice(index + 1);
		history.push(newValue);
		index = history.length - 1;
	}

	function undo() {
		if (canUndo) {
			index--;
		}
	}

	function redo() {
		if (canRedo) {
			index++;
		}
	}

	return {
		get current() {
			return current;
		},
		get canUndo() {
			return canUndo;
		},
		get canRedo() {
			return canRedo;
		},
		update,
		undo,
		redo
	};
}
