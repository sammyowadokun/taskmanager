import TaskItem from "./TaskItem";

function TaskList({tasks, deleteTask, toggleTask}){

    return(

        <ul className="">

            {tasks.map(task => (
                <TaskItem 
                    key={task.id} 
                    task={task} 
                    deleteTask={deleteTask}
                    toggleTask={toggleTask} 
                />
            ))}

        </ul>
    );

}

export default TaskList;