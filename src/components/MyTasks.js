import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import auth from "../firebase-init";

const MyTasks = ({ tasks, setTasks }) => {
  const [user] = useAuthState(auth);

  const [complete, setComplete] = useState("");

  const userId = user?.uid;
  useEffect(() => {
    fetch(`https://soft-note.herokuapp.com/tasks/${userId}`)
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, [userId, setTasks]);

  const handleComplete = (taskId) => {
    setComplete(taskId);
    toast.success("This task is Completed");
    fetch(`https://soft-note.herokuapp.com/complete/${taskId}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ complete: true }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  const handleDelete = (taskId) => {
    const confirmation = window.confirm(
      "Are You sure, you want to delete this task?"
    );
    if (confirmation) {
      fetch(`https://soft-note.herokuapp.com/delete`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ taskId, userId }),
      })
        .then((res) => res.json())
        .then((data) => setTasks(data));
    }
  };
  return (
    <div className="my-12 px-4 sm:px-12">
      <h1 className="text-center text-3xl mb-4">My ToDo List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {tasks?.map((task) => (
          <div
            key={task._id}
            className="bg-neutral text-white rounded-xl shadow"
          >
            <div className="card-body px-3 items-center text-center">
              <h2
                className={`card-title ${
                  complete.includes(task._id) && "line-through"
                }  ${task.complete && "line-through"}`}
              >
                {task.taskName}
              </h2>
              <p>{task.taskDescription}</p>
              <div className="card-actions justify-end">
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => handleComplete(task._id)}
                >
                  Completed
                </button>
                <button
                  className="btn btn-error text-white btn-sm"
                  onClick={() => handleDelete(task._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyTasks;
