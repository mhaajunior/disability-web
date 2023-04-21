import { useEffect, useState } from "react";

const Table = ({ data, head }) => {
  const [titles, setTitles] = useState([]);
  const [contentRows, setContentRows] = useState([]);

  useEffect(() => {
    const arr = [];
    for (let i = 0; i < data.length; i++) {
      if (i === 0) {
        setTitles(data[i].split(","));
      } else {
        arr.push(data[i].split(","));
      }
    }
    setContentRows(arr);
  }, [data]);

  const isNull = (data) => {
    const content = JSON.parse(data);
    if (content && content !== " ") {
      return content;
    } else {
      return "-";
    }
  };

  return (
    <>
      <div className="mb-4 font-bold text-2xl">{head}</div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {titles.map((title) => {
                return (
                  <th key={title} scope="col" className="px-6 py-3">
                    {title}
                  </th>
                );
              })}
            </tr>
            {contentRows.map((row, index) => {
              return (
                <tr key={index}>
                  {row.map((content, index) => {
                    return (
                      <td key={index} className="px-6 py-3">
                        {isNull(content)}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </thead>
        </table>
      </div>
    </>
  );
};

export default Table;
