import { useState, useEffect } from "react";
import Header from "./components/header";
import Tasks from "./components/tasks";
import AddTask from "./components/addTask";
import Footer from "./components/footer";
import About from "./components/about";
import {BrowserRouter as Router,Route} from 'react-router-dom'
function App() {
  const [showAddTask, toggleShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  //Use Effect
  useEffect(() => {
    const getTasksFromServer = async () => {
      const res = await fetchTasks();
      setTasks(res);
    };
    getTasksFromServer();
  }, []);

  //Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/tasks");
    const data = await res.json();
    return data;
  };

  //Fetch Task
  const fetchTask = async (task) => {
    const res = await fetch(`http://localhost:5000/tasks/${task.id}`);
    const data = await res.json();
    return data;
  };

  //Delete Task
  const deleteTask = async (task) => {
    await fetch(`http://localhost:5000/tasks/${task.id}`, { method: "DELETE" });
    setTasks(tasks.filter((t) => t.id !== task.id));
  };

  //Toggle task
  const toggleTask = async(task) => {
    const taskToToggle = await fetchTask(task);
    const updateTask = {...taskToToggle, reminder : !taskToToggle.reminder};

    const res = await fetch(`http://localhost:5000/tasks/${task.id}`,{method:'PUT' , headers : {"Content-type" : 'application/json'} , body : JSON.stringify(updateTask)});
    const data = await res.json()

    setTasks(
      tasks.map((t) =>
        t.id === task.id ? { ...task, reminder: !task.reminder } : t
      )
    );
  };

  //Toggle Show Add Task
  const toggleShowingAddTask = () => {
    toggleShowAddTask(!showAddTask);
  };

  //Add Task
  const addTask = async (task) => {
    const res = await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(task),
    });
    const data = await res.json();
    setTasks([...tasks, data]);
  };

  return (
    <Router>
    <div className="App">
      <Header onToggle={toggleShowingAddTask} showAddTask={showAddTask} />
      
      <Route path="/" exact render={(props)=>(
        <>
          <AddTask onAdd={addTask} showAddTask={showAddTask} />
          <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleTask} />
        </>
      )} />
      <Route path="/about" component={About} />
      <Footer/>
    </div>
    </Router>
  );
}

export default App;
