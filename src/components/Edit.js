import React, { useState } from "react";
import AlertDialog from "../components/AlertDialog";
import { firestore as db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";

export default function Create(props) {
  const policy = props.policy;
  const { currentUser } = useAuth(policy.author);
  const [firstName, setFirstName] = useState(
    currentUser.displayName
      ? currentUser.displayName.split(", ")[1].slice(0, -4)
      : ""
  );
  const [lastName, setLastName] = useState(
    currentUser.displayName ? currentUser.displayName.split(", ")[0] : ""
  );
  const [dialogOpen, setDialogOpen] = useState( false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [title, setTitle] = useState(policy.title);
  const [image, setImage] = useState(policy.image);
  const [portraitImage, setPortraitImage] = useState(policy.portraitImage);
  const [video, setVideo] = useState(policy.video);
  const [description, setDescription] = useState(policy.description);
  const [miniDescription, setMiniDescription] = useState(policy.miniDescription);

  const [title1, setTitle1] = useState(policy.title);
  const [image1, setImage1] = useState(policy.image);
  const [portraitImage1, setPortraitImage1] = useState(policy.portraitImage);
  const [video1, setVideo1] = useState(policy.video);
  const [description1, setDescription1] = useState(policy.description);
  const [miniDescription1, setMiniDescription1] = useState(policy.miniDescription);
  const today = new Date();
  const [type, setType] = useState();



  /*async function checkType() {
    let collectionRef2 = db.collection("policies").doc(policy.id);
    const doc2 = await collectionRef2.get();


    if (doc2.exists) {
      console.log("Doc exists in policies");
      setType("Policy");
    } else {
      console.log("Doc does not exist in policies");
      setType("News");
    }

  }

  checkType();*/



  // if (currentUser.displayName) {
  //   setFirstName(currentUser.displayName.split(", ")[1].slice(0, -4))
  //   setLastName(currentUser.displayName.split(", ")[0]);
  // }

  async function getType() {
    let ref = db.collection('policies').doc(policy.id);
    const doc = await ref.get();
    if (doc.exists) {
      setType("Policy");
    } else {
      setType("News");
    }

  }
  async function createPost() {
    let collectionRef;
    setError("");
    setSuccess("");

    setFirstName(firstName.trim());
    setLastName(lastName.trim());
    if (!(firstName && lastName)) {
      setError("You are missing some required fields.");
      return;
    }
    /*collectionRef = db.collection("policies").doc(policy.id);
    const doc = await collectionRef.get();


    if (doc.exists) {
      console.log("Doc exists in policies");
      setType("Policy");
    } else {
      console.log("Doc does not exist in policies");
       setType("News");
    }*/

    console.log(type);

    if (type === "Policy") {
      if (!(title && miniDescription && description && image)) {
        setError("You are missing some required fields.");
        return;
      }

      collectionRef = db.collection("policies");
      if (!image.startsWith("http")) {
        setImage("http://" + image);
      }
      try {
        await collectionRef.doc(policy.id).update({
          author: firstName + " " + lastName,
          title: title,
          image: image,
          portraitImage: portraitImage,
          video: video, 
          miniDescription: miniDescription,
          description: description,
          date: today,
          status: 1,
        });
        clearFields();
        setSuccess("Success! This policy is now being displayed on the app.");
        console.log(success);
      } catch (e) {
        setError("There was an error with submission. Please try again later.");
        db.collection("errors").add({
          message: e,
        });
        return;
      }
    } else {
      if (!(title1 && miniDescription1 && description1 && image1)) {
        setError("You are missing some required fields.");
        return;
      }

      collectionRef = db.collection("news");
      if (!image.startsWith("http")) {
        setImage1("http://" + image);
      }
      try {
        await collectionRef.doc(policy.id).update({
          author: firstName + " " + lastName,
          title: title1,
          image: image1,
          portraitImage: portraitImage1,
          video: video1,
          miniDescription: miniDescription1,
          description: description1,
          date: today,
          status: 1,
        });
        clearFields();
        setSuccess("Success! This article is now being displayed on the app.");
      } catch (e) {
        setError("There was an error with submission. Please try again later.");
        db.collection("errors").add({
          message: e,
        });
        return;
      }
    }
  }

  function clearFields() {
    setTitle("");
    setImage("");
    setPortraitImage("");
    setVideo("");
    setMiniDescription("");
    setDescription("");
    setTitle1("");
    setImage1("");
    setPortraitImage("");
    setVideo1("");
    setMiniDescription("");
    setDescription1("");
  }

  getType();



  return (
    <>
      <div>
        <div className="shadow sm:rounded-md sm:overflow-hidden">
          <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="first_name"
                  className="block text-sm font-medium text-gray-700"
                >
                  First Name
                </label>
                <input
                  type="text"
                  name="first_name"
                  id="first_name"
                  autoComplete="given-name"
                  className="mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  value={firstName}
                  onChange={(event) => setFirstName(event.target.value)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="last_name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last name
                </label>
                <input
                  type="text"
                  name="last_name"
                  id="last_name"
                  autoComplete="family-name"
                  className="mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  value={lastName}
                  onChange={(event) => setLastName(event.target.value)}
                />
              </div>
            </div>


            {type === "Policy" && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Policy Title
                  </label>
                  <input
                    type="text"
                    name="article_title"
                    id="article_title"
                    className="mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                  />
                </div>

                <div>
                  <label
                    htmlFor="company_website"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Image Link
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                      http://
                    </span>
                    <input
                      type="url"
                      name="image_link"
                      id="image_link"
                      className="focus:ring-yellow-500 focus:border-yellow-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                      placeholder="www.example.com/picture.png"
                      value={image}
                      onChange={(event) => setImage(event.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="company_website"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Portrait Image Link
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                      http://
                    </span>
                    <input
                      type="url"
                      name="portrait_image_link"
                      id="portrait_image_link"
                      className="focus:ring-yellow-500 focus:border-yellow-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                      placeholder="www.example.com/picture.png"
                      value={portraitImage}
                      onChange={(event) =>
                        setPortraitImage(event.target.value)
                      }
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="video_link"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Video Link
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                      http://
                    </span>
                    <input
                      type="url"
                      name="video_link"
                      id="video_link"
                      className="focus:ring-yellow-500 focus:border-yellow-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                      placeholder="www.youtube.com/watch?v=example"
                      value={video}
                      onChange={(event) => setVideo(event.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="about"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Brief Description
                    <span className="text-gray-400 font-normal">
                      {" (" + miniDescription.length + "/200 characters)"}
                    </span>
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="miniDescription"
                      name="miniDescription"
                      rows={2}
                      className="shadow-sm focus:ring-yellow-500 focus:border-yellow-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
                      value={miniDescription}
                      onChange={(event) => {
                        setMiniDescription(
                          event.target.value.substring(0, 200)
                        );
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="about"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Policy Description
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="description"
                      name="description"
                      rows={15}
                      className="shadow-sm focus:ring-yellow-500 focus:border-yellow-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
                      value={description}
                      onChange={(event) => setDescription(event.target.value)}
                    />
                  </div>
                </div>
              </>
            )}
            {type === "News" && (
              <>
                <div>
                  <label
                    htmlFor="article_title"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Article Title
                  </label>
                  <input
                    type="text"
                    required
                    name="article_title"
                    id="article_title"
                    className="mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    value={title1}
                    onChange={(event) => setTitle1(event.target.value)}
                  />
                </div>

                <div>
                  <label
                    htmlFor="image_link"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Image Link
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                      http://
                    </span>
                    <input
                      type="url"
                      name="image_link"
                      id="image_link"
                      className="focus:ring-yellow-500 focus:border-yellow-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                      placeholder="www.example.com/picture.png"
                      value={image1}
                      onChange={(event) => setImage1(event.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="portrait_image_link"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Portrait Image Link
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                      http://
                    </span>
                    <input
                      type="url"
                      name="portrait_image_link"
                      id="portrait_image_link"
                      className="focus:ring-yellow-500 focus:border-yellow-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                      placeholder="www.example.com/picture.png"
                      value={portraitImage1}
                      onChange={(event) =>
                        setPortraitImage1(event.target.value)
                      }
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="video_link"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Video Link
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                      http://
                    </span>
                    <input
                      type="url"
                      name="video_link"
                      id="video_link"
                      className="focus:ring-yellow-500 focus:border-yellow-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                      placeholder="www.youtube.com/watch?v=example"
                      value={video1}
                      onChange={(event) => setVideo1(event.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="about"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Brief Description
                    <span className="text-gray-400 font-normal">
                      {" (" + miniDescription1.length + "/200 characters)"}
                    </span>
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="miniDescription"
                      name="miniDescription"
                      rows={2}
                      className="shadow-sm focus:ring-yellow-500 focus:border-yellow-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
                      value={miniDescription1}
                      onChange={(event) => {
                        setMiniDescription1(
                          event.target.value.substring(0, 200)
                        );
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Article Content
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="description"
                      name="description"
                      rows={15}
                      className="shadow-sm focus:ring-yellow-500 focus:border-yellow-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
                      value={description1}
                      onChange={(event) =>
                        setDescription1(event.target.value)
                      }
                    />
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            {error && (
              <div
                class="bg-red-100 text-left border border-red-400 text-red-700 mb-3 px-4 py-3 rounded relative"
                role="alert"
              >
                <span class="block sm:inline">{error}</span>
                <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
                  <svg
                    class="fill-current h-6 w-6 text-red-500"
                    role="button"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <title>Close</title>
                    <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                  </svg>
                </span>
              </div>
            )}

            {success && (
              <div
                class="bg-green-100 text-left border border-green-400 text-green-700 mb-3 px-4 py-3 rounded relative"
                role="alert"
              >
                <span class="block sm:inline">{success}</span>
              </div>
            )}

            <button
              onClick={() => setDialogOpen(true)}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
            >
              Change Post
            </button>

            <p className="mt-2 text-sm text-gray-500">
              {"Date: " +
                (today.getMonth() + 1) +
                "/" +
                today.getDate() +
                "/" +
                today.getFullYear()}
            </p>
          </div>
        </div>
      </div>
      <AlertDialog
        isOpen={dialogOpen}
        setOpen={setDialogOpen}
        title="Edit Post"
        message="Are you sure you want to edit this post? It will immediately show up on the app."
        actionName="Post"
        action={createPost}
      />
    </>
  );
}
