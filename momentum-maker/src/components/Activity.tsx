import Button from '@mui/material/Button';
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import { completeActivity, startActivity } from '../api/activiy';
import DoneIcon from '@mui/icons-material/Done';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';


interface ActivityProps {
    id: number,
    activity: string,
    status: number,
    url: string,
    type: string,
    onActivityChanged?: () => void
}

const Activity = (props: ActivityProps) => {
    const handleStartActivity = () => {
        startActivity(props.id).then(() => props.onActivityChanged && props.onActivityChanged());
    }

    const handleCompleteActivity = () => {
        completeActivity(props.id).then(() => props.onActivityChanged && props.onActivityChanged());
    }

    return (
        <ListItem key={props.id} secondaryAction={
            props.status == 0 ?
                <Button sx={{ minWidth: '140px' }} variant="contained" color="secondary" onClick={handleStartActivity} startIcon={<DirectionsRunIcon />}>
                    Start
                </Button>
                : props.status == 1 ?
                    <Button sx={{ minWidth: '140px' }} variant="contained" color="secondary" onClick={handleCompleteActivity} startIcon={<DoneIcon />}>
                        Complete
                    </Button>
                    : <></>
        }
            disablePadding={true}>

            <ListItemButton>
                <ListItemIcon>
                    {
                        props.status == 0 || props.status == 1 ?
                            <AssignmentIcon /> : <AssignmentTurnedInIcon />
                    }
                </ListItemIcon>
                <ListItemText
                    primary={
                        props.activity
                    }
                    secondary={props.type}
                />
            </ListItemButton>

        </ListItem>
    );
}

export { Activity };
export type { ActivityProps };