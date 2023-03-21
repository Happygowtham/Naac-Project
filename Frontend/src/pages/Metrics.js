import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "src/AxiosInstance";


const Metrics = () => {

    const { id } = useParams();
    const [metricData, setMetricData] = useState([]);

    useEffect(() => {
        axiosInstance(`/metrics/?criteria=${id}`, { method: "GET" })
            .then(res => {
                setMetricData(res?.data);
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleChange = (e) => {
        console.log('e: ', e);
    }

    return (
        <>
            {
                metricData?.map((res, id) => {
                    var type = res?.type === "QLM" ? "text" : "number"
                    return (
                        <div>
                            {id + 1}. {res?.question}
                            <input name={res?.metric_id} type={type} onChange={handleChange} />
                        </div>
                    )
                })
            }
        </>
    )
}

export default Metrics;