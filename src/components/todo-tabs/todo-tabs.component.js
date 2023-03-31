import { useState } from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TodoList from '../todo-list/todo-list.component';
import Box from '@mui/material/Box';
import * as themeProvider from '../theme-provider.component';
import { Divider } from '@mui/material';

export default function TodoTabs(props) {
  const themes = themeProvider.spacing;
  const [value, setValue] = useState(0);

  function tabControl(index) {
    return {
      id: `tab-${index}`,
      'aria-controls': `tabpanel-${index}`,
    };
  }
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`tabpanel-${index}`}
        aria-labelledby={`tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box>{children}</Box>
        )}
      </div>
    );
  }

  return (
    <Box sx={{  }} >
      <Tabs value={value} onChange={handleChange} sx={{ width: 1, background: '#2e2e2e' }}>
        <Tab label="Ongoing" {...tabControl(0)} sx={{ width: '50%', color: 'white'}}></Tab>
        <Tab label="Completed" {...tabControl(1)} sx={{ width: '50%', color: 'white'}}></Tab>
      </Tabs>
      <TabPanel value={value} index={0}>
        <Divider sx={{ background: 'black' }}></Divider>
        <TodoList todosState={props.todosState} setTodosState={props.setTodosState} todos={props.todosState.todosArr} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Divider sx={{ background: 'black' }}></Divider>
        <TodoList todosState={props.todosState} setTodosState={props.setTodosState} todos={props.todosState.completedTodos} />
      </TabPanel>
    </Box>
  )
}