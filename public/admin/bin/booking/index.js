const hiddenEmployeeName = document.getElementById("hiddenEmployeeName");

// Handle form submission
function submitBooking(event) {
  event.preventDefault(); // Prevent the default form submission

  const timeSlot = event.target.querySelector('input[name="group"]:checked');

  const booking = {
    date: event.target.date.value,
    services: event.target.service.value,
    time: timeSlot.value,
    employeeRoleID: hiddenEmployeeName.value
  };

  console.log(booking);

  axios.post("http://localhost:4000/api/booking", booking, {headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`, // Replace `token` with your actual token variable

  }}).then((result) => {
   
      console.log(result)
      event.target.reset(); 
      

      dateInput.value = formattedDate


  }).catch((err) => {
      console.log(err)
  });


}

// Get the date and select elements
const dateInput = document.getElementById("date");

// Get today's date
const today = new Date();
const formattedDate = today.toISOString().split("T")[0]; // Formats as 'YYYY-MM-DD'

// Set the value of the date input to today's date
dateInput.value = formattedDate;
const serviceInput = document.getElementById("service");

// Common event handler function
async function handleInputChange() {
  try {
    const date = dateInput.value;
    const service = serviceInput.value;
    console.log("Date:", date, "Service:", service);

    const result = await axios.get(
      "http://localhost:4000/api/fetchAvailability",
      {
        params: {
          date: date,
          service: service,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Replace `token` with your actual token variable
        },
      }
    );
    

    hiddenEmployeeName.value = result.data.employeeRoleID;

    console.log(hiddenEmployeeName.value)
    console.log(result);
    displayTimeSlots(result.data.availability);
  } catch (error) {
    console.log(error);
  }
}

// Attach the event listener to both elements
dateInput.addEventListener("change", handleInputChange);
serviceInput.addEventListener("change", handleInputChange);

// Function to display time slots based on fetched data
function displayTimeSlots(timeAvailability) {
  const container = document.getElementById("time-slots");
  container.innerHTML = ""; // Clear any existing slots

  for (const [time, available] of Object.entries(timeAvailability)) {
    // Convert time from 24-hour format to 12-hour format
    const displayTime = convertTo12HourFormat(time);

    // Create a radio button for each time slot
    const input = document.createElement("input");
    input.type = "radio";
    input.id = `button${time.replace(":", "")}`;
    input.name = "group";
    input.value = time;

    const label = document.createElement("label");
    label.setAttribute("for", input.id);
    label.className = "radio_label";
    label.textContent = displayTime; // Use 12-hour formatted time

    // If the time slot is not available, disable the input and add a class to the label
    if (!available) {
      input.disabled = true;
      label.classList.add("slot_disable");
    }

    // Append input and label to the container
    container.appendChild(input);
    container.appendChild(label);
    container.appendChild(document.createElement("br"));
  }
}

