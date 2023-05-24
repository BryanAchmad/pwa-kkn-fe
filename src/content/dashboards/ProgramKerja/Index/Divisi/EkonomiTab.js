import {
    Box,
    Card,
    CardHeader,
    Button,
    CardContent,
    Grid
} from '@mui/material';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

function EkonomiTab({ data }) {
    const navigate = useNavigate();
    const toDetails = (idProker) => {
        navigate('../details', { state: { id: idProker } });
    };

    return (
        <Card>
            <CardHeader title="Divisi Ekonomi" />
            <CardContent>
                <Box
                    sx={{
                        width: '100%',
                        typography: 'body1',
                        boxShadow: 2
                    }}
                >
                    {data && data.length > 0 ? (
                        data.map((proker, index) => (
                            <Accordion key={index}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel2a-content"
                                    id="panel2a-header"
                                >
                                    <Typography>{proker.title}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Grid container direction="row" spacing={3}>
                                        <Grid item lg={8} fullWidth>
                                            {proker.deskripsi}
                                        </Grid>
                                        <Grid
                                            item
                                            lg={4}
                                            justifyContent="end"
                                            textAlign="end"
                                            spacing={3}
                                        >
                                            <Button
                                                variant="contained"
                                                startIcon={<EditIcon />}
                                                onClick={() => {
                                                    toDetails(proker._id);
                                                }}
                                            >
                                                details
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </AccordionDetails>
                            </Accordion>
                        ))
                    ) : (
                        <Typography>Not found</Typography>
                    )}
                </Box>
            </CardContent>
        </Card>
    );
}

export default EkonomiTab;
