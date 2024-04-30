import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { getActivityList } from '../api/activiy';
import { Activity, ActivityProps } from './Activity';
import { Box, Card, Collapse, List, Typography } from '@mui/material';
import { BasicUserInfo, useAuthContext } from '@asgardeo/auth-react';
import { TransitionGroup } from 'react-transition-group';



const ActivityList = forwardRef((props, ref) => {
    const [activityList, setActivityList] = useState<ActivityProps[]>([]);
    const { getBasicUserInfo } = useAuthContext();

    const [user, setUser] = useState<BasicUserInfo | null>(null);
    useEffect(() => {
        getBasicUserInfo().then((userResponse) => {
            setUser(userResponse);
            userResponse?.username && onActivityChanged(userResponse?.username)
        })
    }, []);


    useImperativeHandle(ref, () => ({
        updateActivityList() {
            onActivityChanged();
        }
    }));


    const onActivityChanged = (username = user?.username) => {
        console.log(username)
        username && getActivityList(username).then((response) => {
            const activityList = response.data.map((item: any): ActivityProps => {
                const ap: ActivityProps = {
                    id: item.userActivityId,
                    activity: item.activity,
                    status: item.status,
                    url: '',
                    type: item.activityType
                }
                return ap
            })
            setActivityList(activityList);
        });
    }

    return (
        <Box >
            {activityList && activityList.filter(item => item.status == 0 || item.status == 1).length > 0 ?
                <>
                    <Typography sx={{ m: '1rem', fontSize: 18 }}>
                        Pending Items
                    </Typography>
                    <Card >
                        <List>
                            <TransitionGroup>
                                {activityList && activityList.filter(item => item.status == 0 || item.status == 1).sort((item1, item2) => item1.status - item2.status).map((item, index) => (
                                    <Collapse key={index}>
                                        <Activity onActivityChanged={onActivityChanged} activity={item.activity} id={item.id} status={item.status} type={item.type} url='' />
                                    </Collapse>
                                ))}
                            </TransitionGroup>
                        </List>
                    </Card>

                </>
                :
                <>
                </>}

            {activityList && activityList.filter(item => item.status !== 0 && item.status !== 1).length > 0 ?
                <>
                    <Typography sx={{ m: '1rem', mt: '2rem', fontSize: 18 }}>
                        Completed Items
                    </Typography>
                    <Card>
                        <List>
                            <TransitionGroup>
                                {activityList && activityList.filter(item => item.status !== 0 && item.status !== 1).sort((item1, item2) => item1.id - item2.id).map((item, index) => (
                                    <Collapse key={index}>
                                        <Activity onActivityChanged={onActivityChanged} activity={item.activity} id={item.id} status={item.status} type={item.type} url='' />
                                    </Collapse>
                                ))}
                            </TransitionGroup>
                        </List>
                    </Card>
                </>
                :
                <></>}
        </Box>


    );
})

export default ActivityList;