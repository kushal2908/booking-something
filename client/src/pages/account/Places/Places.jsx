import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AccountNavigation from "../AccountNavigation";
import CreatePlaceForm from "./CreatePlaceForm";

export default function Places() {
  const { type } = useParams();
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    if (type !== "new") {
      axios
        .get("/places")
        .then(({ data }) => {
          setPlaces(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return (
    <div className="mt-8 w-full md:w-2/3 mx-auto">
      <AccountNavigation />
      <div className="mt-8">
        <div className="w-full text-center">
          <Link to="/account/places/new" className="my-4">
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
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          {places?.map((d) => (
            <Link to={"/account/places/" + d?._id}>
              <div className="mt-4 border rounded-lg cursor-pointer">
                <div className="mb-2">
                  {d?.photos?.length > 0 && <img src={d?.photos[0]} alt={d?.photos[0]} />}
                  <div className="px-4 py-2">
                    <p className="text-xl font-medium">{d?.title}</p>
                    <p className="text-sm font-medium text-gray-500">{d?.address}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
