import axios from "axios";
import React, { useState } from "react";
import Perks from "./Perks";

export default function CreatePlaceForm() {
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [photoLink, setPhotoLink] = useState("");
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

  const addPhotoByLink = async (e) => {
    e.preventDefault();
    let { data: filename } = await axios.post("/upload-photo-by-link", { link: photoLink });
    setAddedPhotos((prev) => {
      return [...prev, filename];
    });
    setPhotoLink("");
  };

  const uploadPhotos = (e) => {
    const files = e.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }
    axios
      .post("/upload-photos", data, {
        headers: { "Content-type": "multipart/form-data" },
      })
      .then((response) => {
        const { data: filenames } = response;
        console.log(filenames);
        setAddedPhotos((prev) => {
          return [...prev, ...filenames];
        });
      });
  };
  return (
    <div>
      <form>
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
        <div className="mb-4">
          <h2 className="text-xl font-medium">Photos</h2>
          <p className="text-sm text-gray-500">The more the better.</p>
          <div className="flex items-center gap-2 ">
            <input
              type="text"
              placeholder="Add photos using link e.g: something.jpg"
              value={photoLink}
              onChange={(e) => {
                setPhotoLink(e.target.value);
              }}
            />
            <button className="font-medium text-sm" onClick={addPhotoByLink}>
              Add&nbsp;Photo
            </button>
          </div>
          <div className="grid grid-cols-3 lg:grid-cols-4 lg:grid-cols-6 gap-2 mt-2">
            {addedPhotos?.length > 0 &&
              addedPhotos?.map((d) => (
                <div className="">
                  <img className="rounded h-full object-cover" src={import.meta.env.VITE_MEDIA_URL + d} alt={d} />
                </div>
              ))}
            <label className="hover:bg-gray-100 md:max-w-xs flex justify-center items-center gap-1 border bg-transparent rounded font-medium text-gray-600 cursor-pointer">
              <input type="file" multiple className="hidden" onChange={uploadPhotos} />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                />
              </svg>
              Upload
            </label>
          </div>
        </div>
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
            <PreInput header={"Number of guest"} desc={"Number of people you are bringing in, including you"} />
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
          <button className="primary font-medium">Save</button>
        </div>
      </form>
    </div>
  );
}
