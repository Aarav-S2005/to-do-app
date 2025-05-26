import { IoIosRadioButtonOff } from "react-icons/io";
import { IoIosRadioButtonOn } from "react-icons/io";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import AddOrEditTodo from "./modals/AddOrEditTodo.jsx";
import { useState } from "react";
import DescModal from "./modals/DescModal.jsx";

export default function Todo({title, id, completed, dueDate, listId, setTodos, setIsAddingEditing, isAddingEditing}) {

    const [complete, setComplete] = useState(completed);
    const [type, setType] = useState("");
    const [currentData, setCurrentData] = useState({});
    const [isSeeingInfo, setIsSeeingInfo] = useState(false);

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

    const edit = async () => {

        try{
            const result = await axios.get(`http://localhost:5000/api/lists/${listId}/todos/${id}`,
                {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );
            if (result.status === 200) {
                setCurrentData(result.data.data);
            }
        }catch (err){
            alert(err);
            return;
        }
        setIsAddingEditing(true);
        setType('edit');
    }

    const seeInfo = () => {
        setIsSeeingInfo(true);
    }

    return (
        <>
            {
                isAddingEditing && type==='edit' && <AddOrEditTodo
                    type={type}
                    prevData={currentData}
                    listId={listId}
                    setTodos={setTodos}
                    currentTodoId={id}
                    setIsAddingEditingTodo={setIsAddingEditing}
            />}
            {
                isSeeingInfo && <DescModal
                    todoId={id}
                    listId={listId}
                    setIsSeeingInfo={setIsSeeingInfo}
                />
            }
        <div className={"bg-[#E9DFC3] text-lg p-2 rounded-xl mx-1 flex justify-between items-center gap-2"} key={id}>
            <div className={"flex items-center gap-2 text-teal-500"}>
                {complete ? <IoIosRadioButtonOn onClick={handleRadioClick} /> : <IoIosRadioButtonOff onClick={handleRadioClick} />}
                {complete ? <span className={"text-gray-400 opacity-85"}>{title}</span>  : <span className={"text-gray-500"}>{title}</span>}
            </div>

            <div className={"flex items-start gap-1"}>
                <IoMdInformationCircleOutline className={"text-xl"} onClick={seeInfo} />
                <FaEdit onClick={edit} />
                <MdDelete onClick={deleteTodo} />
            </div>

        </div>
        </>

    )
}