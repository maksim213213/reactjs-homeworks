import { useState } from "react";
import type { ReactNode } from "react";

const Tooltip = ({ children, text }: { children: ReactNode; text: string }) => {
  const [visible, setVisible] = useState(false);

  return (
    <span
      className="relative inline-block cursor-pointer"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}

      {visible && (
        <span className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-black px-3 py-1 text-sm text-white shadow-lg">
          {text}
        </span>
      )}
    </span>
  );
};

export default Tooltip;