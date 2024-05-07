import { Link } from 'react-router-dom';

const BreadCrumb = ({ text1, text2, url1, url2 }) => {
  return (
    <div className="text-md breadcrumbs">
      <ul>
        <li>
          <Link to={url1}>{text1}</Link>
        </li>
        <li>
          <Link to={url2}>{text2}</Link>
        </li>
      </ul>
    </div>
  );
};
export default BreadCrumb;
