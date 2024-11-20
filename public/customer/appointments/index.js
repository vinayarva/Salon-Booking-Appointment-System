// const { compareSync } = require("bcrypt");
const rescheduleDate =  document.getElementById("rescheduleDate");

const today = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD
const RescheduleButton =  document.getElementById("rescheduleButton");

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
const formattedDate = tomorrow.toISOString().split("T")[0];

rescheduleDate.min = formattedDate

let serviceReschedule ;
let rowID ;

rescheduleDate.addEventListener("change",(event)=>{

  const date = rescheduleDate.value
  // const service =  RescheduleButton.getAttribute('value')


  // const rescheduleButton = document.getElementById('Reschedule');
 const service = serviceReschedule
  // console.log(service);
  handleInputChange(date,service)



})





RescheduleButton.addEventListener("click",(event)=>{


  const timeSlot = document.querySelector('input[name="group"]:checked');
  const data = {
    date : rescheduleDate.value,
    time: timeSlot ? timeSlot.value : "",
  }
  console.log(data)
  axios.put(`http://localhost:4000/api/updateBooking/${rowID}`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`, // Add the token for authentication
    },
  })
    .then((result) => {
      alert(result.data.message); // Show success message
      const modal = bootstrap.Modal.getInstance(document.getElementById('exampleModal')); // Replace with your modal's ID
      modal.hide(); // Close the modal
      updater(); // Refresh the booking list

    })
    .catch((err) => {
      console.log("Reschedule failed:", err); // Handle any booking errors
    });
})




document.addEventListener("click", (event) => {
  if (event.target.classList.contains("Reschedule_btn")) {
    serviceReschedule = event.target.getAttribute("service");
     rowID = event.target.id;
    
  }
});



async function handleInputChange(date,service) {
  try {
    // const date = dateInput.value;
    // const service = serviceInput.value;
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
    

    // hiddenEmployeeName.value = result.data.adminID;

    // console.log(hiddenEmployeeName.value)
    console.log(result);
    displayTimeSlots(result.data.availability);
  } catch (error) {
    console.log(error);
  }
}



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











document.addEventListener("DOMContentLoaded", async (event) => {
  try {
    const result = await axios.get("http://localhost:4000/api/fetchBookings", {
      params: {
        date: today,
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log(result);
    const current = result.data.current;
    const past = result.data.past;

    if (current.length > 0) {
      displayCurrent(current);
    }

    if (past.length > 0) {
      displayPast(past);
    }
  } catch (error) {
    console.log(error);
  }
});

async function updater() {
  try {
    const result = await axios.get("http://localhost:4000/api/fetchBookings", {
      params: {
        date: today,
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log(result);
    const current = result.data.current;
    const past = result.data.past;

    if (current.length > 0) {
      displayCurrent(current);
    }

    if (past.length > 0) {
      displayPast(past);
    }
  } catch (error) {
    console.log(error);
  }
}

function displayCurrent(data) {
  const filterData = data.filter((obj) => obj.status !== "cancelled");
  console.log(filterData);

  const current = document.getElementById("Current_appointments");
  current.innerHTML = "";

  filterData.forEach((element) => {
    const div = document.createElement("div");

    div.innerHTML = `
        
              <div class="container rounded-4 my-3" style="background-color: #CCFFCC;">
        <div class="d-flex flex-column flex-md-row justify-content-md-evenly p-3 align-items-center">
            <div class="mb-2 mb-md-0 text-center">
                <h5>Date: ${element.date}</h5>
            </div>
            <div class="mb-2 mb-md-0 text-center">
                <h5>Booking Time: ${Time24to12(element.time)}</h5>
            </div>
            <div class="mb-2 mb-md-0 text-center">
                <h5>${element.services}</h5>
            </div
            <div class="d-flex flex-column flex-md-row">
           <button type="button" class="btn btn-success Reschedule_btn" data-bs-toggle="modal" id="${element.ID}" service="${element.services}" data-bs-target="#exampleModal">
    Reschedule
</button>
                <button class="btn btn-danger cancel_btn" id="${
                  element.ID
                }">Cancel</button>
            </div>
        </div>
    </div>  
        
        `;
    current.appendChild(div);
  });

  document.querySelectorAll(".cancel_btn").forEach((button) => {
    button.addEventListener("click", (event) => {
      axios
        .put(
          `http://localhost:4000/api/admin/appointmentStatus/${event.target.id}`,
          {
            params: { status: "cancelled" },
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((result) => {
          updater();
        })
        .catch((err) => {
          console.log(err);
        });
    });
  });
}

function displayPast(data) {
  const current = document.getElementById("past_appointments");
  current.innerHTML = "";

  data.forEach((element) => {
    const div = document.createElement("div");

    div.innerHTML = `
        
              <div class="container rounded-4 mb-4" style="background-color: lightgray;">
        <div class="d-flex flex-column flex-md-row justify-content-md-evenly p-3 align-items-center">
            <div class="mb-2 mb-md-0 text-center">
                <h4>Date: ${element.date}</h4>
            </div>
            <div class="mb-2 mb-md-0 text-center">
                <h4>Booking Time: ${Time24to12(element.time)}</h4>
            </div>
             <div class="mb-2 mb-md-0 text-center">
                <h4> ${element.services}</h4>
            </div>
            <div>
                <h3>${element.status}<h3>
            </div>
        </div>
    </div>  
        
        `;
    current.appendChild(div);
  });
}

function Time24to12(time) {
  // Split the input time into hours and minutes
  let [hours, minutes] = time.split(":").map(Number);

  // Determine AM or PM suffix
  const suffix = hours >= 12 ? "PM" : "AM";

  // Convert hours from 24-hour format to 12-hour format
  hours = hours % 12 || 12; // Convert '0' or '12' to '12'

  // Return the formatted time
  return `${hours}:${minutes.toString().padStart(2, "0")} ${suffix}`;
}

document.getElementById("signout").addEventListener("click", () => {
  window.location.href = "../login/login.html";
});
