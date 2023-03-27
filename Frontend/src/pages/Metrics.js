import { Box, Button, Card, Container, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "src/AxiosInstance";
import { styled } from '@mui/material/styles';
import Upload from "./Upload";


const StyledContent = styled('div')(({ theme }) => ({
    margin: 'auto',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: theme.spacing(12, 0),
}));


const MetricsEdit = ({ setViewMode, getData }) => {

    const { id } = useParams();
    const [metricData, setMetricData] = useState([]);

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
        item = { ...item, answer: event.target.value, criteria: typeof item?.criteria === "object" ? item?.criteria?.id : item?.criteria };
        newArr[index] = item;
        setMetricData(newArr);
    }

    const handleSubmit = () => {
        let newArr = []
        metricData?.forEach(res => newArr?.push({ ...res, criteria: typeof res?.criteria === "object" ? res?.criteria?.id : res?.criteria }))
        axiosInstance(`/metrics-bulk-create/`, { method: "PUT", data: newArr })
            .then(res => {
                alert("Success");
            })
    }

    const handleCancel = () => {
        getData();
        setViewMode("View")
    }

    return (
        <>
            {
                metricData?.length > 0 ? metricData?.map((res, id) => {
                    return (
                        <>
                            <Card sx={{ p: 2, m: 1 }}>
                                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <Typography>{res?.number} - {res?.question}</Typography>
                                    <Upload />
                                </Box>
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
                    : <>
                        <Container>
                            <StyledContent sx={{ textAlign: 'center', alignItems: 'center' }}>
                                <Typography variant="h3" paragraph>
                                    No Metrics Found
                                </Typography>
                            </StyledContent>
                        </Container>
                    </>
            }
            {
                metricData?.length > 0 &&
                <Box sx={{ display: "flex", justifyContent: "flex-end", m: 1 }}>
                    <Button size="small" sx={{ mr: 2 }} variant="contained" color="error" onClick={() => handleCancel()}>Cancel</Button>
                    <Button size="small" variant="contained" onClick={handleSubmit}>Submit</Button>
                </Box>
            }
        </>
    )
}

export default MetricsEdit;