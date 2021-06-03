import React from "react";
import Navigation from "../components/Navigation";

export default function Page(props) {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navigation active={props.name} />
      <header>
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">{props.name}</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
          {props.children}
        </div>
      </main>
    </div>
  );
}
