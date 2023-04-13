import { Box, Button, Card, Container, IconButton, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import axiosInstance from "src/AxiosInstance";
import { styled } from '@mui/material/styles';
import Upload from "./Upload";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { groupBy } from "src/Functions/Functions";

const StyledContent = styled('div')(({ theme }) => ({
    margin: 'auto',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: theme.spacing(12, 0),
}));


const MetricsEdit = ({ setViewMode, getData, year, metricData, setMetricData }) => {

    const [open, setOpen] = useState(false);
    const [locationOptions, setLocationOptions] = useState([]);
    const [evidenceData, setEvidenceData] = useState({
        location: "",
        status: "In-Progress",
        description: "",
        evidence: "",
        metric_id: ""
    });
    const [errors, setErrors] = useState([]);
    const [evidenceErrors, setEvidenceErrors] = useState([]);

    useEffect(() => {
        axiosInstance(`/location`, { method: "GET" })
            .then(res => {
                setLocationOptions(res?.data);
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleClickOpen = (id) => {
        setOpen(true);
        setEvidenceData({ ...evidenceData, metric_id: id })
    };

    const handleClose = () => {
        setOpen(false);
        setEvidenceData({
            location: "",
            status: "In-Progress",
            description: "",
            evidence: "",
            year: ""
        })
        setEvidenceErrors([])
    };

    const validate = () => {
        let ret_value = []
        Object.values(metricData).flat(1)?.forEach((store, index) => {
            const error = {};
            if (!store.year) error.year = "Year is required";
            if (!store.answer) error.answer = "Answer is required";
            const temp = errors;
            temp[store?.metric_id] = error;
            setErrors([...temp]);
            ret_value.push(Object.values(error).every((e) => e === ""));
        })
        return ret_value
    };

    const evidenceValidate = (fieldValues) => {
        let temp = { ...evidenceErrors };
        if ("location" in fieldValues) {
            temp.location = fieldValues.location === "" ? "Location is required" : "";
        }
        if ("status" in fieldValues) {
            temp.status = fieldValues.status === "" ? "Status is required" : "";
        }
        if ("description" in fieldValues) {
            temp.description = fieldValues.description?.trim() === "" ? "Description is required" : "";
        }
        if ("evidence" in fieldValues) {
            temp.evidence = fieldValues.evidence === "" ? "Evidence is required" : "";
        }

        setEvidenceErrors({
            ...temp,
        });

        return Object.values(temp).every((x) => x === "");
    };

    const handleChange = (event, id) => {
        let newArr = [...Object.values(metricData).flat(1)];
        let index = [...Object.values(metricData).flat(1)].findIndex(res => res?.metric_id === id)
        let item = newArr[index];
        item = { ...item, answer: event.target.value, criteria: typeof item?.criteria === "object" ? item?.criteria?.id : item?.criteria };
        newArr[index] = item;
        let fiValue = groupBy(newArr, "key_identifier");
        setMetricData(fiValue);
    }

    const handleSubmit = () => {
        if (!validate().includes(false)) {
            let newArr = []
            Object.values(metricData).flat(1)?.forEach(res => newArr?.push({
                ...res,
                criteria: typeof res?.criteria === "object" ? res?.criteria?.id : res?.criteria,
                year: year?.year
            }))
            axiosInstance(`/metrics-bulk-create/`, { method: "PUT", data: newArr })
                .then(res => {
                    alert("Success");
                })
        }
    }

    const handleCancel = () => {
        getData();
        setViewMode("View");
    }

    const handleEvidenceSubmit = (e) => {
        if (evidenceValidate(evidenceData)) {
            let postData = Object.values(metricData).flat(1)?.filter(res => +res?.metric_id === +evidenceData?.metric_id)
            axiosInstance(`/evidence/`, {
                method: "POST",
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'accept': '*/*'
                },
                data: {
                    year: year?.year,
                    evidence_file: evidenceData?.evidence,
                    criteria: typeof postData?.[0]?.criteria === "object" ? postData?.[0]?.criteria?.id : postData?.[0]?.criteria,
                    evidence_number: 1,
                    description: evidenceData?.description,
                    status: evidenceData?.status,
                    location: evidenceData?.location,
                    metrics: evidenceData?.metric_id
                }
            }).then(res => {
                alert("Success");
                handleClose();
            })
        }
    }

    const handleEvidenceChange = (event, value) => {
        if (event === "location") {
            if (value) setEvidenceData({ ...evidenceData, [event]: value?.id })
            else setEvidenceData({ ...evidenceData, [event]: "" })
        } else if (event === "year") {
            if (value) setEvidenceData({ ...evidenceData, [event]: value })
            else setEvidenceData({ ...evidenceData, [event]: "" })
        } else if (event === "remove_file") {
            setEvidenceData({ ...evidenceData, evidence: "" })
        } else if (event?.target?.name === "evidence") {
            setEvidenceData({ ...evidenceData, evidence: event.target.files?.[0] })
        } else {
            setEvidenceData({ ...evidenceData, [event.target.name]: event.target.value })
        }
    }

    return (
        <>
            <Upload
                handleEvidenceChange={handleEvidenceChange}
                locationOptions={locationOptions}
                open={open}
                handleClose={handleClose}
                handleEvidenceSubmit={handleEvidenceSubmit}
                evidenceErrors={evidenceErrors}
                evidenceData={evidenceData}
            />
            {
                Object.values(metricData)?.length > 0 ? Object.values(metricData)?.map((res, id) => {
                    return (
                        <>
                            <Typography variant="h6" sx={{ pl: 3 }}>{res?.[0]?.key_identifiers?.number} - {res?.[0]?.key_identifiers?.name}</Typography>
                            {
                                res?.map((item) => {
                                    return (
                                        <>
                                            <Card sx={{ p: 2, m: 1 }}>
                                                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                                    <Typography>{item?.number} - {item?.question}</Typography>
                                                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                                                        <IconButton onClick={() => handleClickOpen(item?.metric_id)} color="primary" aria-label="upload picture" component="label">
                                                            <CloudUploadIcon />
                                                        </IconButton>
                                                    </Box>
                                                </Box>
                                                {
                                                    item?.type === "QLM" ?
                                                        <TextField
                                                            name={item?.metric_id}
                                                            onChange={(e) => handleChange(e, item?.metric_id)}
                                                            multiline
                                                            fullWidth
                                                            value={item?.answer}
                                                            rows={4}
                                                            sx={{ mt: 1 }}
                                                            {...(errors[item?.metric_id] &&
                                                                errors[item?.metric_id].answer && {
                                                                error: true,
                                                                helperText: errors[item?.metric_id].answer,
                                                            })}
                                                        />
                                                        :
                                                        <TextField
                                                            name={item?.metric_id}
                                                            onChange={(e) => handleChange(e, item?.metric_id)}
                                                            size="small"
                                                            sx={{ mt: 1 }}
                                                            type="number"
                                                            value={item?.answer}
                                                            {...(errors[item?.metric_id] &&
                                                                errors[item?.metric_id].answer && {
                                                                error: true,
                                                                helperText: errors[item?.metric_id].answer,
                                                            })}
                                                        />
                                                }
                                            </Card>
                                        </>
                                    )
                                })
                            }
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
                Object.values(metricData)?.length > 0 &&
                <Box sx={{ display: "flex", justifyContent: "flex-end", m: 1 }}>
                    <Button size="small" sx={{ mr: 2 }} variant="contained" color="error" onClick={() => handleCancel()}>Cancel</Button>
                    <Button size="small" variant="contained" onClick={handleSubmit}>Submit</Button>
                </Box>
            }
        </>
    )
}

export default MetricsEdit;