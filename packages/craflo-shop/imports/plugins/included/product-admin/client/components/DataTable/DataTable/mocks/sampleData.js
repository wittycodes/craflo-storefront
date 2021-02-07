import data from "./orders.json";

export { data };

/**
 * Simulate a request for paginated data
 * @param {Object} args Arguments for simulated request and pagination
 * @param {Number} args.offset Unsigned int offset
 * @param {Number} args.limit Unsifned in size per page
 * @param {Number} args.simulatedDelay Time in miliseconds to simulate a delay for
 * @returns {Array} arg.array
 */
export async function getPaginatedData({
  orderIds = [],
  filters = {},
  offset = 0,
  limit = 10,
  simulatedDelay = 0,
  sortBy = "createdAt",
  sortOrder = "desc"
}) {
  await new Promise((resolve) => setTimeout(resolve, simulatedDelay));

  let preFilteredData = [...data];

  if (Array.isArray(orderIds) && orderIds.length) {
    preFilteredData = data.filter(({ id }) => orderIds.includes(id));
  }

  const sortedData = preFilteredData.sort((itemA, itemB) => {
    const va = itemA[sortBy];
    const vb = itemB[sortBy];

    if (sortOrder === "desc") {
      // Sort is reverse order
      if (va > vb) return -1;
      else if (va < vb) return 1;
      return 0;
    }
    // Sort in order
    if (va < vb) return -1;
    else if (va > vb) return 1;
    return 0;
  });

  const filterValues = Object.values(filters).filter((value) => value !== undefined);

  if (filterValues.length) {
    const nodes = sortedData.filter((item) => {
      const itemValues = Object.values(item);
      for (const filterValue of filterValues) {
        if (Array.isArray(filterValue) && filterValue.length > 0) {
          for (const multiSelectFilterValue of filterValue) {
            if (itemValues.find((valueToMatch) => valueToMatch === multiSelectFilterValue)) {
              return true;
            }
          }
        } else if (itemValues.find((valueToMatch) => valueToMatch === filterValue)) {
          return true;
        } else if (itemValues.join(" ").includes(filterValue)) {
          return true;
        }
      }
      return false;
    });

    return {
      data: {
        nodes: nodes.slice(offset, limit),
        totalCount: nodes.length
      }
    };
  }

  return {
    data: {
      nodes: sortedData.slice(offset, limit),
      totalCount: preFilteredData.length
    }
  };
}
