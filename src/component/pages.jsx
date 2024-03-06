const RenderTodo = ({ todo, handleCheckbox, handleEdit, handleDelete }) => {
	return (
		<tbody key={todo.id}>
			<tr>
				<td>
					<input
						type="checkbox"
						name="completed"
						checked={todo.isSelected}
						onChange={(e) => handleCheckbox(todo, e)}
					/>
				</td>
				<td className={todo.isSelected ? 'completed' : ''}>{todo.task}</td>
				<td className={todo.isSelected ? 'completed' : ''}>{todo.description}</td>
				<td className={todo.isSelected ? 'completed' : ''}>{todo.dropDown}</td>
				<td>
					<button onClick={() => handleEdit(todo)} disabled={todo.isSelected}>
						Edit
					</button>
					<button onClick={() => handleDelete(todo.id)}>delete</button>
				</td>
			</tr>
		</tbody>
	);
};
export default RenderTodo;
