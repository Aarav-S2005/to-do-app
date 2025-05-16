import { IoIosRadioButtonOff } from "react-icons/io";
import { IoIosRadioButtonOn } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import {useState} from "react";

export default function Todo({title, id, completed, listId, setTodos}) {

    const [complete, setComplete] = useState(completed);

    const deleteTodo = async () => {
        try{
            const result = await axios.delete(`http://localhost:5000/api/lists/${listId}/todos/${id}`,
                {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })

            if (result.status === 204) {
                setTodos(prev => prev.filter(todo => todo.id !== id));
                console.log("deleted");
            }
        }catch(err){
            alert(err)
        }
    }

    const handleRadioClick = async () => {
        try{
            const result = await axios.put(`http://localhost:5000/api/lists/${listId}/todos/${id}`,
                {completed: !completed},
                {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            )
            if (result.status === 201) {
                setComplete(!complete)
            }
        }
        catch(err){
            alert(err);
        }
    }

    return (
        <div className={"bg-[#E9DFC3] text-lg p-2 rounded-xl mx-1 flex justify-between items-center gap-2"}>
            <div className={"flex items-center gap-2 text-teal-500"}>
                {complete ? <IoIosRadioButtonOn onClick={handleRadioClick} /> : <IoIosRadioButtonOff onClick={handleRadioClick} />}
                {complete ? <span className={"text-gray-400 opacity-85"}>{title}</span>  : <span className={"text-gray-500"}>{title}</span>}
            </div>

            <div className={"flex"}>
                <FaEdit />
                <MdDelete onClick={deleteTodo} />
            </div>

        </div>
    )
}