import { Box, Button, Card, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "src/AxiosInstance";


const Metrics = () => {

    const { id } = useParams();
    const [metricData, setMetricData] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        axiosInstance(`/metrics/?criteria=${id}`, { method: "GET" })
            .then(res => {
                setMetricData(res?.data);
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleChange = (event, index) => {
        let newArr = [...metricData];
        let item = newArr[index];
        item = { ...item, answer: event.target.value };
        newArr[index] = item;
        setMetricData(newArr);
    }

    const handleSubmit = () => {
        axiosInstance(`/metrics-bulk-create/`, { method: "PUT", data: metricData })
            .then(res => {
                alert("Success");
            })
    }

    return (
        <>
            <Box sx={{ display: "flex", justifyContent: "space-between", m: 1 }}>
                <Typography variant="h5" sx={{ pl: 2 }}>{metricData?.[0]?.criteria?.name}</Typography>
                <Button sx={{ mr: 2 }} variant="contained" color="error" onClick={() => navigate("/dashboard")}>Back</Button>
            </Box>
            {
                metricData?.map((res, id) => {
                    return (
                        <>
                            <Card sx={{ p: 2, m: 1 }}>
                                {res?.number} - {res?.question} <br />
                                {
                                    res?.type === "QLM" ?
                                        <TextField
                                            name={res?.metric_id}
                                            onChange={(e) => handleChange(e, id)}
                                            multiline
                                            fullWidth
                                            value={res?.answer}
                                            rows={4}
                                            sx={{ mt: 1 }}
                                        />
                                        :
                                        <TextField
                                            name={res?.metric_id}
                                            onChange={(e) => handleChange(e, id)}
                                            size="small"
                                            sx={{ mt: 1 }}
                                            type="number"
                                            value={res?.answer}
                                        />
                                }
                            </Card>

                        </>
                    )
                })
            }
            <Box sx={{ display: "flex", justifyContent: "flex-end", m: 1 }}>
                <Button sx={{ mr: 2 }} variant="contained" color="error" onClick={() => navigate("/dashboard")}>Cancel</Button>
                <Button variant="contained" onClick={handleSubmit}>Submit</Button>
            </Box>
        </>
    )
}

export default Metrics;