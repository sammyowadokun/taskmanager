import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import TaskItem from "./TaskItem";

function TaskList({tasks, deleteTask, toggleTask, darkMode, handleDragEnd}){

    return(

        <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="taskList">
                {(provided) => (

                    <ul className="task-List"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >

                        {tasks.map((task, index) => (
                            <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                                {(provided, snapshot) => (
                                    <ul
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        className={snapshot.isDragging ? "dragging-item" : ""}
                                    >
                                        <TaskItem 
                                            task={task} 
                                            deleteTask={deleteTask}
                                            toggleTask={toggleTask}
                                            darkMode={darkMode} 
                                        />
                                    </ul>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </ul>
                )}
            </Droppable>
        </DragDropContext>
    );
            
}

export default TaskList;