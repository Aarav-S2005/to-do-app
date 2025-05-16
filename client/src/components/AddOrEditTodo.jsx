import {useState} from "react";


export default function AddOrEditTodo() {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");

    return(
        <div className={"absolute w-full min-h-screen backdrop-blur-2xl overflow-hidden flex justify-center items-center"}>
            <div className={"flex flex-col gap-5"}>
                <h1 className={"font-patrick-hand-regular text-3xl"}>Add / Edit</h1>
                <div className={"font-short-stack-regular flex flex-col gap-3"}>

                </div>
            </div>
        </div>
    )
}