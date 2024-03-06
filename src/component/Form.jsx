import { useEffect } from 'react';

const Form = ({
	formData: {
		setTask,
		setTaskError,
		task,
		taskError,
		setDescription,
		setDescriptionError,
		description,
		descriptionError,
		dropDown,
		setDropDown,
		editableMode,
		setTodos,
		todos,
		editedData,
		setEditableMode,
		setEditedData,
		setSelectAll,
		searchData,
		setSearchData,
	},
}) => {
	const handleUpdate = () => {
		if (editableMode) {
			setTodos(
				todos.map((data) => {
					if (data.id === editedData.id) {
						return {
							...data,
							task,
							description,
							dropDown,
						};
					}
					return data;
				})
			);
		}
		setEditableMode(false);
		setEditedData({});
		setTask('');
		setDescription('');
		setDropDown('high');
	};
	const handleRemoveCompleted = () => {
		setSelectAll(false);
		setTodos(todos?.filter((item) => !item.isSelected));
	};

	useEffect(() => {
		if (todos?.length > 0 && todos?.every((val) => val.isSelected === true)) {
			setSelectAll(true);
		}
	}, [setSelectAll, todos]);

	const handleSubmit = () => {
		if (task.trim() === '' && description.trim() === '') {
			setDescriptionError('Task and Description cannot be empty');
			return;
		}
		if (task.trim() === '') {
			setTaskError('Task cannot be empty');
			return;
		}
		if (description.trim() === '') {
			setDescriptionError('Description cannot be empty');
			return;
		}
		setTaskError('');
		setDescriptionError('');
		setTodos([...todos, { task, description, isSelected: false, dropDown, id: Date.now() }]);
		setTask('');
		setDescription('');
		setDropDown('high');
	};

	const handleSearch = (e) => {
		setSearchData(e.target.value);
	};
	return (
		<>
			<h2>TODO</h2>
			<input
				className="input"
				placeholder="Add Task"
				onChange={(e) => {
					setTask(e.target.value);
					setTaskError('');
				}}
				value={task}
			/>
			{taskError && <p className="error">{taskError}</p>}
			<input
				className="input"
				placeholder="Add Task Description"
				onChange={(e) => {
					setDescription(e.target.value);
					setDescriptionError('');
				}}
				value={description}
			/>
			{descriptionError && <p className="error">{descriptionError}</p>}
			<div className="search-bar">
				<div>
					<label>Priority</label>
					<select
						value={dropDown}
						onChange={(e) => {
							setDropDown(e.target.value);
						}}
					>
						<option value="high">high</option>
						<option value="medium"> medium</option>
						<option value="low"> low</option>
					</select>
				</div>
				<div>
					<label> Find with task name</label>
					<input placeholder="Search..." value={searchData} onChange={handleSearch} />
				</div>
			</div>
			<div className="buttons">
				<button onClick={editableMode ? handleUpdate : handleSubmit}>
					{editableMode ? 'update' : 'Add'} Task
				</button>
				<button onClick={() => handleRemoveCompleted()}> Remove Completed</button>
			</div>
		</>
	);
};
export default Form;
