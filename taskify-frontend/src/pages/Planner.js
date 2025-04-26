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

      setPlans((prev) => [...prev, result.plan]);
      setTitle("");
      setDescription("");
      setShowForm(false);
    } catch (error) {
      console.error("Error saving plan:", error);
      alert("Something went wrong while saving the plan.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">📅 My Planner</h1>

      <div className="flex justify-end mb-6">
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-[#005D5C] hover:bg-[#004746] text-white font-semibold px-5 py-2 rounded-lg shadow-md transition duration-300"
        >
          {showForm ? "Close" : "+ Add Plan"}
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 shadow-lg rounded-lg mb-6 border border-gray-200">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Create New Plan</h2>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-[#005D5C]"
          />
          <textarea
            placeholder="Description / Notes"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-[#005D5C]"
            rows={4}
          />
          <button
            onClick={handleAddPlan}
            className="bg-[#005D5C] hover:bg-[#004746] text-white font-semibold px-6 py-2 rounded-md transition duration-300"
          >
            Save Plan
          </button>
        </div>
      )}

      <div className="space-y-4">
        {plans.length === 0 ? (
          <p className="text-gray-500 text-center">No plans added yet.</p>
        ) : (
          plans.map((plan, index) => (
            <div
              key={index}
              className="bg-gray-50 border border-gray-200 p-5 rounded-lg shadow-sm hover:shadow-md transition duration-300"
            >
              <h3 className="font-bold text-xl mb-2 text-[#005D5C]">{plan.title}</h3>
              <p className="text-gray-700">{plan.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Planner;
