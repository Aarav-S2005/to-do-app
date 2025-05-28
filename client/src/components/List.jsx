import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import {useState} from "react";
import EditListBox from "./inputs/EditListBox.jsx";

export default function List({id, title, setLists, setTodos, setCurrentList, setCurrentListId}) {

    const [isEditingList, setIsEditingList] = useState(false);

    const fetchTodos = async () => {
        try {
            const result = await axios.get(`${import.meta.env.VITE_API_URL}lists/${id}/todos`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            if (result.status === 200) {
                setTodos(result.data);
                setCurrentList(title);
                setCurrentListId(id);
            } else if (result.status === 404) {
                setTodos([]);
            }
        } catch (err) {
            alert(err);
        }
    }

    const handleDelete = async () => {
        try {
            const result = await axios.delete(`${import.meta.env.VITE_API_URL}lists/${id}`,
                {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );
            if (result.status === 204) {
                setLists(prev => prev.filter(list => list.id !== id));
                setCurrentList((prev) => {
                    if (prev === title) {
                        return "";
                    } else {
                        return prev;
                    }
                });
            }
        } catch (error) {
            alert(error.message);
        }
    }


    const handleEdit = () => {
        setIsEditingList(true);
    }

    if (isEditingList) {
        return (
            <EditListBox
                id={id}
                title={title}
                setLists={setLists}
                setIsEditingList={setIsEditingList}
            />
        )
    } else {
        return (
            <div className={"text-gray-500 bg-offwhite text-lg rounded-xl mx-1 flex justify-between items-center "}>
                <button onClick={fetchTodos}
                        className={"w-full text-left p-2 overflow-hidden text-ellipsis whitespace-nowrap"}>
                    {title}
                </button>
                <div className={"flex p-2"}>
                    <FaEdit size={"24"} onClick={handleEdit}/>
                    <MdDelete size={"24"} onClick={handleDelete}/>
                </div>
            </div>
        )
    }
}