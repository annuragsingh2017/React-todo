import { useEffect, useState } from "react";
import "./todo.css";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [dropDown, setDropDown] = useState("high");
  const [editableMode, setEditableMode] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [selectAll, setSelectAll] = useState(false);
  const [taskError, setTaskError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  let itemsPerPage = 2;
  const totalPages = Math.ceil(todos?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  console.log(totalPages);

  const handleAllChecked = (e) => {
    setSelectAll(!selectAll);
    setTodos(
      todos.map((data) => ({
        ...data,
        isSelected: e.target.checked,
      }))
    );
  };

  useEffect(() => {
    if (todos.length > 0 && todos.every((val) => val.isSelected === true)) {
      setSelectAll(true);
    }
  }, [selectAll, todos]);

  const handleSubmit = () => {
    if (task.trim() === "" && description.trim() === "") {
      setDescriptionError("Task and Description cannot be empty");
      return;
    }
    if (task.trim() === "") {
      setTaskError("Task cannot be empty");
      return;
    }
    if (description.trim() === "") {
      setDescriptionError("Description cannot be empty");
      return;
    }
    setTaskError("");
    setDescriptionError("");
    setTodos([
      ...todos,
      { task, description, isSelected: false, dropDown, id: Date.now() },
    ]);
    setTask("");
    setDescription("");
    setDropDown("high");
  };
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
    setTask("");
    setDescription("");
    setDropDown("high");
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
  const handleRemoveCompleted = () => {
    setSelectAll(false);
    setTodos(todos?.filter((item) => !item.isSelected));
  };
  const handleClick = (page) => {
    setCurrentPage(page);
  };

  const renderPagination = () => {
    const pagination = [];
    for (let i = 1; i <= totalPages; i++) {
      pagination.push(
        <button
          key={i}
          onClick={() => handleClick(i)}
          className={currentPage === i ? "active" : ""}
        >
          {i}
        </button>
      );
    }
    return pagination;
  };
  return (
    <div className="todo">
      <h2>TODO</h2>
      <input
        placeholder="Add Task"
        onChange={(e) => {
          setTask(e.target.value);
          setTaskError("");
        }}
        value={task}
      />
      {taskError && <p className="error">{taskError}</p>}
      <input
        placeholder="Add Task Description"
        onChange={(e) => {
          setDescription(e.target.value);
          setDescriptionError("");
        }}
        value={description}
      />
      {descriptionError && <p className="error">{descriptionError}</p>}

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
      <div className="buttons">
        <button onClick={editableMode ? handleUpdate : handleSubmit}>
          {editableMode ? "update" : "Add"} Task
        </button>
        <button onClick={() => handleRemoveCompleted()}>
          {" "}
          Remove Completed
        </button>
      </div>
      <table>
        <tr>
          <th>
            {" "}
            <input
              type="checkbox"
              checked={selectAll}
              onChange={(e) => handleAllChecked(e)}
            />
          </th>
          <th>Task</th>
          <th>Description</th>
          <th>Priority</th>
          <th>Actions</th>
        </tr>

        {todos?.slice(startIndex, endIndex)?.map((todo) => (
          <tr key={todo.id}>
            <td>
              <input
                type="checkbox"
                name="completed"
                checked={todo.isSelected}
                onChange={(e) => handleCheckbox(todo, e)}
              />
            </td>
            <td className={todo.isSelected && "completed"}>{todo.task}</td>
            <td className={todo.isSelected && "completed"}>
              {todo.description}
            </td>
            <td className={todo.isSelected && "completed"}>{todo.dropDown}</td>
            <button onClick={() => handleEdit(todo)} disabled={todo.isSelected}>
              Edit
            </button>
            <button onClick={() => handleDelete(todo.id)}>delete</button>
          </tr>
        ))}
      </table>
      <div className="pagination buttons">
        <button
          onClick={() =>
            setCurrentPage(currentPage === 1 ? currentPage : currentPage - 1)
          }
          disabled={currentPage === 1}
        >
          prev
        </button>
        {renderPagination()}
        <button
          onClick={() =>
            setCurrentPage(
              currentPage === totalPages ? totalPages : currentPage + 1
            )
          }
          disabled={currentPage === totalPages || totalPages === 0}
        >
          next
        </button>
      </div>
    </div>
  );
};
export default Todo;
