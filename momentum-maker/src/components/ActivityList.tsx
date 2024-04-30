import { useEffect, useState } from 'react';
import { getActivityList } from '../api/activiy';
import { Activity, ActivityProps } from './Activity';
import { List } from '@mui/material';
import { BasicUserInfo, useAuthContext } from '@asgardeo/auth-react';



const ActivityList = () => {
    const [activityList, setActivityList] = useState<ActivityProps[]>([]);
    const { getBasicUserInfo } = useAuthContext();

    const [user, setUser] = useState<BasicUserInfo | null>(null);

    useEffect(() => {
        getBasicUserInfo().then((userResponse) => {
            setUser(userResponse);
            console.log(user?.username)
            user?.username && getActivityList(user.username).then((response) => {
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
        });
    }, []);


    return (
        <List>
            {activityList && activityList.map((item, _) => (
                <Activity activity={item.activity} id={item.id} status={item.status} type={item.type} url='' />
            ))}

        </List>
    );
}

export default ActivityList;