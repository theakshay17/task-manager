import axios from "axios";
import { useState } from "react";

function UpdatePage({task, onClose, onUpdate}){
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);

    const handleUpdate = async() =>{
        try{
            const res = await axios.put(`http://localhost:8080/api/tasks/${task.taskId}`, {
                title,
                description, 
                completed: task.completed
            });
            onUpdate(res.data);
            onClose();
        }
        catch(err){
            console.log(err);
        }
    }

    return(
        <div className="updateWindowContainer">
            <div className="windowOverlay">
                <input 
                    type="text" 
                    placeholder="Title..." 
                    className="titleInput"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <input 
                    type="text" 
                    placeholder="Description..." 
                    className="descInput"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <button onClick={handleUpdate}>Update</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
}

export default UpdatePage;