import { useState } from "react";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import PhText from "./components/PhText";
import AddTask from "./components/AddTask";

function App() {
  const [showAddTask, setShowAddTask] = useState(false);
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

  // Add Task
  const addTask = (task) => {
    const taskId = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1;
    const newTask = { ...task, id: taskId };
    setTasks([...tasks, newTask]);
  };

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

  // Toggle Add
  const toggleAdd = () => {
    setShowAddTask(!showAddTask);
  };

  return (
    <div className="container">
      <Header toggleAddTask={toggleAdd} showAddTask={showAddTask} />
      {showAddTask && <AddTask onAdd={addTask} />}
      {tasks.length > 0 ? (
        <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
      ) : (
        <PhText />
      )}
    </div>
  );
}

export default App;
