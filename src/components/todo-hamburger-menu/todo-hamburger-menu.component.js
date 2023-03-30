
import * as React from 'react'
import * as themeProvider from '../theme-provider.component';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Box } from '@mui/system';

export default function HamburgerMenu(props) {

  const themes = themeProvider.spacing;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  const removeAll = (e) => {
    e.preventDefault();
    props.setTodosState({...props.todosState, todosArr: []}) 
  }
  
  const removeCompleted = (e) => {
    e.preventDefault();
    props.setTodosState({...props.todosState, completedTodos: []}) 
  }

  const completeAll = (e) => {
    e.preventDefault();
    const ongoingTodos = props.todosState.todosArr.map((todo) =>{ 
      todo = {
        ...todo,
        completed: true
      }
      return todo;
    });
    props.setTodosState({
      ...props.todosState,
      completedTodos: [
        ...props.todosState.completedTodos,
        ...ongoingTodos
      ],
      todosArr: []
    }) 
  }


  return (
    <Box sx={{ alignSelf: 'flex-end', marginLeft: 'auto'}}>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{}}
      >
        <MenuIcon fontSize='large'></MenuIcon>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleClose}>
          <Button variant="text" onClick={(e) => completeAll(e)} sx={{ color: 'black'}}>Complete All</Button>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Button variant="text" onClick={(e) => removeAll(e)} sx={{ color: 'black'}}>Clear All</Button>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Button variant="text" onClick={(e) => removeCompleted(e)} sx={{ color: 'black'}}>Clear Completed</Button>
        </MenuItem>
      </Menu>
    </Box>
  );
}
