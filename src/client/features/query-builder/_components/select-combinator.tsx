import { useState } from "react";
import { HiChevronUpDown } from "react-icons/hi2";
import { CombinatorOperation } from "../../../../types";
import { CustomButton } from "./form-controls";
import { useCloseOnClickOutside } from "./use-close-on-click-outside";
import { useInsertUpdate } from "../_providers/use-insert-update";
// import { useInsertUpdate } from "../_providers/use-insert-update";

export const SelectCombinator: React.FC<{ id: string; value: CombinatorOperation; }> = ({ value, id }) => {
    const [isOpen, setIsOpen] = useState(false);

    const { handleChangeCombinator } = useInsertUpdate();

    const ref = useCloseOnClickOutside({ onClose: () => setIsOpen(false) });

    const toggleDropdown = () => setIsOpen(!isOpen);

    const selectOption = (value: CombinatorOperation) => () => {
      handleChangeCombinator({ groupId: id, value });
      setIsOpen(false);
    };

  
    return (
      <div className="relative" ref={ref}>
        <CustomButton
          type="button"
          onClick={toggleDropdown}
          className="border-[#fefefe] hover:border-[#fefefe] border border-solid"
        >
          <p>{value}</p>
          <HiChevronUpDown />
        </CustomButton>

        {isOpen && (
          <div className={classNames.dropdown}>
            <button
              className={classNames.option}
              onClick={selectOption("AND")}
            >
              AND
            </button>
            <button
              className={classNames.option}
              onClick={selectOption("OR")}
            >
              OR
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