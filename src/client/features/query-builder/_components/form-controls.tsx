import { useState } from "react";
import { HiChevronUpDown } from "react-icons/hi2"
import clx from "classnames";
import { IoRemove } from "react-icons/io5";
import { useCloseOnClickOutside } from "./use-close-on-click-outside";

// Button
export const CustomButton = ({ children, className, ...props   }: React.ComponentProps<"button">) => (
    <button type="button" className={clx(buttonClassNames.selectOperatorButton, className)} {...props}>
        {children}
    </button>
);

// Custom Select
export const CustomSelect: React.FC<{ label: string, value: string, options: string[]; onChange: (value: string) => void }> = ({ label, value, options, onChange  }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const selectOption = (option: string) => {
        setIsOpen(false);
        onChange(option);
    }

    const ref = useCloseOnClickOutside({ onClose: () => setIsOpen(false) });

    return (
        <div className="relative" ref={ref}>
            <div>
                <label className={selectClassNames.label}>{label}</label>
                <button type="button" className={selectClassNames.dropdownButton} onClick={toggleDropdown}>
                    <p>{value ?? "Select"}</p>
                    <HiChevronUpDown />
                </button>
            </div>

            {isOpen && (
                <ul className={selectClassNames.ul}>
                    {options.map((option) => (
                        <li className={selectClassNames.li} key={option} onClick={() => selectOption(option)}>{option}</li>
                    ))}
                </ul>
            )}
        </div>
    )
}

// Input
export const CustomInput: React.FC<React.ComponentProps<"input"> & { label: string }> = ({ label,        className, ...props }) => {
    return <div>
        <label className={inputClassNames.label}>{label}</label>
        <input type="text" className={clx(inputClassNames.input, className)} {...props} />
    </div>
}

// Delete Button
export const DeleteButton: React.FC<React.ComponentProps<"button">> = ({ className, ...props }) => (
    <button type="button" className={clx(buttonClassNames.selectOperatorButton, buttonClassNames.deleteButton, className,)} {...props}>
        <IoRemove color="white" />
    </button>
)

const buttonClassNames = {
    selectOperatorButton: "px-1 flex flex-row items-center gap-1 bg-[#ccd1e6] rounded p-1 cursor-pointer focus:outline-none min-w-[60px] sm:min-w-[40px]",
    deleteButton: "flex items-center justify-center mt-6 h-8 min-w-[24px] bg-red-700",
}

const selectClassNames = {
    ul: "absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded bg-white py-1 text-base shadow-lg focus:outline-none",
    li: "relative cursor-pointer select-none py-2 pl-3 pr-9 text-gray-900 hover:bg-gray-100",
    label: "block text-sm font-medium leading-6 text-gray-900", 
    dropdownButton: "min-w-[160px] sm:min-w-[180px] flex flex-row items-center justify-between cursor-default rounded bg-white py-1.5 px-2 text-left text-gray-900 focus:outline-none",
}

const inputClassNames = {
    input: "border border-solid border-[#fefefe] bg-[#ccd1e6] rounded p-1 focus:outline-none focus:border-[#fefefe] dark:text-slate-900",
    label: "block text-sm font-medium leading-6 text-gray-900",
}