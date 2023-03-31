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
    const [evidenceData, setEvidenceData] = useState({
        location: "",
        status: "In-Progress",
        description: "",
        evidence: "",
    });
    const [errors, setErrors] = useState([]);
    const [evidenceErrors, setEvidenceErrors] = useState([]);

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
                let value = []
                res?.data?.forEach(item => value.push({ id: item?.id, name: item?.from_year + " - " + item?.to_year }))
                setYearOptions(value);
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const validate = () => {
        let ret_value = []
        metricData?.forEach((store, index) => {
            const error = {};
            if (!store.year) error.year = "Year is required";
            if (!store.answer) error.answer = "Answer is required";
            const temp = errors;
            temp[index] = error;
            setErrors([...temp]);
            ret_value.push(Object.values(error).every((e) => e === ""));
        })
        return ret_value
    };

    const evidenceValidate = (fieldValues) => {
        let temp = { ...errors };
        if ("location" in fieldValues) {
            temp.location = fieldValues.location?.trim() === "" ? "Location is required" : "";
        }
        if ("status" in fieldValues) {
            temp.status = fieldValues.status?.trim() === "" ? "Status is required" : "";
        }
        if ("description" in fieldValues) {
            temp.description = fieldValues.description?.trim() === "" ? "Description is required" : "";
        }

        setEvidenceErrors({
            ...temp,
        });

        return Object.values(temp).every((x) => x === "");
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
        item = { ...item, year: { id: 1, name: value } };
        newArr[id] = item;
        setMetricData(newArr);
    }

    const handleSubmit = () => {
        if (!validate().includes(false)) {
            let newArr = []
            metricData?.forEach(res => newArr?.push({ ...res, criteria: typeof res?.criteria === "object" ? res?.criteria?.id : res?.criteria }))
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

    const handleEvidenceSubmit = (e, id) => {
        if (evidenceValidate(evidenceData)) {
            let postData = metricData[id]
            axiosInstance(`/evidence/`, {
                method: "POST",
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'accept': '*/*'
                },
                data: {
                    year: evidenceData?.year?.id,
                    evidence_file: evidenceData?.evidence,
                    criteria: postData?.criteria?.id,
                    evidence_number: 1,
                    description: evidenceData?.description,
                    status: evidenceData?.status,
                    location: 1,
                    metrics: postData?.metric_id
                }
            }).then(res => {
                alert("Success");
            })
        }
    }

    const handleEvidenceChange = (event, value) => {
        if (event === "location") {
            if (value) setEvidenceData({ ...evidenceData, [event]: value })
            else setEvidenceData({ ...evidenceData, [event]: "" })
        } else if (event.target.name === "evidence") {
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
                id={id}
                open={open}
                handleClose={handleClose}
                handleEvidenceSubmit={handleEvidenceSubmit}
                evidenceErrors={evidenceErrors}
                evidenceData={evidenceData}
            />
            {
                metricData?.length > 0 ? metricData?.map((res, id) => {
                    return (
                        <>
                            <Card sx={{ p: 2, m: 1 }}>
                                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <Typography>{res?.number} - {res?.question}</Typography>
                                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                                        {/* <Autocomplete
                                            freeSolo={false}
                                            id="free-solo-2-demo"
                                            size="small"
                                            disableClearable
                                            fullWidth
                                            value={res?.year}
                                            sx={{ width: 200 }}
                                            onChange={(event, value) => handleYearChange("year", value, id)}
                                            options={yearOptions?.map((option) => option?.name)}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    label="Search Year"
                                                    InputProps={{
                                                        ...params.InputProps,
                                                        type: 'search',
                                                    }}
                                                    {...(errors[id] &&
                                                        errors[id].year && {
                                                        error: true,
                                                        helperText: errors[id].year,
                                                    })}
                                                />
                                            )}
                                        /> */}
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
                                            {...(errors[id] &&
                                                errors[id].answer && {
                                                error: true,
                                                helperText: errors[id].answer,
                                            })}
                                        />
                                        :
                                        <TextField
                                            name={res?.metric_id}
                                            onChange={(e) => handleChange(e, id)}
                                            size="small"
                                            sx={{ mt: 1 }}
                                            type="number"
                                            value={res?.answer}
                                            {...(errors[id] &&
                                                errors[id].answer && {
                                                error: true,
                                                helperText: errors[id].answer,
                                            })}
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