import { useState } from "react";

function TaskInput({addTask}){
    const [input, setInput] = useState("");

    function handleSubmit(e){
        e.preventDefault();
        addTask(input);
        setInput("");
    }

return(

    <form onSubmit={handleSubmit} className="task-input">
        
        <input
            type="text" placeholder="Add a new task..."
            value={input} onChange={(e)=>setInput(e.target.value)}
            className="input"
        />

        <button className="button" type="submit">
            Add
        </button>

    </form>

);

}

export default TaskInput;