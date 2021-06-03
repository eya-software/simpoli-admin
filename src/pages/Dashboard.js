import React from "react";
import Navigation from "../components/Navigation";

function Dashboard() {
  return (
    <>
      <Navigation active="Dashboard" />
      <header>
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          Hello World
        </div>
      </main>
    </>
  );
}

export default Dashboard;
