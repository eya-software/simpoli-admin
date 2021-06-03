import React from 'react';
import Navigation from '../components/Navigation';

export default function Team() {
  return (
    <>
      <Navigation active="Team" />
      <header>
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Team</h1>
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