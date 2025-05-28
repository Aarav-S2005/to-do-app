import {useState} from "react";
import axios from "axios";

export default function AddOrEditTodo({type, prevData, listId, setTodos, currentTodoId, setIsAddingEditingTodo, setType}) {

    const [title, setTitle] = useState(type === "edit" && prevData ? prevData.title : "");
    const [description, setDescription] = useState(type === "edit" && prevData ? (prevData.description ?? "") : "");
    const [dueDate, setDueDate] = useState(
        type === "edit" && prevData ? (prevData.due_date?.substring(0, 10) ?? "") : ""
    );


    const handleClick = async () => {
        if (title === "") return;
        const dueDate_ = dueDate === '' ? null : dueDate;
        try{
            if (type === 'add') {
                const result = await axios.post(`http://localhost:5000/api/lists/${listId}/todos`,
                    {title: title, description: description, dueDate: dueDate_},
                    {
                        headers: {
                            authorization: `Bearer ${localStorage.getItem("token")}`
                        }
                    }
                );
                if (result.data.success) {
                    setTodos(prev => [...prev, result.data.data]);
                }
            }
            else if (type === 'edit') {
                const result = await axios.put(`http://localhost:5000/api/lists/${listId}/todos/${currentTodoId}`,
                    {title: title, description: description, dueDate: dueDate_ },
                    {
                        headers: {
                            authorization: `Bearer ${localStorage.getItem("token")}`
                        }
                    }
                )
                if (result.data.success) {
                    const updatedTodo = { ...result.data.data, id: currentTodoId };
                    setTodos(prev =>
                        prev.map(todo =>
                            todo.id === currentTodoId ? updatedTodo : todo
                        )
                    );
                }
                setType("");
            }
            setIsAddingEditingTodo(false);
        }catch(err){
            alert(err)
        }
    }

    const closeModal = () => {
        setIsAddingEditingTodo(false);
    }

    return(
        <div className={"fixed inset-0 z-50"}>
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            ></div>
            <div className={"absolute inset-0  w-full min-h-screen overflow-hidden flex justify-center items-center z-50"}>
                <div className={"flex flex-col gap-5 font-patrick-hand-regular bg-[#e3ccb2] rounded-3xl p-6 w-1/3 border-[#968776] border-3"}>
                    <h1 className={"text-3xl"}>Add / Edit</h1>
                    <h2 className={"text-2xl"}>Todo Details</h2>
                    <hr className={"w-full"}/>
                    <div
                        className={"font-short-stack-regular flex flex-col gap-3 text-2xl gap-2 font-short-stack-regular"}>
                        <span>Title</span>
                        <input className={"bg-offwhite rounded-lg border-none outline-none px-3 py-1"} type={"text"}
                               onChange={(e) => setTitle(e.target.value)} required={true} value={title}/>
                        <span>Description</span>
                        <textarea
                            rows={3}
                            className="bg-offwhite rounded-lg border-none outline-none px-3 py-1 resize-none overflow-hidden"
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                        />
                        <span>Due Date</span>
                        <input className={"bg-offwhite rounded-lg border-none outline-none px-3 py-1"} type={"date"}
                               onChange={(e) => setDueDate(e.target.value)} value={dueDate}/>
                        <div className={"flex justify-center items-center gap-5"}>
                            <button className={"px-4 bg-offwhite py-2 rounded-2xl mt-4 hover:scale-105 active:scale-95"}
                                    onClick={handleClick}> Enter
                            </button>
                            <button className={"px-4 bg-offwhite py-2 rounded-2xl mt-4 hover:scale-105 active:scale-95"}
                                    onClick={closeModal}> Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}