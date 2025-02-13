import { Button } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTaskData, deleteUser,clearUser } from "../store/slice/ToDoListslice"; // Import deleteTask action

const TaskInput = () => {
  const [inputData, setInputData] = useState("");

  const dispatch = useDispatch();
  const data = useSelector((state) => state.addTask);

  const addTask = () => {
    if (inputData.trim()) {
      dispatch(addTaskData(inputData));
      setInputData("");
    }
  };

  const removeTask = (id) => {
    dispatch(deleteUser(id)); // Use deleteTask action
  };

  const clearAll = ()=>{
    dispatch(clearUser());
  }

  return (
    <div>
      <input
        type="text"
        value={inputData}
        onChange={(e) => setInputData(e.target.value)}
      />
      <Button onClick={addTask}>ADD TASK</Button>

      <ul>
        {data.map((task, id) => (
          <li key={id}>
            {task}
            <Button className="Delete" onClick={() => removeTask(id)}>
              Delete
            </Button>
          </li>
        ))}
      </ul>
      <Button className="clear" onClick={()=> clearAll()}>Clear</Button>
    </div>
  );
};

export default TaskInput;