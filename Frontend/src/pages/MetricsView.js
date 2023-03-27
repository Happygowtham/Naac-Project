import { Box, Button, Card, Container, Typography } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "src/AxiosInstance";
import { styled } from '@mui/material/styles';
import MetricsEdit from "./Metrics";


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
                setMetricData(res?.data);
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
                <Typography variant="h5" sx={{ pl: 2 }}>{metricData?.[0]?.criteria?.id}. {metricData?.[0]?.criteria?.name}</Typography>
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
                    metricData?.length > 0 ? metricData?.map((res, id) => {
                        return (
                            <>
                                <Card sx={{ p: 2, m: 1 }}>
                                    <Typography sx={{ fontWeight: "600" }}>{res?.number} - {res?.question} </Typography>
                                    <Typography sx={{ mt: 1 }}>&emsp;{res?.answer}</Typography>
                                </Card>

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