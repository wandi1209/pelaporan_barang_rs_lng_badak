export default function ButtonImport({ children, ...props }){
    return(
        <button {...props} className='flex my-6 lg:my-0 mx-2 items-center font-medium p-2 rounded-lg px-4 py-2 tracking-widest shadow-xl bg-green-700 hover:bg-green-800 hover:scale-105 transition duration-300 focus:ring-2 focus:outline-none focus:ring focus:ring-green-600'>
            {children}
        </button>
    )
}