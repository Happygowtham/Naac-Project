import { Box, Button, Card, Container, Typography } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "src/AxiosInstance";
import { styled } from '@mui/material/styles';
import MetricsEdit from "./Metrics";
import Evidences from "./Evidences";
import { groupBy } from "src/Functions/Functions";


const StyledContent = styled('div')(({ theme }) => ({
    margin: 'auto',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: theme.spacing(12, 0),
}));


const MetricsView = () => {

    const { id } = useParams();
    const [metricData, setMetricData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState("View");
    const [canEdit, setCanEdit] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        getData()
        const data = JSON.parse(atob(localStorage.getItem('naac_dbcy_user')))
        var dataAccess = data?.accesses?.filter(temp => +temp?.criteria_id === +id)
        if (dataAccess?.length > 0) setCanEdit(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getData = () => {
        axiosInstance(`/metrics/?criteria=${id}`, { method: "GET" })
            .then(res => {
                let dat = res?.data;
                let eviData = groupBy(dat, "key_identifier");
                setMetricData(eviData);
                setLoading(false);
            }).catch(err => {
                setLoading(false)
            })
    }

    const handleView = () => {
        getData();
        setViewMode("View")
    }

    return (
        <>
            <Box sx={{ display: "flex", justifyContent: "space-between", m: 1 }}>
                <Typography variant="h5">Criterion {Object.values(metricData)?.[0]?.[0]?.criteria?.number} - {Object.values(metricData)?.[0]?.[0]?.criteria?.name}</Typography>
                <Box>
                    {canEdit ? viewMode === "View" ?
                        <Button size="small" sx={{ mr: 2 }} variant="contained" color="primary" onClick={() => setViewMode("Edit")}>Edit</Button>
                        : <Button size="small" sx={{ mr: 2 }} variant="contained" color="primary" onClick={() => handleView()}>View</Button>
                        : ""
                    }
                    <Button sx={{ mr: 2 }} size="small" variant="contained" color="error" onClick={() => navigate("/dashboard")}>Back</Button>
                </Box>
            </Box>
            {
                viewMode === "View" ?
                    Object.values(metricData)?.length > 0 ? Object.values(metricData)?.map((res, id) => {
                        return (
                            <>
                                <Typography variant="h6" sx={{ pl: 3 }}>{res?.[0]?.key_identifiers?.number} - {res?.[0]?.key_identifiers?.name}</Typography>
                                {res?.map((item) => {
                                    return (
                                        <>
                                            <Card sx={{ p: 2, m: 1 }}>
                                                <Typography sx={{ fontWeight: "600" }}>{item?.number} - {item?.question} </Typography>
                                                <Typography sx={{ mt: 1 }}>&emsp; <b>Response:</b> {item?.answer}</Typography>
                                                <Evidences metric_id={item?.metric_id} />
                                            </Card>
                                        </>
                                    )
                                })}
                            </>
                        )
                    })
                        : <>
                            <Container>
                                <StyledContent sx={{ textAlign: 'center', alignItems: 'center' }}>
                                    <Typography variant="h3" paragraph>
                                        {loading ? "Loading..." : "No Metrics Found"}
                                    </Typography>
                                </StyledContent>
                            </Container>
                        </>
                    :
                    <MetricsEdit setViewMode={setViewMode} getData={getData} />
            }
        </>
    )
}

export default MetricsView;