import { getDateRangesForDropdown } from "@/utills/getDateRange";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const EventFiltering = ({ length }: { length: number }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDateRange, setSelectedDateRange] = useState("");
  const [singleDate, setSingleDate] = useState("");
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const options = getDateRangesForDropdown();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setSearchTerm(value);
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value.toString());
    router.push(`${pathName}?${params.toString()}`, { scroll: false });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedDateRange(value);
    if (!value) {
      router.push(`${pathName}`);
      return;
    }
    if (value) {
      const dateValue = JSON.parse(value);
      const startDate = dateValue.startDate;
      const endDate = dateValue.endDate;
      const params = new URLSearchParams(searchParams.toString());
      params.set("startDate", startDate.toString());
      params.set("endDate", endDate.toString());
      router.push(`${pathName}?${params.toString()}`, { scroll: false });
    }
  };

  const handleSingleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSingleDate(value);
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("date", value);
      router.push(`${pathName}?${params.toString()}`, { scroll: false });
    } else {
      params.delete("date");
    }
  };

  return (
    <section className="flex flex-col md:flex-row items-center justify-between mt-4 md:mt-10 space-y-2">
      <div className="flex md:hidden justify-between items-center w-full">
        <h1 className="text-xl text-purple-700 font-semibold">
          Total meals: {length ? length : 0}
        </h1>
        <div>
          <button
            onClick={() => {
              router.push(`${pathName}`);
              setSearchTerm("");
              setSelectedDateRange("");
              setSingleDate("");
            }}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition cursor-pointer"
          >
            Reset
          </button>
        </div>
      </div>

      <h1 className="text-xl text-purple-700 font-semibold hidden md:block">
        Total meals: {length ? length : 0}
      </h1>

      <div className="flex flex-col md:flex-row items-center gap-4">
        <input
          type="text"
          name="searchTerm"
          value={searchTerm}
          onChange={handleChange}
          placeholder="Search meals..."
          className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
        <input
          type="date"
          value={singleDate}
          onChange={handleSingleDateChange}
          className="border px-4 py-2 rounded outline-none"
        />
        <select
          onChange={handleDateChange}
          value={selectedDateRange}
          className="border px-4 py-2 rounded outline-none"
        >
          <option value="">Filter by Date Range</option>
          {options.map((opt, idx) => (
            <option key={idx} value={JSON.stringify(opt.value)}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="hidden md:flex">
        <button
          onClick={() => {
            router.push(`${pathName}`);
            setSearchTerm("");
            setSelectedDateRange("");
            setSingleDate("");
          }}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition cursor-pointer"
        >
          Reset
        </button>
      </div>
    </section>
  );
};

export default EventFiltering;
