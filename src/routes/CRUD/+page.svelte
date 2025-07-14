<script>
	let persons = $state([
		{
			id: 1,
			firstname: 'John',
			lastname: 'Doe'
		},
		{
			id: 2,
			firstname: 'Jane',
			lastname: 'Doe'
		}
	]);

	let person = $state({ id: null, firstname: '', lastname: '' });
	let filterValue = $state('');
	let filteredPersons = $state(persons);

	$effect(() => {
		if (filterValue) {
			filteredPersons = persons.filter(
				(person) =>
					person.firstname.toLowerCase().includes(filterValue.toLowerCase()) ||
					person.lastname.toLowerCase().includes(filterValue.toLowerCase())
			);
		}
	});

	const getSelectedPerson = () => {
		return persons.filter((person) => person.id);
	};

	function createPerson() {
		const newId = persons.length > 0 ? Math.max(...persons.map((p) => p.id)) + 1 : 1;
		persons.push({ ...person, id: newId });
	}

	function updatePerson() {}

	function deletePerson() {
		persons = persons.filter((p) => p.id !== person.id);
		person = { id: null, firstname: '', lastname: '' };
	}
</script>

<div class="grid grid-cols-2 gap-4 rounded border bg-white p-4">
	<div class="flex justify-between">
		<span>Filter: </span>
		<input type="text" class="border px-2" bind:value={filterValue} />
	</div>
	<select
		class="row-span-2 row-start-2 rounded border p-2"
		size="5"
		bind:value={person}
		onchange={getSelectedPerson}
	>
		{#each filterValue ? filteredPersons : persons as person (person.id)}
			<option value={person}>{person.firstname} {person.lastname}</option>
		{/each}
	</select>
	<div class="row-start-2 grid gap-2">
		<div class="flex gap-2">
			<span>First Name : </span>
			<input type="text" class="border px-2" bind:value={person.firstname} />
		</div>
		<div class="flex gap-2">
			<span>Last Name :</span>
			<input type="text" class="border px-2" bind:value={person.lastname} />
		</div>
	</div>
	<div class="row-start-4 flex justify-between">
		<button onclick={createPerson} class="rounded border px-2">Create</button>
		<button onclick={updatePerson} class="rounded border px-2">Update</button>
		<button onclick={deletePerson} class="rounded border px-2">delete</button>
	</div>
</div>
