import Icon from "./Icon";

export default function ButtonDelete({ onClick }){
    return(
        <button onClick={onClick} className='rounded-full p-2 flex items-center bg-red-600 mx-1 hover:bg-red-800 hover:scale-110 transition-transform duration-300'>
            <Icon>
                delete
            </Icon>
        </button>
    )
}