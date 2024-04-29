import { SmallDashOutlined } from "@ant-design/icons"
import Draggable, {DraggableCore} from 'react-draggable'; 

const DragAndDropIcon = () => {
    const onStartDraggable = (e)=>{
        console.log("e is::",e);
    }
    const onDragOver = (ev) => {
        console.log("ev is::",ev);
    }
    const afterDragged = (event) => {
        console.log("event is::",event);
    }

    return(
        <DraggableCore onStart={onStartDraggable}
        onDrag={onDragOver}
        onStop={afterDragged}>
            <div className="DragIcon">
                <SmallDashOutlined />
                <SmallDashOutlined />
            </div>
        </DraggableCore>
    )
}

export default DragAndDropIcon