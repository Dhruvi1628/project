// Pagination Variables
let currentPage = 1;
const itemsPerPage = 5;
const apiUrl = "https://jsonplaceholder.typicode.com/todos"; // API endpoint

// Store all data in a global variable to avoid fetching repeatedly
let allData = [];

// Function to fetch data from the API
async function fetchData(page) {
  try {
    // Check if the data has already been fetched
    if (allData.length === 0) {
      // Fetch data from API
      const response = await fetch(apiUrl);
      allData = await response.json(); // Store the fetched data
    }

    // Calculate start and end index for the page
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = page * itemsPerPage;

    // Slice the data to get only the items for the current page
    const pageData = allData.slice(startIndex, endIndex);

    // Update the table with fetched data
    updateTable(pageData);

    // Enable/Disable the Next and Previous buttons
    document.getElementById("prev").disabled = currentPage === 1;
    document.getElementById("next").disabled =
      currentPage * itemsPerPage >= allData.length;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Function to update the table with the fetched data
function updateTable(pageData) {
  const tableBody = document.getElementById("table-body");
  tableBody.innerHTML = ""; // Clear previous data

  pageData.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${item.userId}</td><td>${item.id}</td><td>${item.title}</td><td>${item.completed}</td><td><img src="/passport.jpg" height="70" width="70"></td>`;
    tableBody.appendChild(row);
  });
}

// Function to navigate between pages
function navigate(direction) {
  currentPage += direction;
  fetchData(currentPage);
}

// Initial data load
fetchData(currentPage);
