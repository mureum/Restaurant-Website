import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { LoginTables } from "./LoginTables";

function AdminDashboard({ setIsLoggedIn, handleLogin }) {
  return (
    <>
      <div className="flex flex-col gap-10 container mx-auto">
        <h1 className="text-3xl font-bold">
          Logins <i className="fa-solid fa-sign-in"></i>
        </h1>
        <LoginTables nextStepText="Delete User" isCancellable={true} />
      </div>
    </>
  );
}

export default AdminDashboard;
