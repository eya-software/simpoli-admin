import React, { useState } from "react";
import AlertDialog from "../components/AlertDialog";
import ButtonGroup from "../components/ButtonGroup";
import Page from "./Page";
import { firestore as db } from "../firebase";

export default function Create() {
  const [articleType, setArticleType] = useState("Policy");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [video, setVideo] = useState("");
  const [description, setDescription] = useState("");

  const [title1, setTitle1] = useState("");
  const [image1, setImage1] = useState("");
  const [video1, setVideo1] = useState("");
  const [description1, setDescription1] = useState("");
  const today = new Date();

  async function createPost() {
    let collectionRef;
    if (articleType === "Policy") {
      collectionRef = db.collection("policies");
      try {
        await collectionRef.add({
          title: title,
          image: image,
          video: video,
          description: description,
          date: today,
          status: 1,
        });
        clearFields();
      } catch (e) {
        console.log(e);
      }
    } else {
      collectionRef = db.collection("news");
      try {
        await collectionRef.add({
          title: title1,
          image: image1,
          video: video1,
          description: description1,
          date: today,
          status: 1,
        });
        clearFields();
      } catch (e) {
        console.log(e);
      }
    }
  }

  function clearFields() {
    setTitle("");
    setImage("");
    setVideo("");
    setDescription("");
    setTitle1("");
    setImage1("");
    setVideo1("");
    setDescription1("");
  }

  return (
    <>
      <Page name="Create">
        <div>
          <div className="shadow sm:rounded-md sm:overflow-hidden">
            <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
              <div>
                <label
                  htmlFor="first_name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Article Type
                </label>
                <ButtonGroup
                  options={["Policy", "News"]}
                  value={articleType}
                  onChange={(newType) => setArticleType(newType)}
                />
              </div>

              {articleType === "Policy" && (
                <>
                  <div>
                    <label
                      htmlFor="first_name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Policy Title
                    </label>
                    <input
                      type="text"
                      name="article_title"
                      id="article_title"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
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
                        className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
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
                        className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
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
                      Policy Description
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="description"
                        name="description"
                        rows={15}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                      />
                    </div>
                  </div>
                </>
              )}
              {articleType === "News" && (
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
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
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
                        className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                        placeholder="www.example.com/picture.png"
                        value={image1}
                        onChange={(event) => setImage1(event.target.value)}
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
                        className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                        placeholder="www.youtube.com/watch?v=example"
                        value={video1}
                        onChange={(event) => setVideo1(event.target.value)}
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
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
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
              <button
                onClick={() => setDialogOpen(true)}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Post
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
      </Page>
      <AlertDialog
        isOpen={dialogOpen}
        setOpen={setDialogOpen}
        title="Create Post"
        message="Are you sure you want to create this post? It will immediately show up on the app."
        actionName="Post"
        action={createPost}
      />
    </>
  );
}
