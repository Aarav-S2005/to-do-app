import {FaCheck} from "react-icons/fa";
import {useState} from "react";
import axios from "axios";

export default function EditListBox({id, title, setIsEditingList, setLists, setCurrentList}) {

    const [updatedTitle, setUpdatedTitle] = useState(title);

    const editList = async () => {
        if (updatedTitle === '') return;
        try{
            const result = await axios.put(`http://localhost:5000/api/lists/${id}`,
                {title: updatedTitle},
                {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            )
            if (result.data.success){
                setLists(prev =>
                    prev.map(list =>
                        list.id === id ? { ...list, title: updatedTitle } : list
                    )
                );
            }
            setCurrentList(updatedTitle)
        }catch(error) {
            alert(error.message);
        }
    }

    return (
        <span className={"flex justify-between items-center gap-1 mx-1"}>
            <input type={"text"}
                   className={"text-gray-500 w-full bg-offwhite text-lg p-2 rounded-xl border-none outline-none"}
                   onChange={(e) => {
                       setUpdatedTitle(e.target.value);
                   }} maxLength={16} value={updatedTitle}/>
            <FaCheck className={"p-2 text-gray-500 bg-offwhite rounded-xl"} size={"42"} onClick={
                () => {
                    editList();
                    setIsEditingList(false);
                }}/>
        </span>
    )
}