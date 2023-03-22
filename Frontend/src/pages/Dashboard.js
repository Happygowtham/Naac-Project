import { Link } from "react-router-dom";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Typography } from "@mui/material";

export default function Dashboard() {

    const data = JSON.parse(atob(localStorage.getItem('naac_dbcy_user')))
    var criData = data?.accesses

    return (
        <>
            <Typography variant="h5" sx={{ pl: 2 }}>Criteria</Typography>
            {
                criData?.map((res, id) => {
                    console.log('res: ', res);
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