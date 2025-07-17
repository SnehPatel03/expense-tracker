import React from "react";
import { useNavigate } from "react-router-dom";
import { TbError404 } from "react-icons/tb"; // Optional icon
import { MdOutlineArrowBack } from "react-icons/md";

function NoFound() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-100 to-purple-200 text-purple-800 px-4">
            <div className="text-center">
                <div className="text-[120px] font-bold flex justify-center items-center gap-2">
                    <TbError404 size={100} className="text-purple-700" />
                    <span className="text-purple-700">404</span>
                </div>
                <h1 className="text-3xl font-bold mt-2">Page Not Found</h1>
                <p className="mt-2 text-md text-purple-600 max-w-md mx-auto">
                    Oops! It looks like your expense slipped into a void. This page doesn’t exist — just like your hidden savings!
                </p>

                <img
                    src="https://cdn-icons-png.flaticon.com/512/4135/4135235.png"
                    alt="Expense lost"
                    className="w-64 mt-6 mx-auto drop-shadow-lg"
                />

                <button
                    onClick={() => {
                        const token = localStorage.getItem('token');
                        if (token) {
                            navigate('/home');
                        } else {
                            navigate('/login');
                        }
                    }}

                    className="mt-6 bg-purple-700 text-white px-6 py-2 rounded-lg hover:bg-purple-800 transition"
                >
                    <MdOutlineArrowBack className="inline-block mr-2" />
                    Back to Dashboard
                </button>
            </div>
        </div>
    );
}

export default NoFound;
