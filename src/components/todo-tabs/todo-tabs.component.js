import { useState } from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TodoList from '../todo-list/todo-list.component';
import Box from '@mui/material/Box';
import './todo-tabs.component.css'
export default function TodoTabs(props) {
  
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
          <Box sx={{ p: 3 }}>{children}</Box>
        )}
      </div>
    );
  }

  return (
    <div className='tabs-container'>
      <Tabs value={value} onChange={handleChange} sx={{width: 350, margin: 'auto', background: 'Gainsboro'}}>
        <Tab label="Ongoing" {...tabControl(0)}></Tab>
        <Tab label="Completed" {...tabControl(1)}></Tab>
      </Tabs>
      <TabPanel value={value} index={0} sx={{'& .MuiBox-root':{ padding: 0 }}}>
        <TodoList todosState={props.todosState} setTodosState={props.setTodosState} todos={props.todosState.todosArr} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TodoList todosState={props.todosState} setTodosState={props.setTodosState} todos={props.todosState.completedTodos} />
      </TabPanel>
    </div>
  )
}