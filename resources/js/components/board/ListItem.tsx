import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TBoardList } from '../../store/modules/board';
import AddIcon from '@mui/icons-material/Add';
import { Avatar, Box, CardHeader, IconButton, Link, Popper } from '@mui/material';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AppDialog from '../common/AppDialog';
type ListItemProps =  {
  item: TBoardList
}

export default function ListItem({ item }: ListItemProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const confirmDelete =(event: React.MouseEvent<HTMLElement>)=>{
    console.log(321);
  }
    return (
      <Card>
        <CardHeader
        action={
          <div>
            <IconButton aria-label="settings" aria-describedby={id} onClick={handleClick}>
              <MoreVertIcon />
            </IconButton>
            <Popper id={id} open={open} anchorEl={anchorEl} placement='right'>
              <Box sx={{ border:1, borderColor:'#eee', p: 2, bgcolor: 'background.paper' }}>
                <AppDialog text='ttextt' title='some title' cancelAction={()=>{}} confirmAction={()=>{}} confirmTitle='confirm' >
                  <Link component="button" underline="none">Delete</Link>
                </AppDialog>
              </Box>
            </Popper>
          </div>
          
          
        }
        title={item.name}
      />
      <CardActions>
        <Button size="small" variant='outlined' color="primary"  startIcon={<AddIcon />}>Add item</Button>

      </CardActions>
      </Card>
    );
  }