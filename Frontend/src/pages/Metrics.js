import { Autocomplete, Box, Button, Card, Container, IconButton, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "src/AxiosInstance";
import { styled } from '@mui/material/styles';
import Upload from "./Upload";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

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
    const [open, setOpen] = useState(false);
    const [locationOptions, setLocationOptions] = useState([]);
    const [yearOptions, setYearOptions] = useState([]);
    const [enidenceData, setEvidenceData] = useState({});

    useEffect(() => {
        axiosInstance(`/metrics/?criteria=${id}`, { method: "GET" })
            .then(res => {
                setMetricData(res?.data);
            })
        axiosInstance(`/location`, { method: "GET" })
            .then(res => {
                setLocationOptions(res?.data);
            })
        axiosInstance(`/year`, { method: "GET" })
            .then(res => {
                setYearOptions(res?.data);
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleClickOpen = () => {
        setEvidenceData({});
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event, index) => {
        let newArr = [...metricData];
        let item = newArr[index];
        item = { ...item, answer: event.target.value, criteria: typeof item?.criteria === "object" ? item?.criteria?.id : item?.criteria };
        newArr[index] = item;
        setMetricData(newArr);
    }

    const handleYearChange = (event, value, id) => {
        let newArr = [...metricData];
        let item = newArr[id];
        item = { ...item, event: value };
        newArr[id] = item;
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
        setViewMode("View");
    }

    const handleEvidenceSubmit = (e, id) => {
        let postData = metricData[id]
        axiosInstance(`/evidence/`, {
            method: "POST",
            headers: {
                'Content-Type': 'multipart/form-data',
                'accept': '*/*'
            },
            data: {
                year: enidenceData?.evidence?.id,
                evidence_file: enidenceData?.evidence,
                criteria: postData?.criteria?.id,
                evidence_number: 1,
                description: enidenceData?.description,
                status: enidenceData?.status,
                location: 1,
                metrics: postData?.metric_id
            }
        }).then(res => {
            alert("Success");
        })
    }

    const handleEvidenceChange = (event, value) => {
        if (event === "location") {
            if (value) setEvidenceData({ ...enidenceData, [event]: value })
            else setEvidenceData({ ...enidenceData, [event]: "" })
        } else if (event.target.name === "evidence") {
            setEvidenceData({ ...enidenceData, evidence: event.target.files?.[0] })
        } else {
            setEvidenceData({ ...enidenceData, [event.target.name]: event.target.value })
        }
    }

    return (
        <>
            <Upload
                handleEvidenceChange={handleEvidenceChange}
                locationOptions={locationOptions}
                id={id}
                open={open}
                handleClose={handleClose}
                handleEvidenceSubmit={handleEvidenceSubmit}
            />
            {
                metricData?.length > 0 ? metricData?.map((res, id) => {
                    return (
                        <>
                            <Card sx={{ p: 2, m: 1 }}>
                                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <Typography>{res?.number} - {res?.question}</Typography>
                                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                                        <Autocomplete
                                            freeSolo={false}
                                            id="free-solo-2-demo"
                                            size="small"
                                            disableClearable
                                            fullWidth
                                            sx={{ width: 200 }}
                                            onChange={(event, value) => handleYearChange(event, value, id)}
                                            options={yearOptions?.map((option) => option?.from_year + " - " + option?.to_year)}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    label="Search Year"
                                                    InputProps={{
                                                        ...params.InputProps,
                                                        type: 'search',
                                                    }}
                                                />
                                            )}
                                        />
                                        <IconButton onClick={handleClickOpen} color="primary" aria-label="upload picture" component="label">
                                            <CloudUploadIcon />
                                        </IconButton>
                                    </Box>
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