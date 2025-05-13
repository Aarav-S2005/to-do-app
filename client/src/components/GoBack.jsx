import {IoChevronBack} from "react-icons/io5";
import {Link} from "react-router";


export default function GoBack() {
    return (
        <Link to={"/"}>
                <span className="absolute top-6 left-6 z-50 flex items-center justify-center cursor-pointer">
                  <IoChevronBack className="text-white text-3xl"/>
                  <span className="text-white font-patrick-hand-regular text-2xl ml-2">Go Home</span>
                </span>
        </Link>
    )
}