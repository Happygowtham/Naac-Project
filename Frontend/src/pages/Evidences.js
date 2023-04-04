import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import axiosInstance from "src/AxiosInstance";

const Evidences = ({ metric_id }) => {

    const [evidenceData, setEvidenceData] = useState([]);

    useEffect(() => {
        axiosInstance(`evidence/?metrics=${metric_id}`, { method: "GET" })
            .then(res => {
                setEvidenceData(res?.data);
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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
                                    <TableCell align="center">
                                        <a href={row?.evidence_file} target="_blank" rel="noreferrer" style={{ color: "blue", cursor: "pointer" }}>
                                            View Document
                                        </a>
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