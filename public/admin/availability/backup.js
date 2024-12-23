const date = document.getElementById("date");
const today = new Date().toISOString().split("T")[0];
date.value = today;

document.getElementById("signout").addEventListener("click", () => {
  window.location.href = "../login/login.html";
});

date.addEventListener("change", (event) => {
  const date = event.target.value;

  console.log(date);

  // axios.get("http://16.170.244.158/api/admin/getappointment",{
  //     params : {date: date}
  // ,
  // headers: {
  //   Authorization: `Bearer ${localStorage.getItem("token")}`
  // } }).then((result) => {
  //     console.log(result);
  //     displayAppointment(result.data.content)
  // }).catch((err) => {
  //     console.log(err)
  // });
});

document.addEventListener("DOMContentLoaded", () => {
  const current = date.value;

  axios
    .get("http://16.170.244.158/api/admin/fetchAvailabilityALL", {
      params: { date: current },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((result) => {
      console.log(result);
      displayAvailability(result.data.availabilityResults);
      // displayAppointment(result.data.content)
    })
    .catch((err) => {
      console.log(err);
    });
});

function displayAvailability(data) {
  // Get the table body element
  const tbody = document.getElementById("tbody");

  // Clear the table body before adding new rows
  tbody.innerHTML = "";

  // Loop through the data and create a row for each employee
  data.forEach((employee) => {
    // Create a new table row
    const row = document.createElement("tr");

    // Create a table cell for the employee name
    const nameCell = document.createElement("td");
    nameCell.textContent = employee.employeeName;
    row.appendChild(nameCell);

    // Loop through the hours (10:00 to 18:00) and create a toggle switch for each hour
    const hours = [
      "10:00",
      "11:00",
      "12:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00",
      "18:00",
    ];
    hours.forEach((hour) => {
      const hourCell = document.createElement("td");

      // Create the toggle switch container div
      const checkboxWrapper = document.createElement("div");
      checkboxWrapper.classList.add("checkbox-wrapper-10");

      // Create the toggle input
      const toggleInput = document.createElement("input");
      toggleInput.classList.add("tgl", "tgl-flip");
      toggleInput.type = "checkbox";
      toggleInput.id = `${employee.employeeName}_${hour}`;
      toggleInput.checked = !employee.availability[hour]; // Unchecked means available (true), checked means not available (false)

      // Create the label for the toggle switch
      const toggleLabel = document.createElement("label");
      toggleLabel.classList.add("tgl-btn");
      toggleLabel.setAttribute("data-tg-off", "Available");
      toggleLabel.setAttribute("data-tg-on", "Not Available");
      toggleLabel.setAttribute("for", toggleInput.id);

      // Add the toggle input and label to the wrapper div
      checkboxWrapper.appendChild(toggleInput);
      checkboxWrapper.appendChild(toggleLabel);

      // Add an event listener to handle toggle state changes
      toggleInput.addEventListener("change", (e) => {
        // Toggle availability based on checkbox state
        employee.availability[hour] = !e.target.checked;
      });

      hourCell.appendChild(checkboxWrapper);
      row.appendChild(hourCell);
    });

    // Append the row to the table body
    tbody.appendChild(row);
  });
}
