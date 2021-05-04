import Link from 'next/link';

const IndexRow = props => (
  <div className="flex flex-row p-2 my-4 rounded-lg shadow-lg bg-white">
    <div className="flex-1  p-2">
      <Link href={`/books/${props.id}`}>
        <a>
        <h3 className="text-3xl font-bold">{props.title}
        </h3>
        </a>
      </Link>
      ID: {props.id}<br />
    </div>
    <div className="flex-1  p-2">
    <Link href={`/books/${props.id}`}>
        <a className="btn btn-sm btn-outline-primary"> Show</a>
      </Link>
    </div>
  </div>
);
export default IndexRow;
