import Link from 'next/link';
//
const TaskIndexRow = props => (
  <div className="flex flex-row p-2 my-4 rounded-lg shadow-lg bg-white">
    <div className="flex-1  p-2">
      <h3 className="text-3xl font-bold">{props.title}</h3>
      ID: {props.id}  
    </div>    
    <div className="flex-1 p-2">
    </div>
  </div>
);
export default TaskIndexRow;
