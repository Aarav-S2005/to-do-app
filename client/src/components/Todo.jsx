import { IoIosRadioButtonOff } from "react-icons/io";
import { IoIosRadioButtonOn } from "react-icons/io";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import AddOrEditTodo from "./modals/AddOrEditTodo.jsx";
import {useEffect, useState} from "react";
import DescModal from "./modals/DescModal.jsx";

export default function Todo({title, id, completed, dueDate, listId, setTodos, setIsAddingEditing, isAddingEditing}) {

    const [complete, setComplete] = useState(completed);
    const [type, setType] = useState("");
    const [currentData, setCurrentData] = useState({});
    const [isSeeingInfo, setIsSeeingInfo] = useState(false);
    const [daysToGo, setDaysToGo] = useState(0);

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
                console.log(result.data.data);
                setCurrentData(result.data.data);
            }
        }catch (err){
            alert(err);
            return;
        }
        setType('edit');
        setIsAddingEditing(true);

    }

    const seeInfo = () => {
        setIsSeeingInfo(true);
    }

    useEffect(() => {

        if (complete){
            setDaysToGo(0);
        }

        const now = new Date();
        const due = new Date(dueDate);
        now.setHours(0, 0, 0, 0);
        due.setHours(0, 0, 0, 0);

        const difference = due - now;
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));

        setDaysToGo(days);
    }, [dueDate, complete]);

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
                    setType={setType}
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
                {complete ? <span className={"text-gray-400 opacity-85 line-through"}>{title}</span> :
                    !dueDate ? <span className={"text-gray-700"}>{title}</span> :
                        daysToGo < 0 ? <span className={"text-red-500"}>{title}</span> :
                            <span className={"text-green-500"}>{title}</span>
                }
            </div>

            <div className={"flex items-start gap-1"}>
                {daysToGo >= 0 && !complete && <span className={"text-gray-500 opacity-85 mr-4"}>{daysToGo} days left !!</span>}
                <IoMdInformationCircleOutline className={"text-xl"} onClick={seeInfo} />
                <FaEdit onClick={edit} />
                <MdDelete onClick={deleteTodo} />
            </div>

        </div>
        </>
    )
}