import React from "react";
import { Link, useParams } from "react-router-dom";
import CreatePlaceForm from "./CreatePlaceForm";

export default function Places() {
  const { type } = useParams();
  return (
    <div>
      {type !== "new" && (
        <Link to="/account/places/new">
          <button className="primary flex justify-center items-center max-w-xs">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 mr-1"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add Place
          </button>
        </Link>
      )}
      {type === "new" && <CreatePlaceForm/>}
    </div>
  );
}