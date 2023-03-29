import { useState } from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TodoList from '../todo-list/todo-list.component';
import Box from '@mui/material/Box';
import './todo-tabs.component.css'
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
          <Box sx={{ padding: themes.spacing(0) }}>{children}</Box>
        )}
      </div>
    );
  }

  return (
    <Box>

      <Tabs value={value} onChange={handleChange} sx={{
        width: 1,
        background: 'Gainsboro',
        borderTopLeftRadius: '8px',
        borderTopRightRadius: '8px',
        }}>
        <Tab label="Ongoing" {...tabControl(0)} sx={{ width: '50%'}}></Tab>
        <Tab label="Completed" {...tabControl(1)} sx={{ width: '50%'}}></Tab>
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