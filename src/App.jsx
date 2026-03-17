import './App.css'
import { useState } from "react";
import Header from "./components/Header";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";

function App() {

  const [tasks, setTasks] = useState([]);

  // Add a task
  function addTask(taskText){
  
    if(taskText.trim() === "") return;
    const newTask = {
      id: Date.now(),
      text: taskText
    };
  setTasks([...tasks, newTask]);

}

  // Delete a task
  function deleteTask(id){
    setTasks(tasks.filter(task => task.id !== id));
}

  // Toggle completion status
  function toggleTask(id){
    setTasks(tasks.map(task => 
      task.id === id ? {...task, completed: !task.completed} : task
    ));
}

return (

  <div className="app-container">
    <div className="task-card">

          <Header />

          <p className="task-counter">
            Total: {tasks.length} | Completed: {tasks.filter(t=>t.completed).length}
          </p>

          <TaskInput addTask={addTask} />
          <TaskList 
            tasks={tasks} 
            deleteTask={deleteTask} 
            toggleTask={toggleTask} 
          />

    </div>
  </div>

);

}

export default App;