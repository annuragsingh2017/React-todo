import { useEffect, useState } from 'react';
import './todo.css';
import { renderPagination } from './pagination';
import RenderTodo from './pages';
import Form from './Form';

const Todo = () => {
	const [todos, setTodos] = useState([]);
	const [task, setTask] = useState('');
	const [description, setDescription] = useState('');
	const [dropDown, setDropDown] = useState('high');
	const [editableMode, setEditableMode] = useState(false);
	const [editedData, setEditedData] = useState({});
	const [selectAll, setSelectAll] = useState(false);
	const [taskError, setTaskError] = useState('');
	const [descriptionError, setDescriptionError] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const [searchData, setSearchData] = useState('');
	const [filteredTodos, setFilteredTodos] = useState([]);
	let itemsPerPage = 4;
	const totalPages = Math.ceil(todos?.length / itemsPerPage);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;

	const handleDelete = (id) => {
		setTodos(todos?.filter((todo) => todo.id !== id));
	};
	const handleEdit = (todo) => {
		setEditableMode(!editableMode);
		setEditedData(todo);
		setTask(todo.task);
		setDescription(todo.description);
		setDropDown(todo.dropDown);
	};
	const handleCheckbox = (todo, e) => {
		setSelectAll(false);
		setTodos(
			todos?.map((data) => {
				if (data.id === todo.id) {
					return {
						...data,
						isSelected: e.target.checked,
					};
				}
				return data;
			})
		);
	};
	const handleAllChecked = (e) => {
		setSelectAll(!selectAll);
		setTodos(
			todos?.map((data) => ({
				...data,
				isSelected: e.target.checked,
			}))
		);
	};
	const handleClick = (page) => {
		setCurrentPage(page);
	};

	useEffect(() => {
		const newTodos = [...todos];
		setFilteredTodos(
			newTodos.filter((todo) => todo?.task?.toLowerCase().includes(searchData.toLowerCase()))
		);
	}, [searchData, todos]);

	return (
		<div className="todo">
			<Form
				formData={{
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
				}}
			/>

			<table>
				<tr>
					<th>
						{' '}
						<input type="checkbox" checked={selectAll} onChange={(e) => handleAllChecked(e)} />
					</th>
					<th>Task</th>
					<th>Description</th>
					<th>Priority</th>
					<th>Actions</th>
				</tr>

				{filteredTodos?.slice(startIndex, endIndex)?.map((todo) => (
					<RenderTodo
						todo={todo}
						handleCheckbox={handleCheckbox}
						handleEdit={handleEdit}
						handleDelete={handleDelete}
					/>
				))}
			</table>
			<div className="pagination buttons fixed-pagination">
				{renderPagination(totalPages, handleClick, currentPage, setCurrentPage)}
			</div>
		</div>
	);
};
export default Todo;
