import {useEffect, useState} from "react";
import axios from "axios";


export default function DescModal({listId, todoId, setIsSeeingInfo}) {

    const [todoData, setTodoData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get(`http://localhost:5000/api/lists/${listId}/todos/${todoId}`,
                    {
                        headers: {
                            authorization: `Bearer ${localStorage.getItem("token")}`
                        }
                    }
                )
                if (result.data.success) {
                    setTodoData(result.data.data);
                }
            }catch (error) {
                alert(error.message)
            }
        }

        fetchData();

    }, [])

    return (
        <div className={"absolute inset-0 z-50"}>
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            ></div>
            <div
                className={"absolute inset-0  w-full min-h-screen overflow-hidden flex justify-center items-start mt-4 z-50"}>
                <div
                    className={"flex flex-col gap-5 font-patrick-hand-regular bg-[#e3ccb2] rounded-3xl p-6 w-1/3 border-[#968776] border-3"}>
                    <h2 className={"text-3xl "}>Title : </h2>
                    <h3 className={"text-2xl text-right"}>{todoData.title}</h3>
                    <hr className={"w-[80%] mx-auto"} />
                    <h2 className={"text-3xl "}>Description : </h2>
                    <p className={"text-2xl text-right"}>{todoData.description === '' || todoData.description === null ? 'No description Set.' : todoData.description}</p>
                    <hr className={"w-[80%] mx-auto"} />
                    <h2 className={"text-3xl "}>DueDate : </h2>
                    <p className={"text-2xl text-right"}>{todoData.due_date
                            ? new Date(todoData.due_date).toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric"
                            })
                            : "No Due Date Set."
                    }</p>
                    <hr className={"w-[80%] mx-auto"} />
                    <h2 className={"text-3xl "}>Completed : </h2>
                    <h3 className={"text-2xl text-right"}>{todoData.completed ? 'You have completed !!' : 'Not yet completed.'}</h3>
                    <hr className={"w-[80%] mx-auto"} />
                    <button className={"px-4 bg-offwhite py-2 rounded-2xl mt-4 hover:scale-105 active:scale-95 text-3xl"} onClick={() => setIsSeeingInfo(false)}> Close Window </button>
                </div>
            </div>

            </div>
    )
}