import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { LoginTables } from "./LoginTables";

function AdminDashboard({ setIsLoggedIn, handleLogin }) {
  return (
    <>
      <div className="flex flex-col gap-10 container mx-auto">
        <div className="form-control self-end">
          <div className="input-group">
            <input
              type="text"
              placeholder="Search…"
              className="input input-bordered"
            />
            <button className="btn btn-square">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </div>
        <h1 className="text-3xl font-bold">
          Logins <i className="fa-solid fa-sign-in"></i>
        </h1>
        <LoginTables nextStepText="Delete User" isCancellable={true} />
      </div>
    </>
  );
}

export default AdminDashboard;
