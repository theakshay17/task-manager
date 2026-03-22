import axios from "axios";
import { useEffect, useState } from "react";
import UpdatePage from "./UpdatePage";

function TasksPage(){
    const today = new Date();
    const formatedDate = `${today.getDate()}-${today.getMonth()+1}-${today.getFullYear()}`;

    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [completed, setCompleted] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const handleSubmit = async(e)=> {
        e.preventDefault();

        if( !title.trim()) return;

        try{
            
            const response = await axios.post("http://localhost:8080/api/tasks", {
                "title" : title,
                "description" : description,
                "completed" : false
            });

            setTasks([...tasks, response.data]);

            setTitle("");
            setDescription("");
        }
        catch(error)
        {
            console.log(error);
        }
    }
 
    const handleDelete = (taskId) =>{
        axios.delete(`http://localhost:8080/api/tasks/${taskId}`);
        try{
            setTasks(prev => prev.filter(task => task.taskId != taskId))
        }
        catch{
            handleSubmit();
        }
    }

    useEffect(()=>{
        axios.get("http://localhost:8080/api/tasks")
        .then(res => setTasks(res.data))
        .catch(err => console.log(err));
    }, []);

    const handleToggle = (id) => {
    setTasks(prev =>
        prev.map(task =>
            task.taskId === id
                ? { ...task, completed: !task.completed }
                : task
        )
    );
};

    return(
        <div className="container">
            
            {/* Header */}
            <div className="header">
                <h1>Task Manager</h1>
                <p className="date">{formatedDate}</p>
            </div>

            {/* Task List */}
            <ul className="tasksList">
                { tasks.length === 0 ? (
                    <div className="message">
                        <h1>Add tasks...</h1>
                    </div>
                ) :
                ( 
                    tasks.map(task =>(
                        <li key={task.taskId} className={`list ${task.completed ? "completed" : ""}`}>
                            <h2>{task.title}</h2>
                            <p>{task.description}</p>
                            <div className="actions">
                                <button 
  onClick={() => handleToggle(task.taskId)} 
  className={`completeBtn ${task.completed ? "undo" : "done"}`}
>
  {task.completed ? "Undo" : "Mark as Done"}
</button>
                                <button onClick={() => handleDelete(task.taskId)} className="deleteBtn">Delete</button>
                                <button className="editBtn" onClick={() => {setSelectedTask(task); setIsEditing(true);}}>Edit</button>
                            </div>
                        </li>
                    ))
                )
            }
            </ul>

            {/* Input Area */}
            <div className="createArea">
                <input 
                    type="text" 
                    placeholder="Title..." 
                    className="titleInput"
                    onChange={(e) => setTitle(e.target.value)}
                />

                <input 
                    type="text" 
                    placeholder="Description..." 
                    className="descInput"
                    onChange={(e) => setDescription(e.target.value)}
                />

                <button onClick={handleSubmit}>Add</button>
            </div>

            {isEditing && selectedTask && (
                <UpdatePage
                    task={selectedTask}
                    onClose={() => setIsEditing(false)}
                    onUpdate={(updatedTask) => {
                        setTasks(prev =>
                            prev.map(t =>
                                t.taskId === updatedTask.taskId ? updatedTask : t
                            )
                        );
                    }}
                />
            )}
        </div>
    );
}

export default TasksPage;