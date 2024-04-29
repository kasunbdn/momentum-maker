import { useEffect, useState } from 'react';
import { getActivityList } from '../api/activiy';
import { Activity, ActivityProps } from './Activity';
import { List } from '@mui/material';



const ActivityList = () => {
    const [activityList, setActivityList] = useState<ActivityProps []>([]);

    useEffect(() => {
        getActivityList('53beb932-76db-4cbf-8a09-2e73b037dc96').then((response) => {
            const activityList = response.data.map((item: any): ActivityProps => {
                const ap: ActivityProps = {
                    id: item.userActivityId,
                    activity: item.activity,
                    status: item.status,
                    url: '',
                    type: item.activityType
                }
                return ap})
            setActivityList(activityList);
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