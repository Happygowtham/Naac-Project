import { Typography } from "@mui/material";
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
            <Typography sx={{ mt: 1 }}>&emsp; <b>Response:</b></Typography>
            <table border={1} style={{ borderCollapse: "collapse", marginLeft: "10px", marginTop: "10px" }}>
                <tr>
                    {
                        data?.map(res => {
                            return (
                                <>
                                    <td>
                                        <tr><td style={{ padding: "5px 15px" }}>{res?.year?.name}</td></tr>
                                        <tr><td style={{ padding: "5px", textAlign: "center" }}>{res?.answer}</td></tr>
                                    </td>
                                </>
                            )
                        })
                    }
                </tr>
            </table>
        </>
    )
}

export default MultiYearData