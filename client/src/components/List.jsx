import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function List({key, title}) {
    return (
        <div className={"text-gray-500 bg-offwhite text-lg p-2 rounded-xl mx-1 flex justify-between items-center"}>
            <button
                key={key}
            >
                {title}
            </button>
            <div className={"flex"}>
                <FaEdit size={"24"} />
                <MdDelete size={"24"} />
            </div>
        </div>
    )
}