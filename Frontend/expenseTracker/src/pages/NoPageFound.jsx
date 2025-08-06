import React from 'react';
import { Link } from 'react-router-dom';

function NoPageFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-purple-50 text-purple-800 px-4">
      <h1 className="text-9xl font-extrabold">404</h1>
      <p className="text-2xl mt-4 font-semibold">Page Not Found</p>
      <p className="mt-2 text-center max-w-md">
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
}

export default NoPageFound;
