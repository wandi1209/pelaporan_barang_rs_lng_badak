import { Link } from "@inertiajs/react"

export default function Footer(){
    return(
        <Link href={route('developer')} className="text-white bg-cyan-900/60 p-3 fixed lg:right-5 bottom-5 cursor-pointer">
            <div>Web Developer = PKL SMK Negeri 1 Tahun 2023</div>
        </Link>
    )
}