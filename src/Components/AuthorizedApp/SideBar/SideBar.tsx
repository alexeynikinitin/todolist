import clsx from 'clsx';
import React, {FC, memo} from 'react';
import List from '@material-ui/core/List';
import Drawer from '@material-ui/core/Drawer';
import MailIcon from '@material-ui/icons/Mail';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';

export type SideBarType = {
   open: boolean
   handleDrawerCloseCallback: () => void
}
export const SideBar: FC<SideBarType> = memo(({open, handleDrawerCloseCallback}) => {
   const classes = useStyles()

   const handleDrawerClose = () => handleDrawerCloseCallback();

   return (
      <Drawer
         variant="permanent"
         className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
         })}
         classes={{
            paper: clsx({
               [classes.drawerOpen]: open,
               [classes.drawerClose]: !open,
            }),
         }}
      >
         <div className={classes.toolbar}>
            <IconButton onClick={handleDrawerClose}
               // className={clsx({
               //    [classes.hide]: !open,
               // })}
            >
               <ChevronLeftIcon/>
            </IconButton>
         </div>
         <Divider/>
         <List>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
               <ListItem button key={text}>
                  <ListItemIcon>
                     {
                        index % 2 === 0
                           ? <InboxIcon/>
                           : <MailIcon/>
                     }
                  </ListItemIcon>
                  <ListItemText primary={text}/>
               </ListItem>
            ))}
         </List>
         <Divider/>
         <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
               <ListItem button key={text}>
                  <ListItemIcon>
                     {
                        index % 2 === 0
                           ? <InboxIcon/>
                           : <MailIcon/>
                     }
                  </ListItemIcon>
                  <ListItemText primary={text}/>
               </ListItem>
            ))}
         </List>
      </Drawer>
   );
})

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
   createStyles({
      drawer: {
         width: drawerWidth,
         flexShrink: 0,
         whiteSpace: 'nowrap',
      },
      drawerOpen: {
         width: drawerWidth,
         transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
         }),
      },
      drawerClose: {
         transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
         }),
         overflowX: 'hidden',
         width: theme.spacing(7) + 1,
         [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
         },
      },
      toolbar: {
         display: 'flex',
         alignItems: 'center',
         justifyContent: 'flex-end',
         padding: theme.spacing(0, 1),
         ...theme.mixins.toolbar,
      },
      content: {
         flexGrow: 1,
         padding: theme.spacing(3),
      },
      hide: {
         display: 'none'
      }
   }),
)
