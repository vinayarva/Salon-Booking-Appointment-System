const hiddenEmployeeName = document.getElementById("hiddenEmployeeName");

// Handle form submission


document.getElementById("signout").addEventListener("click",()=>{
    window.location.href = "../login/login.html"
})

function submitBooking(event) {
  event.preventDefault(); // Prevent the default form submission

  const timeSlot = event.target.querySelector('input[name="group"]:checked');

  const booking = {
    date: event.target.date.value,
    services: event.target.service.value,
    time: timeSlot.value,
    adminID: hiddenEmployeeName.value
  };

  console.log(booking);

  axios.post("http://localhost:4000/api/booking", booking, {headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`, // Replace `token` with your actual token variable

  }}).then((result) => {


    alert(result.data.message)
    window.location.href = "../appointments/appointments.html"


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
dateInput.min = formattedDate
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
    

    hiddenEmployeeName.value = result.data.adminID;

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

function convertTo12HourFormat(time24) {
  // Split the time into hours and minutes
  let [hours, minutes] = time24.split(":");

  // Convert hours to a number to check AM/PM
  hours = parseInt(hours);

  // Determine if it's AM or PM
  const period = hours >= 12 ? "PM" : "AM";

  // Convert to 12-hour format
  if (hours > 12) {
    hours -= 12;
  } else if (hours === 0) {
    hours = 12; // Midnight case
  }

  return `${hours}:${minutes} ${period}`;
}




function getAuthHeaders() {
  return {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
}


document.addEventListener("DOMContentLoaded", async () => {
  try {
    updateService()
  } catch (error) {
    console.error("Error fetching services:", error);
    alert("Failed to load services. Please try again later.");
  }
});

// Display service cards
function displayCard(data) {
  if (data.length === 0) return null;

  const cards_slots = document.getElementById("cards-slots");
  cards_slots.innerHTML = "";

  data.forEach((element) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <div class="mx-2 my-2">
        <div class="card" style="width: 12rem;height:16rem">
          <div class="card-body">
            <h5 class="card-title">${element.serviceName}</h5>
            <p class="card-text">${element.serviceDescription}</p>
          </div>
        </div>
      </div>
    `;
    cards_slots.appendChild(div);
  })

  const Select = document.getElementById("service")

  data.forEach((element) => {
    const option = document.createElement("option");
    option.value = element.serviceName
    option.innerText = element.serviceName

    Select.appendChild(option)
  })


}


function updateService(){

  axios.get("http://localhost:4000/api/getService", getAuthHeaders()).then((result)=>{

    displayCard(result.data.content);

  }).catch((err)=>{console.log(err)});


}

