import "./css/style.css";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Autocomplete, Button, Grid, IconButton, ListItem, Select, TextField, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import DescriptionIcon from '@mui/icons-material/Description';

const Upload = ({ evidenceData, evidenceErrors, open, handleClose, locationOptions, handleEvidenceChange, handleEvidenceSubmit }) => {

    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth={true}
                maxWidth="sm"
            >
                <DialogTitle
                >Subscribe
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Grid container mt={1}>
                            <Grid item xs={12} md={4}>
                                <>
                                    <input name="evidence" accept=".pdf,.docx,.doc,.xls,.xlsx" id="evidence" type="file" style={{ display: "none" }} onChange={(e) => handleEvidenceChange(e)} />
                                    <div className="upload_doc" onClick={() => document.getElementById("evidence").click()}>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            xmlnsXlink="http://www.w3.org/1999/xlink"
                                            aria-hidden="true"
                                            role="img"
                                            className="MuiBox-root css-1ngw63v iconify iconify--eva"
                                            width="1em"
                                            height="1em"
                                            viewBox="0 0 24 24"
                                        >
                                            <g id="iconifyReact108">
                                                <g id="iconifyReact109">
                                                    <g id="iconifyReact110" fill="currentColor">
                                                        <path d="M21.9 12c0-.11-.06-.22-.09-.33a4.17 4.17 0 0 0-.18-.57c-.05-.12-.12-.24-.18-.37s-.15-.3-.24-.44S21 10.08 21 10s-.2-.25-.31-.37s-.21-.2-.32-.3L20 9l-.36-.24a3.68 3.68 0 0 0-.44-.23l-.39-.18a4.13 4.13 0 0 0-.5-.15a3 3 0 0 0-.41-.09L17.67 8A6 6 0 0 0 6.33 8l-.18.05a3 3 0 0 0-.41.09a4.13 4.13 0 0 0-.5.15l-.39.18a3.68 3.68 0 0 0-.44.23l-.36.3l-.37.31c-.11.1-.22.19-.32.3s-.21.25-.31.37s-.18.23-.26.36s-.16.29-.24.44s-.13.25-.18.37a4.17 4.17 0 0 0-.18.57c0 .11-.07.22-.09.33A5.23 5.23 0 0 0 2 13a5.5 5.5 0 0 0 .09.91c0 .1.05.19.07.29a5.58 5.58 0 0 0 .18.58l.12.29a5 5 0 0 0 .3.56l.14.22a.56.56 0 0 0 .05.08L3 16a5 5 0 0 0 4 2h3v-1.37a2 2 0 0 1-1 .27a2.05 2.05 0 0 1-1.44-.61a2 2 0 0 1 .05-2.83l3-2.9A2 2 0 0 1 12 10a2 2 0 0 1 1.41.59l3 3a2 2 0 0 1 0 2.82A2 2 0 0 1 15 17a1.92 1.92 0 0 1-1-.27V18h3a5 5 0 0 0 4-2l.05-.05a.56.56 0 0 0 .05-.08l.14-.22a5 5 0 0 0 .3-.56l.12-.29a5.58 5.58 0 0 0 .18-.58c0-.1.05-.19.07-.29A5.5 5.5 0 0 0 22 13a5.23 5.23 0 0 0-.1-1Z" />
                                                        <path d="M12.71 11.29a1 1 0 0 0-1.4 0l-3 2.9a1 1 0 1 0 1.38 1.44L11 14.36V20a1 1 0 0 0 2 0v-5.59l1.29 1.3a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42Z" />
                                                    </g>
                                                </g>
                                            </g>
                                        </svg>
                                        <p className="MuiTypography-root MuiTypography-body2 css-1o38g2n">
                                            Upload file
                                        </p>
                                    </div>
                                </>
                            </Grid>
                            <Grid item xs={12} md={8}>
                                <ListItem sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    borderRadius: "6px",
                                    padding: "0.625rem 0.6rem 0.625rem 1.5rem",
                                    border: "1px solid rgba(93, 89, 98, 0.14)",
                                    mr: 9,
                                    mb: 2
                                }}>
                                    {
                                        evidenceData?.evidence ?
                                            <>
                                                <div className='file-details' style={{ display: "flex", }}>
                                                    <div style={{ marginRight: "10px" }} className='file-preview'>
                                                        <DescriptionIcon />
                                                    </div>
                                                    <div>
                                                        <Typography className='file-name'>{evidenceData?.evidence?.name || "File"}</Typography>
                                                    </div>
                                                </div>
                                                <IconButton onClick={() => handleEvidenceChange("remove_file")}>
                                                    <CloseIcon fontSize={"small"} />
                                                </IconButton>
                                            </>
                                            : "Please Upload Document"
                                    }
                                </ListItem>
                                {evidenceData.evidence === "" &&
                                    <Typography sx={{ color: "red", p: 0, fontWeight: "100" }}>Please upload Document</Typography>
                                }
                            </Grid>
                            <Grid item xs={12} md={6} padding={1}>
                                <Autocomplete
                                    id="free-solo-2-demo"
                                    size="small"
                                    disableClearable
                                    onChange={(event, incharge) => handleEvidenceChange("location", incharge)}
                                    options={locationOptions}
                                    getOptionLabel={(option) => {
                                        if (option && option?.title) {
                                            return option?.title;
                                        } else {
                                            return "";
                                        }
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Search Location"
                                            InputProps={{
                                                ...params.InputProps,
                                                type: 'search',
                                            }}
                                            {...(evidenceErrors.location && {
                                                error: true,
                                                helperText: evidenceErrors.location,
                                            })}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} md={6} padding={1}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label" size="small">Status</InputLabel>
                                    <Select
                                        size="small"
                                        name="status"
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="Status"
                                        value={evidenceData?.status}
                                        onChange={handleEvidenceChange}
                                    >
                                        <MenuItem value={"Yet to Start"}>Yet to Start</MenuItem>
                                        <MenuItem value={"In-Progress"}>In-Progress</MenuItem>
                                        <MenuItem value={"Completed"}>Completed</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <TextField
                            name="description"
                            multiline={true}
                            sx={{ mt: 2 }}
                            rows={4}
                            fullWidth
                            label="Description"
                            onChange={handleEvidenceChange}
                            {...(evidenceErrors.description && {
                                error: true,
                                helperText: evidenceErrors.description,
                            })}
                        />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={(e) => handleEvidenceSubmit(e)}>Submit</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default Upload