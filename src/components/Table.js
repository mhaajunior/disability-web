const Table = ({
  titles,
  contents,
  perPage = 10,
  head,
  totalRows,
  checkFn,
}) => {
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <div className="font-bold text-2xl">{head}</div>
        <div>
          แสดงข้อมูล {perPage} แถว จากทั้งหมด {totalRows - 1} แถว
        </div>
      </div>
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
          </thead>
          <tbody>
            {contents.map((row, index) => {
              return (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  {row.map((content, index) => {
                    return (
                      <td key={index} className="px-6 py-3">
                        {checkFn ? checkFn(content) : content}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
