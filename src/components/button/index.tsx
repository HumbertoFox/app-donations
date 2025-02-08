import { TypeButtonProps } from "@/interfaces/interfaces";

export default function ButtonComponent({
    className = '',
    type = 'button',
    disabled = false,
    children = 'Button',
    ...props
}: TypeButtonProps) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-1 text-xs tracking-widest text-white transition duration-150 ease-in-out hover:bg-blue-500 focus:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2 active:bg-blue-700 ${disabled &&
                'opacity-25'} ` + className
            }
            type={type}
            disabled={disabled}
        >
            {children}
        </button>
    );
}