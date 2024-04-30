import { Box, Button, Card, CardContent, CircularProgress, Grid, Link, Typography } from '@mui/material';
import ActivityList from './ActivityList';
import { BasicUserInfo, useAuthContext } from "@asgardeo/auth-react";
import { useEffect, useRef, useState } from 'react';
import { addActivityToUser, getRandomActivity } from '../api/activiy';
import { ActivityType } from '../types/activity';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ReplayCircleFilledIcon from '@mui/icons-material/ReplayCircleFilled';


interface activityRefType {
    updateActivityList?: () => void
}

const Dashboard = () => {
    const { getBasicUserInfo } = useAuthContext();

    const [user, setUser] = useState<BasicUserInfo | null>(null);
    const [activity, setActivity] = useState<ActivityType | null>(null);

    useEffect(() => {
        getBasicUserInfo().then((userResponse) => setUser(userResponse));
        getRandomActivity(user?.username ?? '').then((response) => {
            const activity: ActivityType = response.data;
            setActivity(activity);
        });
    }, []);

    const getNewActivity = () => {
        getRandomActivity(user?.username ?? '').then((response) => {
            const activity: ActivityType = response.data;
            setActivity(activity);
        });
    }

    const activityListRef = useRef<activityRefType>();
    const addToUser = () => {
        if (user?.username && activity?.activityId){
            addActivityToUser(user.username, activity.activityId).then(() => {
                activityListRef.current?.updateActivityList && activityListRef.current.updateActivityList();
            });
        }
    }


    return (
        <>
            <Grid container spacing={4}>
                <Grid item xs={4}>
                    <Card sx={{ minWidth: 275 }}>
                        <CardContent>
                            <Typography sx={{ fontSize: 20 }} color="text.primary" gutterBottom>
                                Hey there, {user?.displayName}!
                            </Typography>
                            <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                                Ready to keep the momentum going?
                            </Typography>
                            {
                                activity ?
                                    <>
                                        <Typography sx={{ mb: '1.5rem', mt: '2rem', fontSize: 16 }} color="text.primary">
                                            Explore a new activity below and stay on track!
                                        </Typography>
                                        <Typography sx={{ fontSize: 24 }} variant="body2">
                                            "{activity?.activity}"
                                        </Typography>
                                        {
                                            activity?.url ?
                                                <Link
                                                    variant="body2"
                                                    href={activity.url}
                                                >
                                                    MORE INFO
                                                </Link> : <></>
                                        }
                                        <Box sx={{ mt: '2rem' }} >
                                        <Button variant="text" onClick={addToUser} startIcon={<CheckCircleIcon/>}>Add to the List</Button>
                                        <Button variant="text" onClick={getNewActivity} startIcon={<ReplayCircleFilledIcon/>}>Maybe a different one?</Button>
                                        </Box>
                                    </>
                                    :
                                    <Grid container sx={{ mt: '2rem', minHeight: '50px', justifyContent: 'center' }}>
                                        <Box sx={{ display: 'flex' }}>
                                            <CircularProgress color='primary' />
                                        </Box>
                                    </Grid>
                            }

                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={8}>
                    <ActivityList ref={activityListRef} />
                </Grid>
            </Grid>
        </>
    );
}

export default Dashboard;