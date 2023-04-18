import { useState } from "react";
import { useEffect } from "react"
import axiosInstance from "src/AxiosInstance";

const MultiYearData = ({ metric }) => {

    const [data, setData] = useState([])

    useEffect(() => {
        axiosInstance(`/metric-answer/?metric_id=${metric}`, { method: "GET" })
            .then(res => { setData(res?.data) })
    }, [metric])

    return (
        <>
            <table border={1}>
                {
                    data?.map(res => {
                        return (
                            <>
                                <tr>
                                    <td>{res?.year?.name}</td>
                                    <td>{res?.answer}</td>
                                </tr>
                            </>
                        )
                    })
                }
            </table>
        </>
    )
}

export default MultiYearData