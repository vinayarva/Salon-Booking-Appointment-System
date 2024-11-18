// Utility function for headers
function getAuthHeaders() {
  return {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
}

document.getElementById("signout").addEventListener("click",()=>{
  window.location.href = "../login/login.html"
})

document.getElementById("add_btn").addEventListener("click",()=>{
        document.getElementById("ServiceName").value = "";
        document.getElementById("ServiceDescription").value = "";
        document.getElementById("price").value = "";
        document.getElementById("hidden").value = "undefined";
})

function handleSubmit(event) {
  event.preventDefault()

  const service = {
    serviceName: event.target.ServiceName.value,
    serviceDescription: event.target.ServiceDescription.value,
    price: event.target.price.value,
  };

  const hidden = document.getElementById("hidden");


  if (hidden.value === "undefined") {
    axios.post("http://localhost:4000/api/addService", service, getAuthHeaders())
      .then((result) => {
        console.log(result);
        alert("Service added successfully!");
        updateService()
      })
      .catch((err) => {
        console.error("Error adding service:", err);
        alert("Failed to add service. Please try again.");
      });
  } else {
    const ID = hidden.value;
    axios.put(`http://localhost:4000/api/updateService/${ID}`, service, getAuthHeaders())
      .then((result) => {
        console.log(result);
        hidden.value = "undefined";
        alert("Service updated successfully!");
        updateService()
      })
      .catch((err) => {
        console.error("Error updating service:", err);
        alert("Failed to update service. Please try again.");
      });
  }

  event.target.ServiceName.value = "";
  event.target.ServiceDescription.value = "";
  event.target.price.value = "";
}

// Fetch services on DOM content load
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
        <div class="card" style="width: 18rem;">
          <div class="card-body">
            <h5 class="card-title">${element.serviceName}</h5>
            <p class="card-text">${element.serviceDescription}</p>
            <p class="card-text"><strong>Price:</strong> $${element.price}</p>
            <div>
              <button class="btn btn-success me-3 edit_btn" data-bs-toggle="modal" data-bs-target="#exampleModal" type="button" id="${element.ID}">Edit</button>
              <button class="btn btn-danger delete_btn" type="button" id="${element.ID}">Delete</button>
            </div>
          </div>
        </div>
      </div>
    `;
    cards_slots.appendChild(div);
  });

  document.querySelectorAll('.edit_btn').forEach((button) => {
    button.addEventListener('click', async (event) => {
      const id = event.target.id;
      try {
        const result = await axios.get(`http://localhost:4000/api/getService/${id}`, getAuthHeaders());
        const data = result.data.content;

        document.getElementById("ServiceName").value = data.serviceName;
        document.getElementById("ServiceDescription").value = data.serviceDescription;
        document.getElementById("price").value = data.price;
        document.getElementById("hidden").value = data.ID;
      } catch (err) {
        console.error("Error fetching service details:", err);
        alert("Failed to load service details.");
      }
    });
  });

  
  document.querySelectorAll('.delete_btn').forEach((button) => {
    button.addEventListener('click', async (event) => {
      const id = event.target.id;
      if (confirm("Are you sure you want to delete this service?")) {
        try {
          await axios.delete(`http://localhost:4000/api/deleteService/${id}`, getAuthHeaders());
          alert("Service deleted successfully!");
          // Optionally, reload or refresh the displayed services
           updateService()
        } catch (err) {
          console.error("Error deleting service:", err);
          alert("Failed to delete service. Please try again.");
        }
      }
    });
  });
}



function updateService(){

  axios.get("http://localhost:4000/api/getService", getAuthHeaders()).then((result)=>{

    displayCard(result.data.content);

  }).catch((err)=>{console.log(err)});


}