

export default function InputBox({type, setterFuntion, maxLength}) {
    return (
        <input
            type={type}
            className={"font-short-stack-regular px-5 py-2 border-none outline-none bg-offwhite rounded-4xl text-black"}
            onChange={(e) => {setterFuntion(e.target.value)
            }} maxLength={maxLength}
        />
    )
}