export default function ButtonTambah({ children, ...props }){
    return(
        <button {...props} className='flex my-6 lg:my-0 mx-2 items-center font-medium px-4 py-2 tracking-widest rounded-lg shadow-xl bg-sky-700 hover:bg-sky-800 hover:scale-105 transition duration-300 focus:ring-2 focus:outline-none focus:ring focus:ring-sky-600'>
            { children }
        </button>
    )
}