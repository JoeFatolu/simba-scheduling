import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Dialog = ({ children }) => {
  const [isBrowser, setIsBrowser] = React.useState(false);

  const elRef = useRef(null);
  if (!elRef.current) {
    if (isBrowser) {
      elRef.current = document.createElement("div");
    }
  }
  useEffect(() => {
    setIsBrowser(true);
  }, []);

  useEffect(() => {
    if (isBrowser) {
      const modalRoot = document.getElementById("modal");
      console.log(modalRoot, "modale");
      modalRoot.appendChild(elRef.current);
      return () => modalRoot.removeChild(elRef.current);
    }
  }, [isBrowser]);

  if (isBrowser) {
    return createPortal(<div data-reach-dialog-overlay>{children}</div>, elRef.current);
  }

  return null;
};

const Modal = ({ isOpen, children, onClose = () => {} }) => {
  return isOpen ? (
    <Dialog onClick={onClose}>
      <div data-reach-dialog-content onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </Dialog>
  ) : null;
};
export default Modal;
