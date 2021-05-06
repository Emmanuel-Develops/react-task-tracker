import { useState } from "react";

const AddTask = ({ onAdd }) => {
  const [text, setText] = useState("");
  const [day, setDay] = useState("");
  const [time, setTime] = useState("");
  const [reminder, setReminder] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    const date = new Date(`${day}T${time}`);
    // const addedTask = { text, date, reminder }
    onAdd({text, date, reminder});
    setText("");
    setDay("");
    setTime("");
    setReminder(false);
  };

  return (
    <form className="add-form" onSubmit={onSubmit}>
      <div className="form-control">
        <label htmlFor="taskText">Task</label>
        <input
          type="text"
          id="taskText"
          placeholder="Task Name"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
      </div>
      <div className="form-control">
        <label htmlFor="taskDate">Day & Time</label>
        <input
          type="date"
          id="taskDate"
          placeholder="Add date and time"
          value={day}
          onChange={(e) => setDay(e.target.value)}
          required
        />
        <input
          type="time"
          id="taskDate"
          placeholder="Add date and time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />
      </div>
      <div className="form-control form-control-check">
        <label htmlFor="taskRemind">Set Reminder</label>
        <input
          type="checkbox"
          id="taskRemind"
          checked={reminder}
          value={reminder}
          onChange={(e) => setReminder(e.currentTarget.checked)}
        />
      </div>

      <input className="btn btn-block" type="submit" value="Save Task" />
    </form>
  );
};

export default AddTask;
