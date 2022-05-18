import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase-init";
import MyTasks from "./MyTasks";

const Home = () => {
  const [user] = useAuthState(auth);
  const [tasks, setTasks] = useState([]);
  const userId = user?.uid;
  const handleAddTask = (e) => {
    e.preventDefault();
    const taskName = e.target.taskName.value;
    const taskDescription = e.target.taskDescription.value;
    const complete = false;
    const task = { taskName, taskDescription, complete, userId };
    fetch("https://soft-note.herokuapp.com/add-task", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ task, userId }),
    })
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
        e.target.taskName.value = "";
        e.target.taskDescription.value = "";
      });
  };

  return (
    <div className="">
      <div className="bg-purple-400 py-12 px-3 md:px-16 ">
        <h1 className="text-center text-4xl text-white">Add New Task</h1>
        <form
          className="bg-white w-full sm:w-[450px] rounded-lg shadow-lg p-6 mx-auto my-4"
          onSubmit={handleAddTask}
        >
          <input
            type="text"
            placeholder="Task Name"
            className="input border border-transparent focus:border-primary focus:outline-none w-full bg-gray-100"
            name="taskName"
            id="taskName"
            required
          />
          <textarea
            className="textarea border border-transparent focus:border-primary focus:outline-none w-full my-6 bg-gray-100"
            placeholder="Task Description"
            name="taskDescription"
            id="taskDescription"
            required
          ></textarea>
          <input
            type="submit"
            value="Add Task"
            className="btn btn-primary w-full"
          />
        </form>
      </div>

      <MyTasks tasks={tasks} setTasks={setTasks} />
    </div>
  );
};

export default Home;
