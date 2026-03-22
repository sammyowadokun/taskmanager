import './App.css'
import { useState } from "react";
import Header from "./components/Header";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import { 
    FaClipboardList, FaTasks, FaCheckCircle, FaHourglassHalf, 
    FaChartPie, FaCog, FaMoon, FaSun,
 } from "react-icons/fa";

function App() {

  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [activeNav, setActiveNav] = useState("dashboard");
  const [darkMode, setDarkMode] = useState(false);

  // Add a task
  function addTask(taskText){
  
    if(taskText.trim() === "") return;
    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
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

  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = tasks.filter((task) => !task.completed).length;

  // Filter tasks based on the selected filter
  const filteredTasks = tasks.filter(task => {
    if(filter === "completed") return task.completed;
    if(filter === "pending") return !task.completed;
    return true; // for "all"
  });
  
  //* Handle navigation click and set active state
  function handleNavClick(section) {
    setActiveNav(section);

    if (section === "dashboard" || section === "all") {
      setFilter("all");
    }

    if (section === "completed") {
      setFilter("completed");
    }

    if (section === "pending") {
      setFilter("pending");
    }
}

return (

    <div className={darkMode ? "dashboard-layout dark-mode" : "dashboard-layout"}>
      <aside className="sidebar">
        <div className="sidebar-logo">
          <h2>TaskFlow</h2>
          <p>Workspace</p>
        </div>

        <nav className="sidebar-nav">
          <button
            className={activeNav === "dashboard" ? "nav-item active-nav" : "nav-item"}
            onClick={() => handleNavClick("dashboard")}
          >
            <FaChartPie className="nav-icon" />
            Dashboard
          </button>

          <button
            className={activeNav === "all" ? "nav-item active-nav" : "nav-item"}
            onClick={() => handleNavClick("all")}
          >
            <FaClipboardList className="nav-icon" />
            All Tasks
          </button>

          <button
            className={activeNav === "completed" ? "nav-item active-nav" : "nav-item"}
            onClick={() => handleNavClick("completed")}
          >
            <FaCheckCircle className="nav-icon" />
            Completed
          </button>

          <button
            className={activeNav === "pending" ? "nav-item active-nav" : "nav-item"}
            onClick={() => handleNavClick("pending")}
          >
            <FaHourglassHalf className="nav-icon" />
            Pending
          </button>

          <button
            className={activeNav === "settings" ? "nav-item active-nav" : "nav-item"}
            onClick={() => handleNavClick("settings")}
          >
            <FaCog className="nav-icon" />
            Settings
          </button>
        </nav>

        <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <FaSun className="nav-icon" /> : <FaMoon className="nav-icon" />}
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </aside>

      <main className="main-content">
        <div className="task-card">
          <Header />

          <div className="stats-container">
            <div className="stat-card">
              <FaTasks className="stat-icon" />
              <h3>Total Tasks</h3>
              <p>{tasks.length}</p>
            </div>

            <div className="stat-card">
              <FaCheckCircle className="stat-icon" />
              <h3>Completed</h3>
              <p>{completedTasks}</p>
            </div>

            <div className="stat-card">
              <FaHourglassHalf className="stat-icon" />
              <h3>Pending</h3>
              <p>{pendingTasks}</p>
            </div>
          </div>

          <TaskInput addTask={addTask} />

          <div className="filter-buttons">
            <button
              className={filter === "all" ? "filter-btn active-filter" : "filter-btn"}
              onClick={() => setFilter("all")}
            >
              All
            </button>

            <button
              className={filter === "completed" ? "filter-btn active-filter" : "filter-btn"}
              onClick={() => setFilter("completed")}
            >
              Completed
            </button>

            <button
              className={filter === "pending" ? "filter-btn active-filter" : "filter-btn"}
              onClick={() => setFilter("pending")}
            >
              Pending
            </button>
          </div>

          <TaskList
            tasks={filteredTasks}
            deleteTask={deleteTask}
            toggleTask={toggleTask}
            darkMode={darkMode}
          />
        </div>
      </main>
    </div>
  );
}

export default App;