import { Link } from "react-router-dom";

export default function Dashboard() {

    const data = JSON.parse(atob(localStorage.getItem('user')))
    var criData = data?.accesses

    return (
        <>
            {
                criData?.map((res, id) => {
                    return (
                        <div>
                            <Link to={`/metrics/${res?.criteria_id}`}>{id + 1}. {res?.title} </Link>
                        </div>
                    )
                })
            }
        </>
    )
}