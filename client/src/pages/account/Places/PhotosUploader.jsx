import axios from "axios";
import React, { useState } from "react";

export default function PhotosUploader({ addedPhotos, onChange }) {
  const [photoLink, setPhotoLink] = useState("");

  const addPhotoByLink = async (e) => {
    e.preventDefault();
    let { data: filename } = await axios.post("/upload-photo-by-link", { link: photoLink });
    onChange((prev) => {
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
        onChange((prev) => {
          return [...prev, ...filenames];
        });
      });
  };
  return (
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
      <div className="grid grid-cols-3 lg:grid-cols-4  gap-2 mt-2">
        {addedPhotos?.length > 0 &&
          addedPhotos?.map((d) => (
            <div className="" key={d}>
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
  );
}
