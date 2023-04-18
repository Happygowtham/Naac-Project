import { Box, Button, Card, FormControl, IconButton, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import axiosInstance from "src/AxiosInstance";
import Upload from "./Upload";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';


const MetricsEdit = ({ dat, setEditMetricData, editMetricData }) => {

    const [open, setOpen] = useState(false);
    const [locationOptions, setLocationOptions] = useState([]);
    const [evidenceData, setEvidenceData] = useState({
        location: "",
        status: "In-Progress",
        description: "",
        evidence: "",
        metric_id: ""
    });
    const [evidenceErrors, setEvidenceErrors] = useState([]);
    const [yearOptions, setYearOptions] = useState([]);
    const [year, setYear] = useState({ year: "" });
    const [data, setData] = useState(dat);
    const [metricAnswer, setMetricAnswer] = useState(data?.answer || "");

    useEffect(() => {
        axiosInstance(`/location`, { method: "GET" })
            .then(res => {
                setLocationOptions(res?.data);
            })
        axiosInstance(`/year`, { method: "GET" })
            .then(res => {
                let value = []
                res?.data?.forEach(item => value.push({ id: item?.id, name: item?.from_year + " - " + item?.to_year }))
                setYearOptions(value);
                let activeYear = res?.data?.filter(yer => yer?.is_active_year === true)
                setYear({ year: activeYear?.[0]?.id })
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
        setMetricAnswer(event?.target?.value)
    }

    const handleSubmit = () => {
        if (data?.is_multi_year) {
            axiosInstance(`/metrics/${data?.metric_id}/`, {
                method: "PATCH", data: { answer: metricAnswer }
            }).then(res => { alert("Success"); })
        } else {
            let url = "/metrics-answer/"
            let method = "POST"
            axiosInstance(url, {
                method: method, data: { year: metricAnswer, metric_id: "" }
            }).then(res => { alert("Success"); })
        }
    }


    const handleEvidenceSubmit = (e) => {
        if (evidenceValidate(evidenceData)) {
            axiosInstance(`/evidence/`, {
                method: "POST",
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'accept': '*/*'
                },
                data: {
                    year: year?.year,
                    evidence_file: evidenceData?.evidence,
                    criteria: data?.criteria?.id,
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

    const handleCancel = () => {
        setEditMetricData({ ...editMetricData, show: false })
    }

    const handleYearChange = (event) => {
        setYear({ [event.target.name]: event.target.value })
        axiosInstance(`/metrics/?year=${event.target.value}`, { method: "GET" })
            .then(res => {
                let dat = res?.data?.filter(item => item?.metric_id === data?.metric_id);
                setData(dat?.[0])
            })
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
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h6" sx={{ pl: 3 }}>{data?.key_identifiers?.number} - {data?.key_identifiers?.name}</Typography>
                {data?.is_multi_year ?
                    <FormControl sx={{ mr: 2 }}>
                        <InputLabel id="demo-simple-select-label" size="small">Select Year</InputLabel>
                        <Select
                            size="small"
                            name="year"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Select Year"
                            value={year?.year}
                            onChange={handleYearChange}
                        >
                            {yearOptions?.map(res => {
                                return (
                                    <MenuItem value={res?.id}>{res?.name}</MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>
                    :
                    <FormControl sx={{ mr: 2 }}>
                        <InputLabel id="demo-simple-select-label" size="small">Select Year</InputLabel>
                        <Select
                            size="small"
                            name="year"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Select Year"
                            disabled={true}
                            value={year?.year}
                        >
                            {yearOptions?.map(res => {
                                return (
                                    <MenuItem value={res?.id}>{res?.name}</MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>
                }

            </Box>
            <>
                <Card sx={{ p: 2, m: 1 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography>{data?.number} - {data?.question}</Typography>
                        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                            <IconButton onClick={() => handleClickOpen(data?.metric_id)} color="primary" aria-label="upload picture" component="label">
                                <CloudUploadIcon />
                            </IconButton>
                        </Box>
                    </Box>
                    {
                        data?.type === "QLM" ?
                            <TextField
                                name={data?.metric_id}
                                onChange={(e) => handleChange(e, data?.metric_id)}
                                multiline
                                fullWidth
                                value={metricAnswer}
                                rows={4}
                                sx={{ mt: 1 }}
                            />
                            :
                            <TextField
                                name={data?.metric_id}
                                onChange={(e) => handleChange(e, data?.metric_id)}
                                size="small"
                                sx={{ mt: 1 }}
                                type="number"
                                value={metricAnswer}
                            />
                    }
                </Card>
            </>
            <Box sx={{ display: "flex", justifyContent: "flex-end", m: 1 }}>
                <Button size="small" sx={{ mr: 2 }} variant="contained" color="error" onClick={handleCancel}>Cancel</Button>
                <Button size="small" variant="contained" disabled={metricAnswer === ""} onClick={handleSubmit}>Submit</Button>
            </Box>

        </>
    )
}

export default MetricsEdit;