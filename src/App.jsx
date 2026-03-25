import './App.css'
import { useEffect, useState } from "react";
import Header from "./components/Header";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import { 
    FaClipboardList, FaTasks, FaCheckCircle, FaHourglassHalf, 
    FaChartPie, FaCog, FaMoon, FaSun, FaBars, FaTimes,
 } from "react-icons/fa";

function App() {

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [filter, setFilter] = useState("all");
  const [activeNav, setActiveNav] = useState("dashboard");
  const [menuOpen, setMenuOpen] = useState(false)

  const [darkMode, setDarkMode] = useState(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    return savedDarkMode ? JSON.parse(savedDarkMode) : false;
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  // Add a task
  function addTask(taskText){
  
    if(taskText.trim() === "") return;
    const newTask = {
      id: Date.now().toString(),
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

  // Handle settings //
  function clearCompletedTasks() {
    setTasks(tasks.filter(task => !task.completed));
  }

  function clearAllTasks() {
    setTasks([]);
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
  } else if (section === "completed") {
    setFilter("completed");
  } else if (section === "pending") {
    setFilter("pending");
  }

  // Scroll to top
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });

  setMenuOpen(false);
}

  // Handle drag and drop //
  function handleDragEnd(result) {
    if (!result.destination) return;

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    const reorderedFilteredTasks = [...filteredTasks];
    const [movedTask] = reorderedFilteredTasks.splice(sourceIndex, 1);
    reorderedFilteredTasks.splice(destinationIndex, 0, movedTask);

    const filteredTaskIds = filteredTasks.map(task => task.id);

    const nonFilteredTasks = tasks.filter(
      (task) => !filteredTaskIds.includes(task.id)
    );

    setTasks([...nonFilteredTasks, ...reorderedFilteredTasks]);
  }

return (

    <div className={darkMode ? "dashboard-layout dark-mode" : "dashboard-layout"}>
      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>
      <aside className={menuOpen ? "sidebar mobile-open" : "sidebar"}>
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

        <button className="theme-toggle" onClick={() => {
            handleNavClick("dashboard");
            setDarkMode(!darkMode)
          }}>
          {darkMode ? <FaSun className="nav-icon" /> : <FaMoon className="nav-icon" />}
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </aside>

      <main className="main-content">
        <div className="task-card fade-in">
          {activeNav  === "settings" ? ( 
            <div className="settings-panel">
              <div className="settings-header">
                <h2>Settings</h2>
                <p>Manage your dashboard preferences</p>
              </div>

              <div className="settings-group">
                <h3>Appearance</h3>
                <button
                  className="settings-btn primary-btn"
                  onClick={() => setDarkMode(!darkMode)}
                >
                  {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                </button>
              </div>

              <div className="settings-group">
                <h3>Task Management</h3>
                <button
                  className="settings-btn warning-btn"
                  onClick={clearCompletedTasks}
                >
                  Clear Completed Tasks
                </button>

                <button
                  className="settings-btn danger-btn"
                  onClick={clearAllTasks}
                >
                  Delete All Tasks
                </button>
              </div>
            </div>
          ) : (
            <>
              <Header />

              <div className="stats-container">
                <div className="stat-card stat-total">
                  <div className="stat-top">
                    <FaTasks className="stat-icon" />
                    <h3>Total Tasks</h3>
                  </div>
                  <p>{tasks.length}</p>
                </div>

                <div className="stat-card stat-completed">
                  <div className="stat-top">
                    <FaCheckCircle className="stat-icon" />
                    <h3>Completed</h3>
                  </div>
                  <p>{completedTasks}</p>
                </div>

                <div className="stat-card stat-pending">
                  <div className="stat-top">
                    <FaHourglassHalf className="stat-icon" />
                    <h3>Pending</h3>
                  </div>
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
                handleDragEnd={handleDragEnd}
              />
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;