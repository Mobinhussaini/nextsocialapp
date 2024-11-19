import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

interface FormErrorProps {
  message?: string;
  size?: string;
}

export const FormError = ({ message, size = "sm" }: FormErrorProps) => {
  return (
    <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive">
      <ExclamationTriangleIcon
        className={`${size === "xs" ? "h-8 w-8" : "h-5 w-5"} `}
      />
      <p className={`${size ==='xs' ? "text-xs" : "text-base"}`}>{message}</p>
    </div>
  );
};
