function TaskItem({task, deleteTask, toggleTask, darkMode}){

    return(

        <div className={darkMode ? "task-item task-animate dark-task-item" : "task-item task-animate"}>

            <div className="task-left">
                <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                />
                <span 
                    className={task.completed 
                        ? darkMode 
                            ? "task-text completed-task dark-completed-task" 
                            : "task-text completed-task" 
                        : darkMode
                            ? "task-text dark-task-text"
                            : "task-text"
                    }
                
                >
                    {task.text}
                </span>
            </div>

            <button onClick={()=>deleteTask(task.id)}
                    className="delete-btn"
                >
                Delete
            </button>

        </div>

    );

}

export default TaskItem;