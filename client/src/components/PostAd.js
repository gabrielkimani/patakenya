import React, { useEffect } from "react";
import Select from "react-select";
import { counties } from "./utils/data";
import { categories } from "./utils/data";
import Dropzone from "react-dropzone-uploader";
import "react-dropzone-uploader/dist/styles.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { createAd } from "./redux/actions/adActions";
import Cookies from "js-cookie";
import Loader from "./utils/Loader";
import { useNavigate } from "react-router-dom";

function PostAd() {
  const [imageSrc, setImageSrc] = React.useState([]);
  const [loadingImages,setLoadingImages] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [emptyError, setEmptyError] = React.useState(false);
  const [adName, setAdName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [condition, setCondition] = React.useState("");
  const [adSuccess, setAdSuccess] = React.useState(false);
  const [imageSuccess, setImageSuccess] = React.useState(false);
  const dispatch = useDispatch();
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
const navigate = useNavigate();
  const adCreate = useSelector((state) => state.adCreate);
  const { loading, error, success ,ad} = adCreate;

  useEffect(() => {
    if (userInfo) {
      setLocation(userInfo.location);
    }
  }, [userInfo]);

  useEffect(() => {
    if (ad && success) {
      setAdSuccess(true);
      const timer = setTimeout(() => {
        setAdSuccess(false);
        navigate('/my-ads');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const handleSubmit = (files, allFiles) => {
    // console.log(files.map((f) => f.meta));
    // allFiles.forEach((f) => f.remove());

    const uploaders = files.map(async (file) => {
      const formData = new FormData();
      formData.append("file", file.file);
      formData.append("upload_preset", "pata_uploads"); // Replace the preset name with your own
      formData.append("api_key", "285267496217836"); // Replace API key with your own Cloudinary key
      formData.append("timestamp", (Date.now() / 1000) | 0);

      // Make an AJAX upload request using Axios (replace Cloudinary URL below with your own)
      setLoadingImages(true);
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/patakenya/image/upload",
        formData,
        {
          headers: { "X-Requested-With": "XMLHttpRequest" },
        }
      );
      // const data = response.data;
      return response.data;
    });

    // Once all the files are uploaded

    axios.all(uploaders).then((data, err) => {
      data.forEach((dat) => {
        imageSrc.push(dat.secure_url);
      });

      Cookies.set("images", JSON.stringify(imageSrc));
      setImageSuccess(true);
      setLoadingImages(false);
    });
  };
  const handleCreate = () => {
    if (
      adName === "" ||
      description === "" ||
      price === "" ||
      location === "" ||
      category === "" ||
      condition === "" ||
      imageSrc.length === 0
    ) {
      setEmptyError(true);
      const timer = setTimeout(() => {
        setEmptyError(false);
        clearTimeout(timer);
      }, 3000);
    } else {
      dispatch(
        createAd({
          adName,
          description,
          price,
          location,
          category: category.value,
          condition,
          images: imageSrc,
        })
      );
    }
  };


  return (
    <div classNameName="flex items-center justify-center h-screen bg-gray-100">
      {loading && <Loader />}
      <div className="px-8 py-6 mt-4 mb-4 text-left bg-white shadow-lg md:w-1/3 lg:w-1/2 sm:w-1/3 mx-auto">
        {emptyError && (
          <div
            className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
            role="alert"
          >
            <span className="font-medium">Error!-</span> Please fill all the
            fields
          </div>
        )}
        {error && (
          <div
            className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
            role="alert"
          >
            <span className="font-medium">Error!-</span> {error}
          </div>
        )}
        {adSuccess && (
          <div
            className="p-4 mb-4 flex text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800"
            role="alert"
          >
            <span className="font-medium">Success!- </span> You have
            successfully submitted Your ad for review
          </div>
        )}
        <div className="mt-4">
          <div>
            <label className="block" for="Name">
              What are you selling?
            </label>
            <input
              type="text"
              placeholder="Name"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-300"
              value={adName}
              onChange={(e) => setAdName(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="block" for="email">
            Select Category
          </label>
          <Select
            options={categories}
            className="focus:border-orange-300"
            onChange={setCategory}
          />
        </div>

        <div className="mt-4">
          <label className="block" for="email">
            Select Location
          </label>
          <input
            type="text"
            placeholder="Location"
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-300"
            value={userInfo?.location}
            disabled
          />
        </div>

        <div className="mt-4">
          <label
            for="message"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
          >
            Description
          </label>
          <textarea
            id="message"
            rows="4"
            className="block p-2.5 w-full text-sm px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-300"
            placeholder="Leave a nice Description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div className="mt-4">
          <div>
            <label className="block" for="Name">
              Price
            </label>
            <input
              type="number"
              placeholder="Price"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-300"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="block" for="Condition">
            Condition
          </label>
          <select
            className="form-select form-select-lg mb-3
      appearance-none
      block
      w-full px-4 py-2 mt-2 border rounded-md focus:ring-1 focus:ring-orange-300
      bg-white bg-clip-padding bg-no-repeat
      transition
      ease-in-out
      m-0
      text-sm text-gray-400
   focus:bg-white focus:outline-none"
            aria-label=".form-select-lg example"
            required
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
          >
            <option selected>Select Condition</option>
            <option value="New">New</option>
            <option value="Refurbished">Refurbished</option>
            <option value="Used">Used</option>
          </select>
        </div>
        <div className="mt-4">
        <label className="block" for="Condition">
            Upload Images
          </label>
          {imageSuccess ? (
             <div
             className="p-4 mb-4 flex text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800"
             role="alert"
           >
             <span className="font-medium">Success!- </span> Images uploaded successfully
           </div>
          ) : loadingImages ?(
            <div>Loading...</div>
          ):(
          <Dropzone
            className="overflow-hidden"
            onSubmit={handleSubmit}
            minFiles={3}
          maxFiles={6}
            inputContent="Drop or click to upload 3 image Files"
            inputWithFilesContent={(files) => `${files.length < 3 ? 3 - files.length : ""} more`}
            submitButtonDisabled={(files) => files.length < 3}
          />
          )}
        </div>

        <button
          className="w-full px-6 py-2 mt-4 text-white bg-orange-500 rounded-lg hover:bg-orange-400"
          onClick={handleCreate}
        >
          Post Ad
        </button>
      </div>
    </div>
  );
}

export default PostAd;
