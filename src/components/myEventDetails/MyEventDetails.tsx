"use client";

import { TEventInfos } from "@/types/event.type";
// import { formatTime12Hour } from "@/utills/formatTime";
import Image from "next/image";
import { useState } from "react";

const MyEventDetails = ({ eventInfo }: { eventInfo: TEventInfos }) => {
  //   const {
  //     title,
  //     name,
  //     image,
  //     date,
  //     time,
  //     location,
  //     description,
  //     _id,
  //     attendeeCount,
  //   } = eventInfo;
  //   const formatedTime = formatTime12Hour(time);

  const [editableField, setEditableField] = useState<string | null>(null);
  const [formData, setFormData] = useState(eventInfo);

  const handleChange = (field: keyof TEventInfos, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = (field: keyof TEventInfos) => {
    console.log("Saving", field, formData[field]);
    setEditableField(null);
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, image: imageUrl }));
    }
  };
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="relative w-full h-60 rounded-lg overflow-hidden shadow-md mb-6">
        {formData.image && (
          <Image
            src={formData.image}
            alt={formData.title}
            fill
            className="object-cover"
          />
        )}
        <label className="absolute bottom-2 right-2 bg-black/50 hover:bg-black/70 p-2 rounded-full cursor-pointer">
          📷
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </label>
      </div>

      {/* Info Fields */}
      <div className="space-y-4">
        {(
          ["title", "name", "date", "time", "location", "description"] as const
        ).map((field) => (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 capitalize">
              {field}
            </label>

            {editableField === field ? (
              <div className="flex gap-2 mt-1">
                <input
                  type={
                    field === "date"
                      ? "date"
                      : field === "time"
                      ? "time"
                      : "text"
                  }
                  value={formData[field]}
                  onChange={(e) => handleChange(field, e.target.value)}
                  className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
                <button
                  onClick={() => handleSave(field)}
                  className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Save
                </button>
              </div>
            ) : (
              <div className="flex justify-between items-center mt-1">
                <p className="text-gray-800 dark:text-gray-200">
                  {formData[field] || "—"}
                </p>
                <button
                  onClick={() => setEditableField(field)}
                  className="text-sm text-purple-600 hover:underline"
                >
                  ✏️ Edit
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Attendees */}
      <div className="mt-6 text-sm text-gray-600 dark:text-gray-400">
        👥 <strong>{formData.attendeeCount}</strong> people attending
      </div>
    </div>
  );
};

export default MyEventDetails;
