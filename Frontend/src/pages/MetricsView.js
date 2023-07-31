import { Box, Button, Card, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "src/AxiosInstance";
import MetricsEdit from "./Metrics";
import Evidences from "./Evidences";
import { groupBy } from "src/Functions/Functions";
import MultiYearData from "./MultiYearData";
import html2pdf from 'html2pdf.js';

const MetricsView = () => {

    const { id } = useParams();
    const [metricData, setMetricData] = useState([]);
    console.log('metricData: ', metricData);
    const [loading, setLoading] = useState(true);
    const [canEdit, setCanEdit] = useState(false);
    const [yearOptions, setYearOptions] = useState([]);
    const [year, setYear] = useState({ year: "" });
    const [editMetricData, setEditMetricData] = useState({ show: false, item: {} });
    const navigate = useNavigate()

    useEffect(() => {
        const data = JSON.parse(atob(localStorage.getItem('naac_dbcy_user')))
        var dataAccess = data?.accesses?.filter(temp => +temp?.criteria_id === +id)
        if (dataAccess?.length > 0) setCanEdit(true);
        axiosInstance(`/year`, { method: "GET" })
            .then(res => {
                let value = []
                res?.data?.forEach(item => value.push({ id: item?.id, name: item?.from_year + " - " + item?.to_year }))
                setYearOptions(value);
                let activeYear = res?.data?.filter(yer => yer?.is_active_year === true)
                setYear({ year: activeYear?.[0]?.id })
                getData(activeYear?.[0]?.id)
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [year?.length === 0])

    const getData = (year1) => {
        axiosInstance(`/metrics/?criteria=${id}&year=${year1 || year?.year}`, { method: "GET" })
            .then(res => {
                let dat = res?.data;
                console.log('dat: ', dat);
                let eviData = groupBy(dat, "key_identifier");
                setMetricData(eviData);
                setLoading(false);
            }).catch(err => {
                setLoading(false)
            })
    }

    const handleYearChange = (event) => {
        setYear({ [event.target.name]: event.target.value })
        getData(event.target.value)
    }

    const handleEditClick = (item) => {
        setEditMetricData({ show: true, item: item })
    }

    const printtoPdf = () => {
        const element = document.getElementById("page-content");
        const options = {
            margin: [20, 20, 20, 20],
            filename: "Metrics",
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
        }

        html2pdf().from(element).set(options).save();
    }

    return (
        <>
            {
                !loading ? editMetricData?.show ?
                    <MetricsEdit
                        data={editMetricData?.item}
                        setEditMetricData={setEditMetricData}
                        editMetricData={editMetricData}
                        getData={getData}
                    />
                    :
                    <>
                        <Button onClick={printtoPdf}>Print</Button>
                        <Box id="page-content" sx={{ display: "flex", justifyContent: "space-between", m: 1 }}>
                            <Typography variant="h5">Criterio {Object.values(metricData)?.[0]?.[0]?.criteria?.number} - {Object.values(metricData)?.[0]?.[0]?.criteria?.name}</Typography>
                            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                                <FormControl fullWidth sx={{ mr: 2 }}>
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
                                <Button sx={{ mr: 2 }} size="small" variant="contained" color="error" onClick={() => navigate("/dashboard")}>Back</Button>
                            </Box>
                        </Box>
                        {
                            Object.values(metricData)?.length > 0 && Object.values(metricData)?.map((res, id) => {
                                return (
                                    <>
                                        <Typography variant="h6" sx={{ pl: 3 }}>{res?.[0]?.key_identifiers?.number} - {res?.[0]?.key_identifiers?.name}</Typography>
                                        {res?.map((item) => {
                                            return (
                                                <>
                                                    <Card sx={{ p: 2, m: 1, cursor: canEdit && "pointer" }} onClick={() => canEdit && handleEditClick(item)}>
                                                        <Typography sx={{ fontWeight: "600" }}>{item?.number} - {item?.question} </Typography>
                                                        {
                                                            item?.bench_mark_value &&
                                                            <Typography sx={{ mt: 1 }}>&emsp; <b>Bench Mark Value:</b> {item?.bench_mark_value}</Typography>
                                                        }
                                                        {
                                                            !item?.is_multi_year ?
                                                                <Typography sx={{ mt: 1 }}>&emsp; <b>Response:</b> {item?.answer}</Typography>
                                                                :
                                                                <MultiYearData metric={item?.metric_id} />
                                                        }
                                                        <Evidences year={year} metric_id={item?.metric_id} />
                                                    </Card>
                                                </>
                                            )
                                        })}
                                    </>
                                )
                            })
                        }
                    </>
                    : "Loading..."
            }
        </>
    )
}

export default MetricsView;