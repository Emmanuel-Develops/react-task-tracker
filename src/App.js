import { useState } from "react";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import PhText from "./components/PhText";

function App() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: "Doctors Appointment",
      day: "March 12th at 8:45am",
      reminder: true,
    },
    {
      id: 2,
      text: "Grocery Shopping",
      day: "March 16th at 10:00am",
      reminder: false,
    },
  ]);

  // Delete Task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Toggle Reminder
  const toggleReminder = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: !task.reminder } : task
      )
    );
  };

  return (
    <div className="container">
      <Header />
      {tasks.length > 0 ? (
        <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
      ) : (
        <PhText />
      )}
    </div>
  );
}

export default App;
