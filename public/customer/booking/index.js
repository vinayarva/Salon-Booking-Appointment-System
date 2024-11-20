const hiddenEmployeeName = document.getElementById("hiddenEmployeeName");

// Handle form submission

document.getElementById("signout").addEventListener("click", () => {
  window.location.href = "../login/login.html";
});

// Get the date and select elements
const dateInput = document.getElementById("date");

// Get today's date
const today = new Date();

// const formattedDate = today.toISOString().split("T")[0]; // Formats as 'YYYY-MM-DD'
// Set the value of the date input to today's date

today.setDate(today.getDate() + 1);
const formattedDate = today.toISOString().split("T")[0];

dateInput.value = formattedDate;
dateInput.min = formattedDate;

const oneWeekLater = new Date();
oneWeekLater.setDate(today.getDate() + 7);
const final = oneWeekLater.toISOString().split("T")[0];

dateInput.max = final;
const serviceInput = document.getElementById("service");

// Common event handler function
async function handleInputChange() {
  try {
    const date = dateInput.value;
    const service = serviceInput.value;
    console.log("Date:", date, "Service:", service);

    const result = await axios.get(
      "http://16.170.244.158/api/fetchAvailability",
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

    console.log(hiddenEmployeeName.value);
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
    updateService();
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
  });

  const Select = document.getElementById("service");

  data.forEach((element) => {
    const option = document.createElement("option");
    option.value = element.serviceName;
    option.innerText = element.serviceName;
    option.setAttribute("data-price", element.price);

    Select.appendChild(option);
  });

  Select.addEventListener("change", function () {
    const selectedOption = Select.options[Select.selectedIndex]; // Get the selected option
    const price = selectedOption.getAttribute("data-price"); // Retrieve the price
    const price_text = document.getElementById("price-text");
    price_text.innerText = "Price: " + price;
    document.getElementById("hiddenprice").value = price;
    console.log(price); // Display the price in the console (or use it as needed)
  });
}

function updateService() {
  axios
    .get("http://16.170.244.158/api/getService", getAuthHeaders())
    .then((result) => {
      console.log(result);
      displayCard(result.data.content);
    })
    .catch((err) => {
      console.log(err);
    });
}

document.getElementById("purchase").addEventListener("click", async (e) => {
  try {
    e.preventDefault(); // Prevent form submission initially

    // Get the price from the hidden input field
    const price = document.getElementById("hiddenprice").value; // Get the price value
    const formattedPrice = price * 100; // Razorpay expects the amount in paise (1 INR = 100 paise)
    console.log(formattedPrice);
    // Open the payment gateway first
    const response = await axios.get(
      `http://16.170.244.158/api/service/premium?price=${formattedPrice}`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    const order_id = response.data.id;

    const options = {
      key: "rzp_test_m2xurDMBsJulme", // Replace with your Razorpay key ID
      amount: formattedPrice, // Amount should be in paise (100 paise = 1 INR)
      currency: "INR",
      name: "Salon Service Payment",
      description: "Service Payment",
      order_id: order_id,
      handler: async (paymentResponse) => {
        try {
          // Handle the payment success response here
          // Send the payment details back to the server for verification
          const result = await axios.post(
            "http://16.170.244.158/api/service/verify",
            paymentResponse,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );

          // After successful payment, submit the booking form
          submitBooking(paymentResponse); // Call the submitBooking function after payment success
        } catch (error) {
          console.log("Payment verification failed:", error);
        }
      },
      prefill: {
        name: "Mark Anthony", // Prefill user's name
        email: "user@example.com", // Prefill user's email
        contact: "9999999999", // Prefill user's contact number
      },
      theme: {
        color: "#3399cc",
      },
    };

    const paymentWindow = new Razorpay(options);
    paymentWindow.open();
  } catch (error) {
    console.log("Error opening payment gateway:", error);
  }
});

// Modified submitBooking function
function submitBooking(paymentResponse) {
  // Prevent the default form submission
  const timeSlot = document.querySelector('input[name="group"]:checked');
  const booking = {
    date: document.getElementById("date").value,
    services: document.getElementById("service").value,
    time: timeSlot ? timeSlot.value : "", // Ensure time slot exists
    adminID: document.getElementById("hiddenEmployeeName").value,
    // paymentResponse: paymentResponse, // Attach the payment response to the booking
    // price: document.getElementById("hiddenprice").value // Add the price to the booking object
  };

  console.log(booking);

  // Send the booking data (including payment details) to your server
  axios
    .post("http://16.170.244.158/api/booking", booking, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Add the token for authentication
      },
    })
    .then((result) => {
      alert(result.data.message); // Show success message
      window.location.href = "../appointments/appointments.html"; // Redirect after successful booking
    })
    .catch((err) => {
      console.log("Booking failed:", err); // Handle any booking errors
    });
}
