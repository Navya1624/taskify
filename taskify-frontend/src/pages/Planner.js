import React, { useState, useEffect } from "react";
import axios from "axios";

const Planner = () => {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [plans, setPlans] = useState([]);

  // Fetch all plans when component mounts
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/planner/plans", {
          withCredentials: true,
        });
        setPlans(response.data.plans || []);
      } catch (error) {
        console.error("Error fetching plans:", error);
      }
    };

    fetchPlans();
  }, []);

  const handleAddPlan = async () => {
    if (!title || !description) return alert("Fill all the details");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/planner/plans",
        { title, description },
        { withCredentials: true }
      );

      const result = response.data;
      alert(result.message || "Plan saved!");

      // Add new plan to the list
      setPlans((prev) => [...prev, result.plan]);

      // Reset form
      setTitle("");
      setDescription("");
      setShowForm(false);
    } catch (error) {
      console.error("Error saving plan:", error);
      alert("Something went wrong while saving the plan.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <button
        onClick={() => setShowForm(!showForm)}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
      >
        + Add Plan
      </button>

      {showForm && (
        <div className="bg-white p-4 shadow-md rounded mb-4">
          <h2 className="text-xl font-bold mb-2">Create Plan</h2>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border p-2 mb-2"
          />
          <textarea
            placeholder="Description / Notes"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border p-2 mb-2"
            rows={4}
          />
          <button
            onClick={handleAddPlan}
            className="bg-black text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      )}

      <div>
        {plans.length === 0 ? (
          <p className="text-gray-500">No plans added yet.</p>
        ) : (
          plans.map((plan, index) => (
            <div
              key={index}
              className="border p-4 mb-3 bg-gray-100 rounded shadow"
            >
              <h3 className="font-semibold text-lg">{plan.title}</h3>
              <p className="text-gray-700">{plan.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Planner;
