//imports 
import { useRouteError } from "react-router-dom"


//if there is an error 
//it will take user to error page

export default function ErrorPage() {
    const error: any = useRouteError()

    return (
        <div className="text-danger">
            { error.message || error.statusText}
        </div>
    )
}