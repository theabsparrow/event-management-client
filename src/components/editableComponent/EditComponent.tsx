"use client";

import { Dispatch, SetStateAction } from "react";

type TEditingComponent<T> = {
  setValue: Dispatch<SetStateAction<T>>;
  isEditing: boolean;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
  value: T;
  handleSubmit: (field: string) => Promise<void>;
  field: string;
  saveClass?: string;
  cancelClass?: string;
};

const EditComponent = <T,>({
  setValue,
  isEditing,
  setIsEditing,
  value,
  handleSubmit,
  field,
  saveClass = "ml-4 text-blue-500 cursor-pointer",
  cancelClass = "ml-4 text-purple-500 cursor-pointer",
}: TEditingComponent<T>) => {
  return (
    <div>
      {isEditing ? (
        <div className="mt-2">
          <button
            onClick={() => {
              handleSubmit(field);
            }}
            className={saveClass}
          >
            Save
          </button>
          <button
            onClick={() => {
              setIsEditing(false);
              setValue(value);
            }}
            className={cancelClass}
          >
            Cancel
          </button>
        </div>
      ) : (
        <>
          <button
            onClick={() => {
              setIsEditing(true);
              setValue(value);
            }}
            className=" text-blue-500 cursor-pointer"
          >
            Edit
          </button>
        </>
      )}
    </div>
  );
};

export default EditComponent;
