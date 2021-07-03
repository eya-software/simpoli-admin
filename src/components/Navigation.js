import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import logo from "../assets/img/logo.png";

const navigation = ["Dashboard", "Policies", "News", "Create"];
const routes = {
  Dashboard: "/",
  Policies: "/policies",
  News: "/news",
  Create: "/create",
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navigation(props) {
  const { currentUser, loading, logout, profilePic } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    await logout();
    history.push("/login");
  }
  console.log(currentUser);

  return (
    <div className="sticky top-0">
      <Disclosure as="nav" className="bg-white shadow position:sticky">
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center h-full">
                  <div className="flex-shrink-0">
                    <img className="h-9 w-9" src={logo} alt="Simpoli Logo" />
                  </div>
                  <div className="hidden md:block h-full">
                    <div className="ml-10 flex items-baseline space-x-4 h-full">
                      {navigation.map((item) =>
                        props.active === item ? (
                          <Fragment key={item}>
                            <button
                              onClick={() => history.push(routes[item])}
                              className="h-full inline-flex items-center px-3 py-2 border-b-2 border-transparent text-base font-medium leading-6 text-black border-yellow-600 dark:text-dark-high-emphasis transition"
                            >
                              {item}
                            </button>
                          </Fragment>
                        ) : (
                          <button
                            key={item}
                            onClick={() => history.push(routes[item])}
                            className="h-full inline-flex items-center px-3 py-2 border-b-2 border-transparent text-base font-medium leading-6 text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-dark-high-emphasis focus:outline-none focus:text-gray-700 focus:border-gray-300 transition"
                          >
                            {item}
                          </button>
                        )
                      )}
                    </div>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="ml-4 flex items-center md:ml-6">
                    {/* Profile dropdown */}
                    <Menu as="div" className="ml-3 relative">
                      {({ open }) => (
                        <>
                          {!loading && <div>
                            <Menu.Button className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none">
                              <span className="sr-only">Open user menu</span>
                              <img
                                className="h-9 w-9 rounded-full"
                                src={
                                  profilePic ??
                                  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                }
                                alt=""
                              />
                            </Menu.Button>
                          </div>}
                          <Transition
                            show={open}
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items
                              static
                              className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                            >
                              <Menu.Item key="Your Profile">
                                {({ active }) => (
                                  <a
                                    href="/"
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm text-gray-700"
                                    )}
                                  >
                                    Your Profile
                                  </a>
                                )}
                              </Menu.Item>
                              <Menu.Item key="Sign Out">
                                {({ active }) => (
                                  <button
                                    onClick={handleLogout}
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm text-left text-gray-700 w-full"
                                    )}
                                  >
                                    Sign Out
                                  </button>
                                )}
                              </Menu.Item>
                            </Menu.Items>
                          </Transition>
                        </>
                      )}
                    </Menu>
                  </div>
                </div>
                <div className="-mr-2 flex md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-200 focus:outline-none transition">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {navigation.map((item) =>
                  item === props.active ? (
                    <Fragment key={item}>
                      {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                      <button
                        onclick={() => history.push(routes[item])}
                        className="w-full text-left block pl-3 pr-4 py-2 border-l-4 border-yellow-500 text-base font-medium text-yellow-700 dark:text-yellow-100 bg-yellow-50 dark:bg-yellow-800 focus:outline-none focus:text-yellow-800 focus:bg-yellow-100 focus:border-yellow-700 transition"
                      >
                        {item}
                      </button>
                    </Fragment>
                  ) : (
                    <button
                      key={item}
                      onClick={() => history.push(routes[item])}
                      className="w-full text-left block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 dark:text-dark-med-emphasis hover:text-gray-800 dark:hover:text-dark-high-emphasis hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-500 focus:outline-none focus:text-gray-800 focus:bg-gray-50 dark:focus:bg-gray-700 focus:border-gray-300 transition"
                    >
                      {item}
                    </button>
                  )
                )}
              </div>
              <div className="pt-4 pb-3 border-t border-gray-200">
                <div className="flex items-center px-5">
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium leading-none text-gray-800">
                      First Last
                    </div>
                    <div className="text-sm font-medium leading-none text-gray-400">
                      {currentUser.email}
                    </div>
                  </div>
                </div>
                <div className="mt-3 px-2 space-y-1">
                  <a
                    key="Your Profile"
                    href="/"
                    className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 dark:text-dark-med-emphasis hover:text-gray-800 dark:hover:text-dark-high-emphasis hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-500 focus:outline-none focus:text-gray-800 focus:bg-gray-50 dark:focus:bg-gray-700 focus:border-gray-300 transition"
                  >
                    Your Profile
                  </a>
                  <button
                    onClick={logout}
                    key="Sign Out"
                    href="/"
                    className="w-full text-left block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 dark:text-dark-med-emphasis hover:text-gray-800 dark:hover:text-dark-high-emphasis hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-500 focus:outline-none focus:text-gray-800 focus:bg-gray-50 dark:focus:bg-gray-700 focus:border-gray-300 transition"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
}
