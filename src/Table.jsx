import { useState } from "react";
import { FaSort } from "react-icons/fa";

function Table({ head, body, searchable }) {
  const [sorting, setSorting] = useState({});
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Filtreleme ve sıralama
  const filteredData = body
    .filter(items =>
      items.some(item =>
        item.toString().toLocaleLowerCase('tr').includes(search.toLocaleLowerCase('tr'))
      )
    )
    .sort((a, b) => {
      if (sorting?.orderBy === 'asc') {
        return a[sorting.key].localeCompare(b[sorting.key]);
      }
      if (sorting?.orderBy === 'desc') {
        return b[sorting.key].localeCompare(a[sorting.key]);
      }
      return 0;
    });

  // Sayfalama
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const changePage = (page) => {
    if (page >= 1 && page <= totalPages) {
     setCurrentPage(page);
    }
  };

  
  return (
    <>
      {searchable && (
        <div className="container mt-4">
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1); // Arama olunca ilk sayfaya dön
            }}
            className="form-control"
            type="text"
            placeholder="Tabloda Ara"
          />
        </div>
      )}

      <div className="table-responsive mt-4">
        <table className="table table-bordered table-hover table-striped align-middle">
          <thead className="table-dark">
            <tr>
              {head.map((h, key) => (
                <th key={key} style={{ whiteSpace: "nowrap", minWidth: "150px" }}>
                  <div className="d-flex justify-content-between align-items-center">
                    <span>{h.name}</span>
                    {h.sortable && (
                      <button
                        className="btn btn-sm btn-outline-light ms-2"
                        onClick={() => {
                          if (sorting?.key === key) {
                            setSorting({
                              key,
                              orderBy: sorting.orderBy === 'asc' ? 'desc' : 'asc',
                            });
                          } else {
                            setSorting({ key, orderBy: 'asc' });
                          }
                        }}
                      >
                        <FaSort size={14} />
                      </button>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((items, rowKey) => (
              <tr key={rowKey}>
                {items.map((item, colKey) => (
                  <td key={colKey} className="text-break">
                    {item}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

       {/* Sayfa numaraları */}
          <div className="d-flex justify-content-end gap-2 mt-3 flex-wrap">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                className={`btn btn-sm ${
                  currentPage === i + 1 ? 'btn-secondary' : 'btn-outline-secondary'
                }`}
                onClick={() => changePage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        
      </div>
    </>
  );
}

export default Table;
