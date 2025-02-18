import { Dialog } from "@headlessui/react";
import { useEffect, useState } from "react";

interface Props {
  open: boolean;
  action: Function | undefined;
  onClose: Function | undefined;
  title: string;
  actionTitle: string;
  message: string;
}

const Modal = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = (val: boolean) => {
    setIsOpen(val);
    if (props.onClose && !val) props.onClose();
  };

  const _action = () => {
    toggle(false);
    if (props.action) props.action();
  };

  useEffect(() => {
    if (props.open) setIsOpen(true);
  }, [props]);

  return (
    <>
      {/* <button
        onClick={() => toggle(true)}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Open Modal
      </button> */}

      <Dialog
        open={isOpen}
        onClose={() => toggle(false)}
        className="fixed inset-0 z-50 w-full max-w-lg px-4 mx-auto flex items-center justify-center"
      >
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
          <Dialog.Title className="text-lg font-semibold">
            {props.title}
          </Dialog.Title>
          <Dialog.Description className="text-gray-500">
            {props.message}
          </Dialog.Description>
          <div className="mt-4 flex justify-end gap-2">
            <button
              onClick={() => toggle(false)}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>
            <button
              onClick={() => _action()}
              className="px-4 py-2 bg-red-500 text-white rounded"
            >
              {props.actionTitle}
            </button>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default Modal;
