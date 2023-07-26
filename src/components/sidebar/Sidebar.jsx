import { Link } from "react-router-dom";
import "../sidebar/Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/articles">
        <div className="sidebar__options">Articles</div>
      </Link>

      <Link to="/items">
        <div className="sidebar__options">Items</div>
      </Link>

      <Link to="/categories">
        <div className="sidebar__options">Categories</div>
      </Link>
    </div>
  );
};

export default Sidebar;
