import { Link } from "react-router-dom";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Typography } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import axiosInstance from "src/AxiosInstance";

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
                        </>
                    )
                })
            }
        </>
    )
}