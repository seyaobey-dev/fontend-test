import { useEffect, useRef } from "react";

/**
 * This hook closes the dropdown when clicking outside of it
 */
export const useCloseOnClickOutside = (props: { onClose: () => void }) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                props.onClose();
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [props]);


    return ref;
}