import { Mail } from 'lucide-react';


const Footer = () => {
    return (
        <div className="absolute bottom-0 w-full h-24 flex justify-between px-32 items-center bg-slate-100 max-md:px-8">
            <div className="text-xs text-slate-600">Copyright © 2024 Yiming Liao</div>
            <div className='flex justify-center items-center gap-3'>

                <a href="mailto: ivancreate1997@gmail.com"><Mail className='scale-75' /></a>
            </div>
        </div>
    )
}
export default Footer