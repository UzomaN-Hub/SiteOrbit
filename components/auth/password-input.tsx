"use client";

import { forwardRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import { Input } from "@/components/ui/input";

type PasswordInputProps = Omit<React.ComponentProps<typeof Input>, "type">;

/** Password field with a ghost show/hide button inside its right edge. */
const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  function PasswordInput({ className, ...props }, ref) {
    const [shown, setShown] = useState(false);

    return (
      <div className="relative">
        <Input
          ref={ref}
          type={shown ? "text" : "password"}
          className={`pr-11 ${className ?? ""}`}
          {...props}
        />
        <button
          type="button"
          onClick={() => setShown((value) => !value)}
          aria-label={shown ? "Hide password" : "Show password"}
          aria-pressed={shown}
          className="absolute top-1/2 right-1.5 inline-flex size-8 -translate-y-1/2 items-center justify-center rounded-sm text-text-muted transition-colors duration-(--dur-fast) hover:bg-surface-2 hover:text-text"
        >
          {shown ? (
            <EyeOff className="size-4" strokeWidth={1.5} />
          ) : (
            <Eye className="size-4" strokeWidth={1.5} />
          )}
        </button>
      </div>
    );
  }
);

export default PasswordInput;
