import { FaCheck } from "react-icons/fa";

export default function ListInput({ setterFunction, listTitle, setIsAdding, addList }) {
    return (
        <span className={"flex justify-between items-center gap-1 mx-1"}>
            <input type={"text"} className={"text-gray-500 w-full bg-offwhite text-lg p-2 rounded-xl border-none outline-none"} onChange={(e) => {
                if (e.target.value.length <= 16){
                    setterFunction(e.target.value)
                }
            }} />
            <FaCheck className={"p-2 text-gray-500 bg-offwhite rounded-xl"} size={"42"} onClick={() => {
                setIsAdding(false);
                addList(listTitle);
            }}/>
        </span>
    )
}