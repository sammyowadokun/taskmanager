function TaskItem({task, deleteTask, toggleTask}){

    return(

        <li className="task-item">

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