import React, { useEffect, useState } from "react";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const KanbanBoard = ({plannerId}) => {
  const [tasks, setTasks] = useState([]);
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskTitle, setEditTaskTitle] = useState("");

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [addingTaskStatus, setAddingTaskStatus] = useState(null);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/kanban/tasks",
        {
          params: { plannerId },
          withCredentials: true,
        }
      );
      console.log("Fetched Data:", response.data);
      setTasks(response.data);
    } catch (error) {
      console.log("Error Fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const updateTask = async (taskId, column) => {
    try{
      const response=await axios.put(`http://localhost:5000/api/kanban/update/${taskId}`, { title: editTaskTitle ,status:column},{withCredentials:true});
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? response.data : task
        )
      );
    }catch(error){
      console.error("Error updating task:", error);
    }
    setEditTaskId(null);
    setEditTaskTitle("");
  };

  const deleteTask = async (taskId, column) => {
    try{
      await axios.delete(`http://localhost:5000/api/kanban/delete/${taskId}`,{withCredentials:true});
      setTasks(tasks.filter((task) => task._id !== taskId));
    }catch(error){
      console.log("Error deleting task:", error);
    }
  };

  const addTask = async (column) => {
    if (!newTaskTitle.trim()) return;
    try{
      const response = await axios.post("http://localhost:5000/api/kanban/create",
        {title: newTaskTitle,status: column ,plannerId},
        {withCredentials:true}
      );
      setTasks((prevTasks) => [...prevTasks, response.data]);
      setNewTaskTitle("");
      setAddingTaskStatus(null);
    }catch(error){
      console.error("Error adding task:", error);
    }
  };

  const statuses = ["todo", "in-process", "completed"];

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return; // no movement
    }

    const sourceStatus = source.droppableId;
    const destinationStatus = destination.droppableId;

    const task = tasks.find((t) => t._id === result.draggableId);
    if (task) {
      const updatedTasks = tasks.map((t) =>
        t._id === task._id ? { ...t, status: destinationStatus } : t
      );
      setTasks(updatedTasks);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl mb-8 font-bold text-center">Kanban Board</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-3 gap-6">
          {statuses.map((status) => (
            <Droppable droppableId={status} key={status}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-gray-100 p-4 rounded-md min-h-[300px] flex flex-col"
                >
                  <h2 className="text-xl font-semibold mb-4 capitalize">{status}</h2>

                  {addingTaskStatus === status ? (
                    <div className="mb-4">
                      <input
                        value={newTaskTitle}
                        onChange={(e) => setNewTaskTitle(e.target.value)}
                        className="border p-2 rounded w-full mb-2"
                        placeholder="Task Title"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => addTask(status)}
                          className="bg-green-500 text-white px-3 py-1 rounded"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => {
                            setAddingTaskStatus(null);
                            setNewTaskTitle("");
                          }}
                          className="bg-gray-400 text-white px-3 py-1 rounded"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setAddingTaskStatus(status)}
                      className="bg-blue-500 text-white px-3 py-2 rounded mb-4"
                    >
                      ➕ Add New Task
                    </button>
                  )}

                  {tasks
                    .filter((task) => task.status === status)
                    .map((task, index) => (
                      <Draggable key={task._id} draggableId={task._id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`p-3 mb-2 rounded shadow bg-white ${
                              snapshot.isDragging ? "bg-green-100" : ""
                            }`}
                          >
                            {editTaskId === task._id ? (
                              <input
                                value={editTaskTitle}
                                onChange={(e) => setEditTaskTitle(e.target.value)}
                                className="border p-1 rounded w-full mb-2"
                              />
                            ) : (
                              <span className="flex-1">{task.title}</span>
                            )}
                            <div className="flex justify-between mt-2">
                              {editTaskId === task._id ? (
                                <button
                                  onClick={() => updateTask(task._id, status)}
                                  className="text-green-600"
                                >
                                  Save
                                </button>
                              ) : (
                                <button
                                  onClick={() => {
                                    setEditTaskId(task._id);
                                    setEditTaskTitle(task.title);
                                  }}
                                  className="text-blue-500"
                                >
                                  ✏️
                                </button>
                              )}
                              <button
                                onClick={() => deleteTask(task._id, status)}
                                className="text-red-500"
                              >
                                ❌
                              </button>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default KanbanBoard;
