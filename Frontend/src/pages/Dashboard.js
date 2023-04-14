import { Link } from "react-router-dom";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import { Typography } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import axiosInstance from "src/AxiosInstance";
import LinearProgress from '@mui/material/LinearProgress'
import Grid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';

export default function Dashboard() {

    const [criteriaData, setCriteriaData] = useState();

    useEffect(() => {
        axiosInstance(`criteria/`, { method: "GET" })
            .then(res => {
                setCriteriaData(res?.data)
            })
    }, [])

    return (
        <>
            <Typography variant="h5" sx={{ pl: 2 }}>Criteria</Typography>
            {
                criteriaData?.map((res, id) => {
                    return (
                        <>
                            <Grid container>
                                <Grid item xs={12} md={6}>
                                    <List
                                        sx={{ width: '100%', borderRadius: "10px", m: 2, p: 0, maxWidth: 360, bgcolor: 'background.paper' }}
                                        aria-label="contacts"
                                    >
                                        <Link to={`/metrics/${res?.criteria_id}`}>
                                            <ListItem disablePadding>
                                                <ListItemButton>
                                                    <ListItemText sx={{ pl: 2 }} inset primary={`${res?.number} - ${res?.title}`} />
                                                </ListItemButton>
                                            </ListItem>
                                        </Link>
                                    </List>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', m: 2, mt: 3 }}>
                                        <Tooltip title="Progress">
                                            <Box sx={{ width: '100%', mr: 1 }}>
                                                <LinearProgress variant="determinate" value={84} sx={{ height: 10, borderRadius: "10px" }} />
                                            </Box>
                                        </Tooltip>
                                        <Box sx={{ minWidth: 35 }}>
                                            <Typography variant='body2' color='text.secondary'>{Math.round(40)} %</Typography>
                                        </Box>
                                    </Box>
                                </Grid>
                            </Grid>
                        </>
                    )
                })
            }
        </>
    )
}