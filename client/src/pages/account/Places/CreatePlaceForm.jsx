import React, { useEffect, useState } from "react";
import axios from "axios";
import Perks from "./Perks";
import PhotosUploader from "./PhotosUploader";
import { useNavigate, useParams } from "react-router-dom";
import AccountNavigation from "../AccountNavigation";

export default function CreatePlaceForm() {
  let navigate = useNavigate();
  let { id } = useParams();
  console.log(id);
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [check_in, setCheck_in] = useState("");
  const [check_out, setCheck_out] = useState("");
  const [max_guest, setMaxGuest] = useState(1);

  const PreInput = ({ header, desc }) => {
    return (
      <>
        <h2 className="text-xl font-medium">{header}</h2>
        <p className="text-sm text-gray-500">{desc}</p>
      </>
    );
  };

  const addNewPlace = async (e) => {
    e.preventDefault();
    const place_data = {
      title,
      address,
      photos: addedPhotos,
      description,
      perks,
      extra_info: extraInfo,
      check_in,
      check_out,
      max_guest,
    };
    try {
      let res = axios.post("/add-place", place_data);
      navigate("/account/places");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!id) return;
    axios
      .get("/places/" + id)
      .then(() => {})
      .catch((err) => {
        console.log(err);
      });
  }, [id]);
  return (
    <div className="mt-8 w-full md:w-2/3 mx-auto">
      <AccountNavigation />
      <form onSubmit={addNewPlace} className="mt-8">
        <div className="mb-4">
          <PreInput header={"Name of your place"} desc={"Name of your place, should be catchy"} />
          <input
            className="mb-0"
            type="text"
            placeholder="e.g: My Home"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div className="mb-4">
          <PreInput header={"Address"} desc={"Provide Your full address"} />
          <input
            type="text"
            placeholder="e.g: Cecilia Chapman 711-2880 Nulla St. Mankato Mississippi 96522"
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          />
        </div>
        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

        <div className="mb-4">
          <PreInput header={"Description"} desc={"Describe about your place"} />
          <textarea
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-medium">Perks</h2>
          <p className="text-sm text-gray-500">Select all the perks of your place.</p>
          <Perks selected={perks} onChange={setPerks} />
        </div>
        <div className="mb-4">
          <PreInput
            header={"Extra info"}
            desc={"House rules etc."}
            value={extraInfo}
            onChange={(e) => {
              setExtraInfo(e.target.value);
            }}
          />
          <textarea />
        </div>
        <div className="mb-4 grid gap-4 grid-cols-1 md:grid-cols-3">
          <div className="mb-4">
            <PreInput header={"Check in time"} desc={"When you will be arrive"} />
            <input
              type="date"
              value={check_in}
              onChange={(e) => {
                setCheck_in(e.target.value);
              }}
            />
          </div>
          <div className="mb-4">
            <PreInput header={"Check out time"} desc={"When you will be leave"} />
            <input
              type="date"
              value={check_out}
              onChange={(e) => {
                setCheck_out(e.target.value);
              }}
            />
          </div>
          <div className="mb-4">
            <PreInput header={"Number of guest"} desc={"Total guests including you"} />
            <input
              type="number"
              min={1}
              value={max_guest}
              onChange={(e) => {
                setMaxGuest(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="mb-4 w-full">
          <button type="type" className="primary w-full md:w-1/2 font-medium">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
