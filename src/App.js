import { useState, useEffect } from "react";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import PhText from "./components/PhText";
import AddTask from "./components/AddTask";

function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const serverData = await fetchTasks();
      setTasks(serverData);
    };
    getTasks();
  }, []);

  const dayFormat = {
    1: "1st",
    2: "2nd",
    3: "3rd",
    21: "21st",
    22: "22nd",
    23: "23rd",
    31: "31st",
  };

  // Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/tasks");
    const data = await res.json();
    return data;
  };
  // Fetch Selected Task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();
    return data;
  };

  // Add Task
  const addTask = async ({ text, date, reminder }) => {
    const day = await dateFormatter(date);
    const newTask = { text, day, reminder };

    const res = await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newTask),
    });

    const addedTask = await res.json();
    setTasks([...tasks, addedTask]);
  };

  const dateFormatter = async (date) => {
    const dayN = date.getDate();
    const dayNth = dayFormat.dayN ? dayFormat.dayN : `${dayN}th`;
    const month = date.toLocaleString("default", { month: "long" });
    // const month = new Intl.DateTimeFormat('en-US', {month: 'long'}).format(date)
    // the above code has more support for browsers but this isn't prod so 🙃
    let timeH = await timePeriod(date);
    const timeM = date.getMinutes();
    const day = `${month} ${dayNth} at ${timeH.h}:${timeM}${timeH.unit}`;
    return day;
  };

  async function timePeriod(timeInfo) {
    let timeX = timeInfo.getHours();
    const timeH =
      timeX > 12 ? { h: timeX - 12, unit: "pm" } : { h: timeX, unit: "am" };
    return timeH;
  }

  // Delete Task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE",
    });

    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Toggle Reminder
  const toggleReminder = async (id) => {
    const getTask = await fetchTask(id);
    const updatedTask = { ...getTask, reminder: !getTask.reminder };

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(updatedTask),
    });

    const data = await res.json();
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
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
