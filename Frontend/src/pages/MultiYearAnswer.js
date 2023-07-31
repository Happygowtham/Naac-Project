import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axiosInstance from "src/AxiosInstance";


const MultiYearAnswer = ({ data, year, handleCancel }) => {

    const [metricAnswer, setMetricAnswer] = useState([]);

    useEffect(() => {
        data && getAnswerData(data)
    }, [])


    const getAnswerData = () => {
        axiosInstance(`/metric-answer/?metric_id=${data?.metric_id}&year=${year?.year}`, { method: "GET" })
            .then(res => {
                setMetricAnswer(res?.data || "")
                // setAnswerData(res?.data?.[0])
            })
    }

    const handleChange = (e, index) => {
        let temp = [...metricAnswer]
        temp[index] = { ...temp[index], answer: e.target.value }
        setMetricAnswer(temp);
    }


    const validate = () => {
        let temp = []
        let vals = metricAnswer?.forEach(res => temp.push(res?.answer))
        return temp.includes("") ? false : true;
    }

    const handleSubmit = () => {
        if (validate() && metricAnswer?.length === data?.year?.length) {
            metricAnswer?.forEach(res => {
                let url = res?.id ? `/metric-answer/${res?.id}/` : "/metric-answer/"
                let method = res?.id ? "PUT" : "POST"
                axiosInstance(url, {
                    method: method, data: { year: year?.year, metric_id: data?.metric_id, answer: res?.answer }
                })
            })
            alert("Success");
        } else {
            alert("Please Enter all the response.")
        }

    }

    const onCancel = () => {
        handleCancel()
    }

    return (
        <>
            {
                data?.year_options?.map((yearData, id) => {
                    return (
                        <>
                            {
                                data?.type === "QLM" ?
                                    <Box sx={{ display: "flex" }}>
                                        <Typography sx={{ p: 2, width: "10%" }}>{`${yearData?.from_year} - ${yearData?.to_year}`}</Typography>
                                        <TextField
                                            name={data?.metric_id}
                                            onChange={(e) => handleChange(e, id)}
                                            multiline
                                            fullWidth
                                            value={metricAnswer?.[id]?.answer}
                                            rows={4}
                                            sx={{ mt: 1 }}
                                        />
                                    </Box>
                                    :
                                    <Box sx={{ display: "flex" }}>
                                        <Typography sx={{ p: 2 }}>{`${yearData?.from_year} - ${yearData?.to_year}`}</Typography>
                                        <TextField
                                            name={data?.metric_id}
                                            onChange={(e) => handleChange(e, id)}
                                            size="small"
                                            sx={{ mt: 1 }}
                                            type="number"
                                            value={metricAnswer?.[id]?.answer}
                                        />
                                    </Box>
                            }
                        </>
                    )
                })
            }
            <Box sx={{ display: "flex", justifyContent: "flex-end", m: 1 }}>
                <Button size="small" sx={{ mr: 2 }} variant="contained" color="error" onClick={onCancel}>Cancel</Button>
                <Button
                    size="small"
                    variant="contained"
                    onClick={handleSubmit}
                // disabled={Object}
                >Submit</Button>
            </Box>
        </>
    )
}

export default MultiYearAnswer;