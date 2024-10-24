import { useState } from "react";
import { HiChevronUpDown } from "react-icons/hi2"
import clx from "classnames";
import { IoRemove } from "react-icons/io5";
import { useCloseOnClickOutside } from "./use-close-on-click-outside";
import { Currency, CurrencyValue } from "../../../../types";

// Button
export const CustomButton = ({ children, className, ...props   }: React.ComponentProps<"button">) => (
    <button type="button" className={clx(classNames.operatorButton, className)} {...props}>
        {children}
    </button>
);

// Custom Select

// I should have probably used native html select, 
// but I struggled to style it as in the screenshot of the requirements document.
export const CustomSelect: React.FC<{ 
    label: string, 
    value: string, 
    onChange: (value: string) => void, 
    options: { value: string, label: string }[], 
}> = ({ label, value, options, onChange  }) => {
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
                <label className={classNames.dropdownLabel}>{label}</label>
                <button type="button" className={classNames.dropdownButton} onClick={toggleDropdown}>
                    <p>{options.find(option => option.value === value)?.label ?? "Select"}</p>
                    <HiChevronUpDown />
                </button>
            </div>

            {isOpen && (
                <ul className={classNames.dropdownUL}>
                    {options.map((option) => (
                        <li className={classNames.dropdownLI} key={option.value} onClick={() => selectOption(option.value)}>{option.label}</li>
                    ))}
                </ul>
            )}
        </div>
    )
}

// Input
export const CustomInput: React.FC<React.ComponentProps<"input"> & { label: string }> = ({ label,        className, ...props }) => {
    return <div>
        <label className={classNames.dropdownLabel}>{label}</label>
        <input name="field" type="text" className={clx(classNames.input, className)} required {...props} />
    </div>
}

export const CurrencyInput: React.FC<{ value?: CurrencyValue; onChange: (value: CurrencyValue) => void }> = ({ value = { amount: 0, currency: "USD" }, onChange }) => { 
    return <div className="flex flex-row items-center gap-2">
        <CustomSelect 
            label="Currency" 
            value={value.currency} 
            options={[{ value: "USD", label: "USD" }, { value: "EUR", label: "EUR" }]} 
            onChange={currency => onChange({ ...value, currency: currency as Currency })} 
        />
        <CustomInput 
            label="Value" 
            className="bg-white" 
            type="number" 
            value={value.amount}
            onChange={e => onChange({ ...value, amount: Number(e.target.value) })} 
        />
    </div>
}

// Delete Button
export const DeleteButton: React.FC<React.ComponentProps<"button">> = ({ className, ...props }) => (
    <button type="button" className={clx(classNames.operatorButton, classNames.deleteButton, className,)} {...props}>
        <IoRemove color="white" />
    </button>
)

const classNames = {
    operatorButton: "px-1 flex flex-row items-center gap-1 bg-[#ccd1e6] rounded p-1 cursor-pointer focus:outline-none min-w-[60px] sm:min-w-[40px]",
    deleteButton: "flex items-center justify-center mt-6 h-8 min-w-[24px] bg-red-700",

    dropdownUL: "absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded bg-white py-1 text-base shadow-lg focus:outline-none",
    dropdownLI: "relative cursor-pointer select-none py-2 pl-3 pr-9 text-gray-900 hover:bg-gray-100",
    dropdownLabel: "block text-sm font-medium leading-6 text-gray-900", 
    dropdownButton: "min-w-[160px] sm:min-w-[180px] flex flex-row items-center justify-between cursor-default rounded bg-white py-1.5 px-2 text-left text-gray-900 focus:outline-none",

    input: "border border-solid border-[#fefefe] bg-[#ccd1e6] rounded p-1 focus:outline-none focus:border-[#fefefe] dark:text-slate-900",
    inputLabel: "block text-sm font-medium leading-6 text-gray-900",
};