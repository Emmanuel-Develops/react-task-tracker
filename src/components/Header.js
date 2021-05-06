import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import Button from "./Button";

const Header = ({ title, toggleAddTask, showAddTask }) => {
  const location = useLocation();
  return (
    <header className="header">
      <h1>{title}</h1>
      {location.pathname === "/" && (
        <Button
          onClick={() => toggleAddTask()}
          color={showAddTask ? "red" : "green"}
          text={showAddTask ? "Close" : "Add"}
        />
      )}
    </header>
  );
};

Header.defaultProps = {
  title: "Task Tracker",
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  showAddTask: PropTypes.bool.isRequired,
  toggleAddTask: PropTypes.func,
};
// CSS IN JS
// const headerStyle = {
//     color: 'red',
//     backgroundColor: 'black',
// }

export default Header;
