import * as React from "react";

export default function ButtonGroup({
  options,
  value,
  onChange,
  labelMap,
  disabled,
}) {
  const leftButtonClasses = "rounded-l-md";
  const middleButtonClasses = "-ml-px";
  const rightButtonClasses = "-ml-px rounded-r-md";
  const baseClasses =
    "inline-flex items-center px-4 py-2 border text-sm leading-5 font-medium focus:outline-none focus:border-indigo-300 dark:focus:border-indigo-600 focus:shadow-outline-indigo transition ease-in-out duration-150";
  const activeClasses = "border-indigo-600 bg-indigo-600 text-white";
  const inactiveClasses =
    "border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 hover:text-gray-500 dark:hover:text-gray-100 active:bg-gray-100 active:text-gray-700";

  return (
    <span className="inline-flex shadow-sm rounded-md">
      {options.map((option, index) => (
        <button
          type="button"
          className={
            baseClasses +
            " " +
            (index === 0 ? leftButtonClasses : " ") +
            (index !== 0 && index !== options.length - 1
              ? middleButtonClasses
              : " ") +
            (index === options.length - 1 ? rightButtonClasses : " ") +
            " " +
            (option === value ? activeClasses : " ") +
            (option !== value ? inactiveClasses : " ")
          }
          disabled={disabled}
          onClick={() => onChange(option)}
          key={option}
        >
          {labelMap ? labelMap[option] : option}
        </button>
      ))}
    </span>
  );
}
