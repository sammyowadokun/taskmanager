function TaskItem({task, deleteTask, toggleTask, darkMode}){

    return(

        <li className={darkMode ? "task-item task-animate dark-task-item" : "task-item task-animate"}>

            <div className="task-left">
                <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                />
                <span className={task.completed ? "completed-task" : ""}>
                    {task.text}
                </span>
            </div>

            <button onClick={()=>deleteTask(task.id)}
                    className="delete-btn"
                >
                Delete
            </button>

        </li>

    );

}

export default TaskItem;