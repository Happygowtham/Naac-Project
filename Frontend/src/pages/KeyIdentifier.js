import { Box, Button, Card, Container, Grid, LinearProgress, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "src/AxiosInstance";
import { styled } from '@mui/material/styles';


const StyledContent = styled('div')(({ theme }) => ({
    margin: 'auto',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: theme.spacing(12, 0),
}));


const KeyIdentifier = () => {

    const [identifierData, setIdentifierData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [progressData, setProgressData] = useState({});
    const navigate = useNavigate()

    useEffect(() => {
        axiosInstance(`/key-identifiers`, { method: "GET" })
            .then(res => {
                setIdentifierData(res?.data);
                setLoading(false)
            })
        axiosInstance(`progress/`, { method: "GET" })
            .then(res => {
                setProgressData(res?.data)
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <Box sx={{ display: "flex", justifyContent: "space-between", m: 1 }}>
                <Typography variant="h5">Key Identifiers </Typography>
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button sx={{ mr: 2 }} size="small" variant="contained" color="error" onClick={() => navigate("/dashboard")}>Back</Button>
                </Box>
            </Box>
            {
                identifierData?.length > 0 ? identifierData?.map(res => {
                    return (
                        <>
                            <Grid container>
                                <Grid item sx={12} md={6}>
                                    <Card sx={{ p: 2, m: 1 }}>
                                        <Typography sx={{ fontWeight: "600" }}>{res?.number} - {res?.title} </Typography>
                                    </Card>
                                </Grid>
                                <Grid item sx={12} md={6}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', m: 2, mt: 3 }}>
                                        <Tooltip title="Progress">
                                            <Box sx={{ width: '100%', mr: 1 }}>
                                                <LinearProgress variant="determinate" value={progressData?.identifier?.[res?.key_identifiers_id]} sx={{ height: 10, borderRadius: "10px" }} />
                                            </Box>
                                        </Tooltip>
                                        <Box sx={{ minWidth: 35 }}>
                                            <Typography variant='body2' color='text.secondary'>{Math.round(progressData?.identifier?.[res?.key_identifiers_id]) || 0} %</Typography>
                                        </Box>
                                    </Box>
                                </Grid>
                            </Grid>

                        </>
                    )
                })
                    : <>
                        <Container>
                            <StyledContent sx={{ textAlign: 'center', alignItems: 'center' }}>
                                <Typography variant="h3" paragraph>
                                    {loading ? "Loading..." : "No Key Identifires Found"}
                                </Typography>
                            </StyledContent>
                        </Container>
                    </>
            }
        </>
    )
}

export default KeyIdentifier;