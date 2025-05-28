import {Link} from "react-router";
import {useAuth} from "../hooks/useAuth.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import { IoIosAdd } from "react-icons/io";
import ListInput from "../components/inputs/ListInput.jsx";
import List from "../components/List.jsx";
import Todo from "../components/Todo.jsx";
import AddOrEditTodo from "../components/modals/AddOrEditTodo.jsx";

export default function ToDo() {

    const { logout } = useAuth();
    const [lists, setLists] = useState([]);
    const [todos, setTodos] = useState([]);
    const [username, setUsername] = useState("");
    const [token, setToken] = useState("");
    const [isAddingList, setIsAddingList] = useState(false);
    const [listTitle, setListTitle] = useState("");
    const [currentList, setCurrentList] = useState("");
    const [currentListId, setCurrentListId] = useState(0);
    const [isAddingEditing, setIsAddingEditing] = useState(false);

    const fetchLists = async () => {
        try{
            const token = localStorage.getItem("token");
            const result = await axios.get(`${import.meta.env.VITE_API_URL}lists`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
            if (result.status === 200) {
                setLists(result.data.data);
            }
            else{
                alert(result.status);
            }
        }catch(error){
            console.log(error);
        }
    }

    // Fetch all lists on when page is first shown up
    useEffect(() => {
        fetchLists();

        setUsername(localStorage.getItem("username"));
        setToken(localStorage.getItem("token"));

    }, []);

    const addList = async (title) => {
        if (title === "") {
            title = "untitled";
        }
        try {
            const result = await axios.post(
                "http://localhost:5000/api/lists",
                { title },
                {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                }
            );

            if (result.status === 201) {
                await fetchLists();
                setListTitle("");
            } else {
                alert("Internal Server Error");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleAddList = () => {
        setIsAddingList(true);
    }

    const handleAddTodo = () => {
        setIsAddingEditing(true);
    }

    return (
        <>
            {isAddingEditing && <AddOrEditTodo
                type={'add'}
                listId={currentListId}
                setTodos={setTodos}
                setIsAddingEditingTodo={setIsAddingEditing}
            />}
            <div className={"absolute w-screen h-screen overflow-hidden"}>
                <nav className={" w-full bg-[#273F4F] text-white p-3 flex items-center justify-between"}>
                    <span className={"font-pacifico-regular text-5xl select-none"}>ToDoVerse</span>
                    <div className={"flex items-center justify-center font-patrick-hand-regular gap-5 text-3xl"}>
                        <Link to={"/signup"}>
                            <button
                                className={"px-3 text-[#273F4F] rounded-lg bg-white cursor-pointer active:scale-95"}
                                onClick={logout}>LOGOUT
                            </button>
                        </Link>
                    </div>
                </nav>
                <div className={"flex relative"}>

                    {/* Lists Part */}

                    <div className="flex min-w-0 flex-col gap-2 basis-1/4 p-2 font-short-stack-regular bg-gray-800 h-[calc(100vh-64px)]">
                        <div className="py-5 flex justify-between items-center text-offwhite">
                            <span className="text-3xl font-patrick-hand-regular ml-1">{username}</span>
                            <IoIosAdd className="bg-offwhite text-[#273F4F] mx-1 rounded-xl" size="36"
                                      onClick={handleAddList}/>
                        </div>
                        <div className="flex-1 flex flex-col gap-2 overflow-y-auto no-scrollbar pb-4">
                            {isAddingList && (
                                <ListInput
                                    setterFunction={setListTitle}
                                    listTitle={listTitle}
                                    setIsAdding={setIsAddingList}
                                    addList={addList}
                                />
                            )}
                            {lists.map((item) => (
                                <List
                                    key={item.id}
                                    id={item.id}
                                    title={item.title}
                                    setLists={setLists}
                                    setTodos={setTodos}
                                    setCurrentList={setCurrentList}
                                    setCurrentListId={setCurrentListId}
                                />

                            ))}
                        </div>
                    </div>

                    {/* Todos Part */}

                    <div className={"flex min-w-0 flex-col gap-2 basis-3/4 font-short-stack-regular m-2 h-[calc(100vh-72px)]"}>
                        {todos &&
                            <div className={"flex justify-between items-center"}>
                                <span className={"text-teal-500 text-4xl font-patrick-hand-regular my-2 mx-3 "}>
                                    {currentList}
                                </span>
                                {currentList && <IoIosAdd className="bg-[#E9DFC3] text-[#273F4F] mx-1 rounded-xl" size="36" onClick={handleAddTodo}/>}
                            </div>}
                        <div className={"flex-1 flex flex-col gap-2 overflow-y-auto no-scrollbar pb-4"}>
                        {todos.map((item) => (
                            <Todo
                                key={item.id}
                                id={item.id}
                                title={item.title}
                                completed={item.completed}
                                dueDate={item.due_date}
                                listId={currentListId}
                                setTodos={setTodos}
                                setIsAddingEditing={setIsAddingEditing}
                                isAddingEditing={isAddingEditing}
                            />
                        ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}