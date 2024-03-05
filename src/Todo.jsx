import { useEffect, useState } from "react";
import "./todo.css";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");
  const [discription, setDescription] = useState("");
  const [dropDown, setDropDown] = useState("high");
  const [editableMode, setEditableMode] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [SelectAll, setSelectAll] = useState(false);
  const handleAllChecked = (e) => {
    setSelectAll(!SelectAll);
    setTodos(
      todos?.map((data) => {
        return {
          ...data,
          isSelected: e.target.checked,
        };
      })
    );
  };
  useEffect(() => {
    if (todos?.length > 0 && todos?.every((val) => val.isSelected === true)) {
      setSelectAll(true);
    }
  }, [SelectAll, todos]);

  const handleSubmit = () => {
    if (task.trim() === "" || discription.trim() === "") return;
    setTodos([
      ...todos,
      { task, discription, isSelected: false, dropDown, id: Date.now() },
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
    setDescription(todo.discription);
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
              discription,
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

  return (
    <div className="todo">
      <h2>TODO</h2>
      <input
        placeholder="Add Task"
        onChange={(e) => setTask(e.target.value)}
        value={task}
      />
      <input
        placeholder="Add Task Description"
        onChange={(e) => setDescription(e.target.value)}
        value={discription}
      />

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

      <button onClick={editableMode ? handleUpdate : handleSubmit}>
        {editableMode ? "update" : "Add"} Task
      </button>
      <button onClick={() => handleRemoveCompleted()}> Remove Completed</button>
      <table>
        <tr>
          <th>
            {" "}
            <input
              type="checkbox"
              checked={SelectAll}
              onChange={(e) => handleAllChecked(e)}
            />
          </th>
          <th>Task</th>
          <th>Discription</th>
          <th>priority</th>
          <th>Actions</th>
        </tr>

        {todos?.map((todo) => (
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
              {todo.discription}
            </td>
            <td className={todo.isSelected && "completed"}>{todo.dropDown}</td>
            <button onClick={() => handleEdit(todo)} disabled={todo.isSelected}>
              Edit
            </button>
            <button onClick={() => handleDelete(todo.id)}>delete</button>
          </tr>
        ))}
      </table>
    </div>
  );
};
export default Todo;
