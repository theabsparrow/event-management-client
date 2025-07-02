/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { deleteEvent } from "@/services/eventService.ts";
import { usePathname, useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";

type TdeleteModalProps = {
  setShowModal: Dispatch<SetStateAction<boolean>>;
  id: string;
};

const DeleteModal = ({ setShowModal, id }: TdeleteModalProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleDelete = async () => {
    const match = pathname.match(/^\/myEvents\/([a-zA-Z0-9]+)/);
    try {
      const result = await deleteEvent(id);
      if (result?.success) {
        toast.success(result?.message, { duration: 3000 });
        if (match) {
          router.push("/myEvents");
        }
        setShowModal(false);
      } else {
        toast.error(result?.message, { duration: 3000 });
      }
    } catch (error: any) {
      console.log(error);
    }
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-md">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Are you sure you want to delete?
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          This action cannot be undone.
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={() => setShowModal(false)}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
