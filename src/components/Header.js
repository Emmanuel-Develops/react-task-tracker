import PropTypes from "prop-types";
import Button from "./Button";

const Header = ({ title, toggleAddTask, showAddTask }) => {
  

  return (
    <header className="header">
      <h1>{title}</h1>
      <Button onClick={() => toggleAddTask(!showAddTask)} color={showAddTask ? "red" : "green"} text={showAddTask ? "Close" : "Add"} />
    </header>
  );
};

Header.defaultProps = {
  title: "Task Tracker",
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  showAddTask: PropTypes.bool.isRequired,
  toggleAddTask: PropTypes.func
};
// CSS IN JS
// const headerStyle = {
//     color: 'red',
//     backgroundColor: 'black',
// }

export default Header;
