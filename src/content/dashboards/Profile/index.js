import { Helmet } from 'react-helmet-async';
import Footer from 'src/components/Footer';
import { useState } from 'react';
import History from './Tabs/History';

import {
    Grid,
    Container,
    styled,
    Tabs,
    Tab,
    Typography,
    Box,
    Skeleton
} from '@mui/material';
import ProfileCover from './ProfileCover';
import Aktivitas from './Tabs/Aktivitas';
import { useAPI } from 'src/contexts/ApiContext';

const TabsWrapper = styled(Tabs)(
    () => `
        .MuiTabs-root  {
            background-color: white;
        }
      .MuiTabs-scrollableX {
        overflow-x: auto !important;

        
      }
  `
);

const UserAccount = () => {
    const { isLoading } = useAPI();
    const [currentTab, setCurrentTab] = useState('activity');
    const tabs = [
        { value: 'history', label: 'History Login' },
        { value: 'activity', label: 'Aktivitas Terakhir' }
    ];

    const handleTabsChange = (event, value) => {
        setCurrentTab(value);
    };

    return (
        <>
            <Helmet>
                <title>User Details - Management</title>
            </Helmet>
            <Container sx={{ mt: 3 }} maxWidth="lg">
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="stretch"
                    spacing={3}
                >
                    <Grid item xs={12}>
                        <Box
                            component="div"
                            sx={{
                                height: 'auto',
                                padding: '36px',
                                borderRadius: '16px'
                            }}
                        >
                            <>
                                <Typography
                                    variant="h2"
                                    component="h2"
                                    gutterBottom
                                >
                                    {isLoading ? (
                                        <Skeleton animation="wave" />
                                    ) : (
                                        'Selamat Datang Di Sistem Informasi KKN'
                                    )}
                                </Typography>
                                <Typography variant="subtitle2">
                                    {isLoading ? (
                                        <Skeleton animation="wave" />
                                    ) : (
                                        'UNIVERSITAS MUHAMMADIYAH MALANG'
                                    )}
                                </Typography>
                            </>
                        </Box>
                    </Grid>

                    <Grid item xs={3}>
                        <ProfileCover />
                    </Grid>
                    <Grid item xs={9}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                {isLoading ? (
                                    <Skeleton
                                        animation="wave"
                                        height={80}
                                        sx={{ margin: 0, padding: 0 }}
                                    />
                                ) : (
                                    <TabsWrapper
                                        sx={{
                                            height: 'auto',
                                            padding: '12px',
                                            borderRadius: '12px'
                                        }}
                                        onChange={handleTabsChange}
                                        value={currentTab}
                                        variant="scrollable"
                                        scrollButtons="auto"
                                        textColor="primary"
                                        indicatorColor="primary"
                                    >
                                        {tabs.map((tab) => (
                                            <Tab
                                                key={tab.value}
                                                label={tab.label}
                                                value={tab.value}
                                            />
                                        ))}
                                    </TabsWrapper>
                                )}
                            </Grid>
                            <Grid item xs={12}>
                                {isLoading ? (
                                    <Skeleton
                                        animation="wave"
                                        height={300}
                                        sx={{ marginTop: -10, padding: 0 }}
                                    />
                                ) : (
                                    <>
                                        {currentTab === 'history' && (
                                            <History />
                                        )}
                                        {currentTab === 'activity' && (
                                            <Aktivitas />
                                        )}
                                    </>
                                )}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </>
    );
};

export default UserAccount;
