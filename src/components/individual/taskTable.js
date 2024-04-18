import { Collapse, Divider, Space, Table, Tag } from 'antd';
import "../../styles/ProjectPage.css";
import { CheckCircleOutlined} from '@ant-design/icons';

const TaskTable = (props) => {
    const value = props.value;
    const taskList = Object.keys(value)
    const items = []
    let keyList = []
    for(let i=0;i<taskList.length;i++){
        let valList = value[taskList[i]]
        let tempList = []
        console.log("valList is::",valList)
        for(let j=0;j<valList.length;j++){
            tempList.push(
                <div className="tableSpace">
                        <p style={{width:"40%"}}><CheckCircleOutlined style={{marginRight:"2px"}}/>{valList[j].taskName}</p>
                        <Divider type="vertical" style={{borderWidth:"3px"}}></Divider>
                        <p style={{width:"10%"}}>{valList[j].assignee}</p>
                        <Divider type="vertical"></Divider>
                        <p style={{width:"10%"}}>{valList[j].dueDate}</p>
                        <Divider type="vertical"></Divider>
                        <p style={{width:"10%"}}><Tag color="red">{valList[j].priority}</Tag></p>
                        <Divider type="vertical"></Divider>
                </div>
            )
        }
        keyList.push(""+i)
        items.push({
            key: ""+i,
            label: taskList[i],
            val:tempList
        })
        console.log(items)
    }
    return(
        <Collapse items={items} defaultActiveKey={keyList}/>
    )
}

export default TaskTable