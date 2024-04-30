import { Button, Card, CardContent, Grid, Link, Typography } from '@mui/material';
import ActivityList from './ActivityList';
import { BasicUserInfo, useAuthContext } from "@asgardeo/auth-react";
import { useEffect, useState } from 'react';
import { addActivityToUser, getRandomActivity } from '../api/activiy';
import { ActivityType } from '../types/activity';



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

    const getNewActivity = () =>{
        getRandomActivity(user?.username ?? '').then((response) => {
            const activity: ActivityType = response.data;
            setActivity(activity);
        });
    }

    const addToUser = () =>{
        if(user?.username && activity?.activityId)
        addActivityToUser(user.username , activity.activityId).then((response) => {
            console.log(response.data)
        });
    }

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Card sx={{ minWidth: 275 }}>
                        <CardContent>
                            <Typography sx={{ fontSize: 20 }} color="text.primary" gutterBottom>
                                Hey there, {user?.displayName}! Ready to keep the momentum going?
                            </Typography>
                            <Typography variant="h5" component="div">
                            </Typography>
                            <Typography sx={{ mb: 1.5,  fontSize: 16 }} color="text.secondary">
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
                            <Button variant="text" onClick={addToUser}>Add to the List</Button>
                            <Button variant="text" onClick={getNewActivity}>See another activity</Button>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={8}>
                    <ActivityList />
                </Grid>
            </Grid>
        </>
    );
}

export default Dashboard;