export default function Icon({ className = '', children, ...props }){
    return(
        <span {...props} className={`material-symbols-outlined ` + className}>
            {children}
        </span>
    );
}