// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import KanbanBoard from "../components/Kanbanboard/Kanbanboard";

// const Planner = () => {
//   const [plans, setPlans] = useState([]);
//   const [editingPlanId, setEditingPlanId] = useState(null);
//   const [viewingPlanId, setViewingPlanId] = useState(null);
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [mode, setMode] = useState(""); // "add", "edit", "view"
//   const [veiwBoard,setViewBoard]=useState(false);

//   useEffect(() => {
//     fetchPlans();
//   }, []);

//   const fetchPlans = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/planner/plans", {
//         withCredentials: true,
//       });
//       setPlans(response.data?.plans || []);
//     } catch (error) {
//       console.error("Error fetching plans:", error);
//     }
//   };

//   const handleAddPlan = async () => {
//     if (!title || !description) {
//       alert("Fill all the details");
//       return;
//     }

//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/planner/add",
//         { title, description },
//         { withCredentials: true }
//       );

//       const result = response.data;
//       alert(result.message || "Plan saved!");

//       setPlans((prev) => [...prev, result.plan]);
//       resetForm();
//     } catch (error) {
//       console.error("Error saving plan:", error);
//       alert("Something went wrong while saving the plan.");
//     }
//   };

//   const handleUpdatePlan = async (planId) => {
//     if (!title || !description) {
//       alert("Fill all the details");
//       return;
//     }

//     try {
//       const response = await axios.put(
//         `http://localhost:5000/api/planner/update/${planId}`,
//         { title, description },
//         { withCredentials: true }
//       );

//       const result = response.data;
//       alert(result.message || "Plan updated!");

//       // Instead of manually updating, re-fetch the latest list (more reliable)
//       await fetchPlans();
//       resetForm();
//     } catch (error) {
//       console.error("Error updating plan:", error);
//       alert("Something went wrong while updating the plan.");
//     }
//   };

//   const deletePlan = async (planId) => {
//     try {
//       const response = await axios.delete(
//         `http://localhost:5000/api/planner/delete/${planId}`,
//         { withCredentials: true }
//       );
//       alert(response.data.message || "Plan deleted!");

//       setPlans((prev) => prev.filter((plan) => plan._id !== planId));
//     } catch (error) {
//       console.error("Error deleting plan:", error);
//       alert("Something went wrong while deleting the plan.");
//     }
//   };

//   const handleView = (plan) => {
//     setTitle(plan.title);
//     setDescription(plan.description);
//     setViewingPlanId(plan._id);
//     setEditingPlanId(null);
//     setMode("view");
//   };

//   const handleEdit = (plan) => {
//     setTitle(plan.title);
//     setDescription(plan.description);
//     setEditingPlanId(plan._id);
//     setViewingPlanId(null);
//     setMode("edit");
//   };

//   const resetForm = () => {
//     setTitle("");
//     setDescription("");
//     setEditingPlanId(null);
//     setViewingPlanId(null);
//     setMode("");
//   };

//   return (
//     <div>
//       <h1>Your Plans</h1>

//       {/* Add New Plan Button */}
//       {mode !== "add" && (
//         <button onClick={() => {
//           resetForm();
//           setMode("add");
//         }}>
//           Add New Plan
//         </button>
//       )}

//       {/* Add New Plan Form */}
//       {mode === "add" && (
//         <div style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
//           <h2>Add New Plan</h2>
//           <input
//             type="text"
//             placeholder="Title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />
//           <br />
//           <textarea
//             placeholder="Description / Notes"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             rows={4}
//           />
//           <br />
//           <button onClick={handleAddPlan}>Save Plan</button>
//           <button onClick={resetForm}>Cancel</button>
//         </div>
//       )}

//       {/* Showing all plans */}
//       {plans.length > 0 ? (
//         plans.map((plan) => (
//           <div key={plan._id} style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
//             {viewingPlanId === plan._id ? (
//               <div>
//                 <h2>View Plan</h2>
//                 <input type="text" value={title} readOnly />
//                 <br />
//                 <textarea value={description} rows={4} readOnly />
//                 <br />
//                 <button onClick={resetForm}>Close</button>
//               </div>
//             ) : editingPlanId === plan._id ? (
//               <div>
//                 <h2>Edit Plan</h2>
//                 <input
//                   type="text"
//                   value={title}
//                   onChange={(e) => setTitle(e.target.value)}
//                 />
//                 <br />
//                 <textarea
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                   rows={4}
//                 />
//                 <br />
//                 <button onClick={() => handleUpdatePlan(plan._id)}>Save Changes</button>
//                 <button onClick={resetForm}>Cancel</button>
//               </div>
//             ) : (
//               <div>
//                 <h3>{plan.title}</h3>
//                 <p>{plan.description}</p>
//                 <button onClick={() => handleView(plan)}>View</button>
//                 <button onClick={() => handleEdit(plan)}>Edit</button>
//                 <button onClick={() => deletePlan(plan._id)}>Delete</button>
//                 <button onClick={() => setViewBoard(prev => !prev)}>
//                     {veiwBoard ? "Hide Board" : "View Board"}
//                 </button>
//               </div>
//             )}
//             {veiwBoard ? (
//               <KanbanBoard plannerId={plan._id} />
//             ) : (
//               <p>Kanbanboard</p> // or you can show nothing here
//             )}
//           </div>
//         ))
//       ) : (
//         <p>No plans found.</p>
//       )}
//     </div>
//   );
// };

