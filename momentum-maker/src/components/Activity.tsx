import Button from '@mui/material/Button';
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { completeActivity, startActivity } from '../api/activiy';



interface ActivityProps {
    id: number,
    activity: string,
    status: number,
    url: string,
    type: string
}

const Activity = (props: ActivityProps) => {
    const handleStartActivity = () => {
        startActivity(props.id);
    }

    const handleCompleteActivity = () => {
        completeActivity(props.id);
    }

    return (
        <ListItem key={props.id} secondaryAction={
            props.status == 0 ?
                <Button type="submit" variant="contained" color="secondary" onClick={handleStartActivity}>
                    Start
                </Button>
                :
                <Button type="submit" variant="contained" color="secondary"  onClick={handleCompleteActivity}>
                    Complete
                </Button>
        }
            disablePadding={true}>

            <ListItemButton>
                <ListItemIcon>
                    <AssignmentIcon />
                </ListItemIcon>
                <ListItemText
                    primary={
                        props.activity
                    }
                    secondary = {props.type}
                />
            </ListItemButton>

        </ListItem>
    );
}

export { Activity };
export type { ActivityProps };