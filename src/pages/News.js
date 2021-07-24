import React, { Component } from "react";
import Page from "./Page";
import InfoModal from "../components/InfoModal";
// import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { ArchiveIcon, TrashIcon, PencilIcon } from "@heroicons/react/outline";
import { CircularProgress } from "@material-ui/core";
import { firestore } from "../firebase";
import "firebase/firestore";
import Edit from "../components/Edit";

export default class News extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      stories: [],
      currStory: null,
      modalOpen: false,
      editStory: null,
      showEdit: false,
    };
  }

  getStories() {
    this.setState({
      loading: true,
    });
    firestore.collection("news").onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        let story = doc.data();
        story["id"] = doc.id;
        story["date"] = story.date.toDate();
        story["type"] = "news";
        items.push(story);
      });
      this.setState({
        loading: false,
        stories: items,
      });
    });
  }

  deleteStory(id) {
    firestore
      .collection("news")
      .doc(id)
      .delete()
      .then(() => {
        console.log("Delete successful");
      });
  }

  setStoryStatus(id, status) {
    firestore.collection("news").doc(id).update({
      status: status,
    });
  }

  componentDidMount() {
    this.getStories();
  }

  openStoryModal(id) {
    const story = this.state.stories.find((cur) => cur.id === id);
    this.setState({ currStory: story });
    this.setState({ modalOpen: true });
  }
  editNews(id) {
    const story = this.state.stories.find((cur) => cur.id === id);
    this.setState({ editStory: story });
    this.setState({ showEdit: true });
  }

  render() {
    if (this.state.loading) {
      return (
        <Page name="News">
          <CircularProgress />
        </Page>
      );
    }
    if (!this.state.showEdit) {
      return (
        <>
          <Page name="News">
            {/* <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <a
                href="/"
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Previous
              </a>
              <a
                href="/"
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Next
              </a>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">1</span> to{" "}
                  <span className="font-medium">10</span> of{" "}
                  <span className="font-medium">97</span> results
                </p>
              </div>
              <div>
                <nav
                  className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                  aria-label="Pagination"
                >
                  <a
                    href="/"
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span className="sr-only">Previous</span>
                    <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                  </a>
                  <a
                    href="/"
                    aria-current="page"
                    className="z-10 bg-yellow-50 border-yellow-500 text-yellow-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                  >
                    1
                  </a>
                  <a
                    href="/"
                    className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                  >
                    2
                  </a>
                  <a
                    href="/"
                    className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium"
                  >
                    3
                  </a>
                  <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                    ...
                  </span>
                  <a
                    href="/"
                    className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium"
                  >
                    8
                  </a>
                  <a
                    href="/"
                    className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                  >
                    9
                  </a>
                  <a
                    href="/"
                    className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                  >
                    10
                  </a>
                  <a
                    href="/"
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span className="sr-only">Next</span>
                    <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                  </a>
                </nav>
              </div>
            </div>
          </div> */}
            <div className="flex flex-col">
              <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Story Title
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Story Description
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Status
                          </th>
                          <th scope="col" className="relative px-6 py-3">
                            <span className="sr-only">Edit</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {this.state.stories.map((story) => (
                          <tr key={story.id}>
                            <td className="px-6 py-5 whitespace-nowrap">
                              <div
                                className="flex items-center cursor-pointer"
                                onClick={() => this.openStoryModal(story.id)}
                              >
                                <div className="flex-shrink-0 h-10 w-10">
                                  <img
                                    className="h-10 w-10 rounded-full"
                                    src={story.image}
                                    alt=""
                                  />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">
                                    {story.title}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {story.miniDescription.length > 40
                                  ? story.miniDescription.substr(0, 40) + "..."
                                  : story.miniDescription}
                              </div>
                            </td>
                            {story.status === 0 && (
                              <td className="px-5 py-4 whitespace-nowrap">
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                  Archived
                                </span>
                              </td>
                            )}
                            {story.status === 1 && (
                              <td className="px-5 py-4 whitespace-nowrap">
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                  Active
                                </span>
                              </td>
                            )}
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button
                                className="focus:outline-none"
                                onClick={() => {
                                  this.editNews(story.id);
                                }}
                              >
                                <PencilIcon
                                  className="h-6 w-6 mr-4 text-gray-400"
                                  aria-hidden="true"
                                />
                              </button>
                              <button
                                className="focus:outline-none"
                                onClick={() => {
                                  this.setStoryStatus(
                                    story.id,
                                    1 - story.status
                                  );
                                }}
                              >
                                <ArchiveIcon
                                  className="h-6 w-6 mr-4 text-gray-400"
                                  aria-hidden="true"
                                />
                              </button>
                              <button
                                className="focus:outline-none"
                                onClick={() => {
                                  this.deleteStory(story.id);
                                }}
                              >
                                <TrashIcon
                                  className="h-6 w-6 text-gray-400"
                                  aria-hidden="true"
                                />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </Page>
          <InfoModal
            isOpen={this.state.modalOpen}
            setOpen={(isOpen) => this.setState({ modalOpen: isOpen })}
            title={this.state.currStory?.title}
          >
            <p className="text-gray-500">
              {"By " + this.state.currStory?.author},{" "}
              {this.state.currStory?.date?.getMonth() +
                1 +
                "/" +
                this.state.currStory?.date?.getDate() +
                "/" +
                this.state.currStory?.date?.getFullYear()}
            </p>
            <p className="text-black mt-2 mb-2">
              {this.state.currStory?.description}
            </p>
            <img src={this.state.currStory?.image} alt="Story" />
          </InfoModal>
        </>
      );
    } else {
      return (
        <>
          <Page name="News">
            <Edit
              curr={this.state.editStory}
              onClose={() => this.setState({ showEdit: false })}
            />
          </Page>
        </>
      );
    }
  }
}
