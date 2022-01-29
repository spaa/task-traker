import {useEffect} from 'react';
import { FaTimes } from "react-icons/fa";
const Task = ({ task, onDelete , onToggle}) => {
    useEffect(() => {
        return () => {
            alert("task Deleted");
        }
    }, [])
  return (
    <div className={`task ${task.reminder ? 'reminder' : ''}`} onDoubleClick={()=> onToggle(task)}>
      <h3>
        {task.text}{" "}
        <FaTimes
          onClick={() => {
            onDelete(task);
          }}
          style={{ color: "red", cursor: "pointer" }}
        />
      </h3>
      <p>{task.day}</p>
    </div>
  );
};

export default Task;
