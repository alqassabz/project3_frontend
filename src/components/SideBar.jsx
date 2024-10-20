import { Link } from "react-router-dom";

const SideBar = ({ isOpen, toggleSidebar, communities }) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      
      <div className="list">
        <button className="close-btn" onClick={toggleSidebar}>×</button>
      <h3>Communities</h3> {/* Optional header for the community list */}
      <ul>
        
        {communities.map((community, index) => (
          <Link to={`/listings/${community._id}`}>
          <li key={index}>{community.name}</li>  
          </Link>
        ))}
        
      </ul>
      </div>
    </div>
  );
};

export default SideBar


