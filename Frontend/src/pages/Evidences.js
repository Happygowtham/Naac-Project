import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import axiosInstance from "src/AxiosInstance";
import DeleteIcon from '@mui/icons-material/Delete';

const Evidences = ({ metric_id, year }) => {

    const [evidenceData, setEvidenceData] = useState([]);

    useEffect(() => {
        getEvidences()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [year])

    const getEvidences = () => {
        axiosInstance(`evidence/?metrics=${metric_id}&year=${year?.year}`, { method: "GET" })
            .then(res => {
                setEvidenceData(res?.data);
            })
    }

    const handleDeleteFile = (e, id) => {
        e.stopPropagation();
        axiosInstance(`evidence/${id}`, { method: "DELETE" })
            .then(res => {
                getEvidences()
            })
    }

    return (
        <>
            {
                evidenceData?.length > 0 &&
                <TableContainer sx={{ mt: 3 }}>
                    <Table size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>S. No</TableCell>
                                <TableCell align="left">File Description</TableCell>
                                <TableCell align="center">Document</TableCell>
                                <TableCell align="center">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {evidenceData?.map((row, id) => (
                                <TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell width={100}>{id + 1}</TableCell>
                                    <TableCell align="left">{row.description}</TableCell>
                                    <TableCell align="center" onClick={e => e.stopPropagation()}>
                                        <a href={row?.evidence_file} target="_blank" rel="noreferrer" style={{ color: "blue", cursor: "pointer" }}>
                                            View Document
                                        </a>
                                    </TableCell>
                                    <TableCell width={100} align="center">
                                        <IconButton title="Delete File" onClick={(e) => handleDeleteFile(e, row?.id)}>
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            }
        </>
    )
}

export default Evidences;