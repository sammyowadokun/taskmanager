import TaskItem from "./TaskItem";

function TaskList({tasks, deleteTask, toggleTask, darkMode}){

    return(

        <ul className="space-y-3">

            {tasks.map(task => (
                <TaskItem 
                    key={task.id} 
                    task={task} 
                    deleteTask={deleteTask}
                    toggleTask={toggleTask}
                    darkMode={darkMode} 
                />
            ))}

        </ul>
    );

}

export default TaskList;