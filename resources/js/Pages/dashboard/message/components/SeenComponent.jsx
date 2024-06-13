import { router } from "@inertiajs/react";
import { FaEyeSlash } from "react-icons/fa";


const SeenComponent = ({row}) => {
    function removeSeen()
    {
        router.post('/message/removeseen', {id:row.id}); 
    }
    if (row.status_id==2)
        return (
            <div>
                <button onClick={removeSeen} className='opacity-70 p-2'><FaEyeSlash className="text-sm"/></button>
            </div>
        )
    else
    return (
        <div className="p-2"><FaEyeSlash className="text-sm opacity-0"/></div>
    )
}

export default SeenComponent;