import { Collapse, Divider, Space, Table, Tag, Tabs } from 'antd';
import "../styles/ProjectPage.css";
import TaskTable from '../components/individual/taskTable';

const ProjectPage = () => {
    const value = {"toDo":[{
        "taskName": "Verify The Goods",
        "assignee": "Satyabrata Dash",
        "dueDate" : "12/05/2024",
        "priority": "Low"
    },{
        "taskName": "Verify The Goods",
        "assignee": "Satyabrata Dash",
        "dueDate" : "12/05/2024",
        "priority": "Medium"
    }],"Doing":[{
        "taskName": "Collect The Goods",
        "assignee": "Satyabrata Dash",
        "dueDate" : "12/05/2024",
        "priority": "High"
    }],"Done":[{
        "taskName": "Check The Goods",
        "assignee": "Satyabrata Dash",
        "dueDate" : "12/05/2024",
        "priority": "Low"
    }]}
    return(
        <div>
            <Tabs
    defaultActiveKey="2"
    items={[
      {
        label: 'Overview',
        key: '1',
        children: 'Tab 1',
      },
      {
        label: 'List',
        key: '2',
        children: <div className='project-page'>
            <Divider></Divider>
            <div className="tableSpace">
                <p style={{width:"40%"}}>Task Name</p>
                <Divider type="vertical" style={{borderWidth:"3px"}}></Divider>
                <p style={{width:"10%"}}>Assignee</p>
                <Divider type="vertical"></Divider>
                <p style={{width:"10%"}}>Due Date</p>
                <Divider type="vertical"></Divider>
                <p style={{width:"10%"}}>Priority</p>
                <Divider type="vertical"></Divider>
            </div>
            <Divider></Divider>
            <TaskTable value={value}/>
        </div>,
        disabled: false,
      },
      {
        label: 'Board',
        key: '3',
        children: 'Tab 3',
      },
      {
        label: 'Inventory',
        key: '4',
        children: 'Inventory',
      },
    ]}
  />
        </div>
        
    )
}

export default ProjectPage;