// export default Planner;
import React, { useState, useEffect } from "react";
import axios from "axios";
import KanbanBoard from "../components/Kanbanboard/Kanbanboard";

const Planner = () => {
  const [plans, setPlans] = useState([]);
  const [currentPlan, setCurrentPlan] = useState(null);
  const [mode, setMode] = useState(""); // 'add', 'edit', 'view'
  const [viewBoardForPlan, setViewBoardForPlan] = useState(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/planner/plans", { withCredentials: true });
      setPlans(response.data?.plans || []);
    } catch (error) {
      console.error("Error fetching plans:", error);
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setCurrentPlan(null);
    setMode("");
  };

  const handleSubmit = async () => {
    if (!title || !description) {
      alert("Please fill all the details");
      return;
    }

    try {
      if (mode === "add") {
        const { data } = await axios.post(
          "http://localhost:5000/api/planner/add",
          { title, description },
          { withCredentials: true }
        );
        alert(data.message || "Plan added!");
        setPlans(prev => [...prev, data.plan]);
      } else if (mode === "edit" && currentPlan) {
        const { data } = await axios.put(
          `http://localhost:5000/api/planner/update/${currentPlan._id}`,
          { title, description },
          { withCredentials: true }
        );
        alert(data.message || "Plan updated!");
        await fetchPlans();
      }
      resetForm();
    } catch (error) {
      console.error("Error saving/updating plan:", error);
      alert("Something went wrong. Try again.");
    }
  };

  const handleDelete = async (planId) => {
    if (!window.confirm("Are you sure you want to delete this plan?")) return;

    try {
      const { data } = await axios.delete(`http://localhost:5000/api/planner/delete/${planId}`, { withCredentials: true });
      alert(data.message || "Plan deleted!");
      setPlans(prev => prev.filter(plan => plan._id !== planId));
    } catch (error) {
      console.error("Error deleting plan:", error);
      alert("Something went wrong. Try again.");
    }
  };

  const handleView = (plan) => {
    setCurrentPlan(plan);
    setTitle(plan.title);
    setDescription(plan.description);
    setMode("view");
  };

  const handleEdit = (plan) => {
    setCurrentPlan(plan);
    setTitle(plan.title);
    setDescription(plan.description);
    setMode("edit");
  };

  const toggleBoardView = (planId) => {
    setViewBoardForPlan(prev => (prev === planId ? null : planId));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Plans</h1>

      {/* Add Button */}
      {mode !== "add" && (
        <div className="mb-6 text-center">
          <button 
            onClick={() => {
              resetForm();
              setMode("add");
            }}
           style={{ backgroundColor: '#165668' }}
            className="px-6 py-3 text-white rounded-md"
          >
            + Add New Plan
          </button>
        </div>
      )}

      {/* Form for Add/Edit */}
      {(mode === "add" || mode === "edit") && (
        <div className="bg-white p-6 rounded-md shadow-md mb-6">
          <h2 className="text-2xl font-semibold mb-4">{mode === "add" ? "Add New Plan" : "Edit Plan"}</h2>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[#165668] focus:border-[#165668]"

          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <div className="flex gap-4">
            <button
              onClick={handleSubmit}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-md transition"
            >
              {mode === "add" ? "Save Plan" : "Save Changes"}
            </button>
            <button
              onClick={resetForm}
              className="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-6 rounded-md transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* List of Plans */}
      {plans.length > 0 ? (
        plans.map((plan) => (
          <div key={plan._id} className="bg-white p-6 rounded-md shadow-md mb-6">
            {/* Viewing a Plan */}
            {mode === "view" && currentPlan?._id === plan._id ? (
              <div>
                <h2 className="text-2xl font-semibold mb-4">View Plan</h2>
                <input
                  type="text"
                  value={title}
                  readOnly
                  className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[#165668] focus:border-[#165668]"

                />
                <textarea
                  value={description}
                  readOnly
                  rows={4}
                  className="w-full border border-gray-300 rounded-md p-2 mb-4 bg-gray-100"
                />
                <button
                  className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 rounded-md transition"
                  onClick={resetForm}
                >
                  Close
                </button>
              </div>
            ) : (
              <div>
                <h3 className="text-xl font-semibold">{plan.title}</h3>
                <p className="text-gray-600 mt-2">{plan.description}</p>
                <div className="flex flex-wrap gap-3 mt-4">
                  <button
                    onClick={() => handleView(plan)}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleEdit(plan)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-md transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(plan._id)}
                    className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => toggleBoardView(plan._id)}
                    className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-md transition"
                  >
                    {viewBoardForPlan === plan._id ? "Hide Board" : "View Board"}
                  </button>
                </div>
              </div>
            )}

            {/* Kanban Board */}
            {viewBoardForPlan === plan._id && (
              <div className="mt-6">
                <KanbanBoard plannerId={plan._id} />
              </div>
            )}
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No plans found.</p>
      )}
    </div>
  );
};

export default Planner;
