import { useState } from "react";
import { HiChevronUpDown } from "react-icons/hi2";
import { Combinator } from "../../../../types";
import { SelectOperatorButton } from "./form-controls";
import { useCloseOnClickOutside } from "./use-close-on-click-outside";
export const SelectCombinator = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<Combinator>("And");

    const ref = useCloseOnClickOutside({ onClose: () => setIsOpen(false) });
  
    const toggleDropdown = () => setIsOpen(!isOpen);
  
    const selectOption = (option: Combinator) => {
      setSelectedOption(option);
      setIsOpen(false);
    };
  
    return (
      <div className="relative" ref={ref}>
        <SelectOperatorButton
          type="button"
          onClick={toggleDropdown}
          className="border-[#fefefe] hover:border-[#fefefe] border border-solid"
        >
          <p>{selectedOption}</p>
          <HiChevronUpDown />
        </SelectOperatorButton>

        {isOpen && (
          <div className={classNames.dropdown}>
            <button
              className={classNames.option}
              onClick={() => selectOption("And")}
            >
              And
            </button>
            <button
              className={classNames.option}
              onClick={() => selectOption("Or")}
            >
              Or
            </button>
          </div>
        )}
      </div>
    );
}

const classNames = {
    dropdown: "absolute z-[100] top-full left-0 mt-1 w-full bg-white rounded shadow-lg",
    option: "w-full text-left px-2 py-1 bg-gray-200 hover:bg-gray-200 mb-1",
}