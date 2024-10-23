import { useState } from "react";
import { HiChevronUpDown } from "react-icons/hi2";
import { CombinatorOperation } from "../../../../types";
import { CustomButton } from "./form-controls";

export const CombinatorSelector = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<CombinatorOperation>("AND");
  
    const toggleDropdown = () => setIsOpen(!isOpen);
  
    const selectOption = (option: CombinatorOperation) => {
      setSelectedOption(option);
      setIsOpen(false);
    };
  
    return (
      <div className="relative">
        <CustomButton
          type="button"
          onClick={toggleDropdown}
          className="border-[#fefefe] hover:border-[#fefefe] border border-solid"
        >
          <p>{selectedOption}</p>
          <HiChevronUpDown />
        </CustomButton>

        {isOpen && (
          <div className={classNames.dropdown}>
            <button
              className={classNames.option}
              onClick={() => selectOption("AND")}
            >
              And
            </button>
            <button
              className={classNames.option}
              onClick={() => selectOption("OR")}
            >
              Or
            </button>
          </div>
        )}
      </div>
    );
}

const classNames = {
    dropdown: "absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded shadow-lg",
    option: "w-full text-left px-2 py-1 hover:bg-gray-100",
}