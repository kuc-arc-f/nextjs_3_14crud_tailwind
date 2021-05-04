import Link from 'next/link';
//
const TaskIndexRow = props => (
  <div className="flex flex-row p-2 my-4 rounded-lg shadow-lg bg-white">
    <div className="flex-1  p-2">
      <Link href={`/tasks/${props.id}`}>
      <a className="my-2"><h3 className="text-3xl font-bold">{props.title}</h3>
      </a>
      </Link>
      ID: {props.id}  
    </div>    
    <div className="flex-1 p-2">
      <Link href={`/tasks/edit/${props.id}`}>
        <a className="btn-outline-blue">Edit</a>
      </Link>    
    </div>
  </div>
);
export default TaskIndexRow;
