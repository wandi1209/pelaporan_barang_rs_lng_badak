import Icon from "./Icon"

export default function ButtonEdit({ onClick }) {
    return(
        <button onClick={onClick} className='rounded-full p-2 flex items-center bg-blue-600 mx-1 hover:bg-blue-800 hover:scale-110 transition-transform duration-300'>
            <Icon>
              edit
            </Icon>
        </button>
    )
}