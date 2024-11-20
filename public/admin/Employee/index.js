async function handleSubmit(event) {
  event.preventDefault();
  try {
    const user = {
      name: event.target.name.value,
      email: event.target.email.value,
      phone: event.target.phone.value,
      password: event.target.password.value,
      speciality: event.target.speciality.value,
    };

    const hidden = document.getElementById("hidden");

    // const  result = await axios.post("http://16.170.244.158/api/admin/addEmployee", user, getAuthHeaders())

    if (hidden.value === "undefined") {
      axios
        .post(
          "http://16.170.244.158/api/admin/addEmployee",
          user,
          getAuthHeaders()
        )
        .then((result) => {
          console.log(result);
          alert("Employee added successfully!");
          fetchEmployee();
        })
        .catch((err) => {
          console.error("Error adding Employee:", err);
          alert("Failed to add Employee. Please try again.");
        });
    } else {
      const ID = hidden.value;
      axios
        .put(
          `http://16.170.244.158/api/admin/updateEmployee/${ID}`,
          user,
          getAuthHeaders()
        )
        .then((result) => {
          console.log(result);
          hidden.value = "undefined";
          alert("Employee updated successfully!");
          fetchEmployee();
        })
        .catch((err) => {
          console.error("Error Employee service:", err);
          alert("Failed to Employee service. Please try again.");
        });
    }

    event.target.name.value = "";
    event.target.phone.value = "";
    event.target.email.value = "";
    event.target.password.value = "";
  } catch (error) {
    console.log(error);
  }
}

document.getElementById("add_btn").addEventListener("click", () => {
  document.getElementById("name").value = "";
  document.getElementById("password").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("email").value = "";
  document.getElementById("speciality").value = "";
  document.getElementById("hidden").value = "undefined";
});

function fetchEmployee() {
  axios
    .get("http://16.170.244.158/api/admin/getEmployee", getAuthHeaders())
    .then((result) => {
      displayEmployee(result.data.content);
    })
    .catch((err) => {
      console.log(err);
    });
}

function displayEmployee(data) {
  if (data.length === 0) return null;

  const employee_slots = document.getElementById("employee_slots");
  employee_slots.innerHTML = "";

  data.forEach((element) => {
    const div = document.createElement("div");
    div.innerHTML = `
            <div class="mx-2 my-2">
              <div class="card" style="width: 18rem;">
                <div class="card-body">
                  <h5 class="card-title text-capitalize">${element.name}</h5>
                  <p class="card-text">Email :${element.email}</p>
                  <p class="card-text">Phone Number :${element.phone}</p>
                  <p class="card-text">Speciality : ${element.speciality}</p>
                  <div>
                    <button class="btn btn-success me-3 edit_btn" data-bs-toggle="modal" data-bs-target="#exampleModal" type="button" id="${element.ID}">Edit</button>
                    <button class="btn btn-danger delete_btn" type="button" id="${element.ID}">Delete</button>
                  </div>
                </div>
              </div>
            </div>
          `;
    employee_slots.appendChild(div);
  });

  document.querySelectorAll(".edit_btn").forEach((button) => {
    button.addEventListener("click", async (event) => {
      const id = event.target.id;
      try {
        const result = await axios.get(
          `http://16.170.244.158/api/admin/editEmployee/${id}`,
          getAuthHeaders()
        );
        const data = result.data.content;

        document.getElementById("name").value = data.name;
        document.getElementById("email").value = data.email;
        document.getElementById("phone").value = data.phone;
        document.getElementById("speciality").value = data.speciality;
        document.getElementById("hidden").value = data.ID;
      } catch (err) {
        console.error("Error fetching Employee details:", err);
        alert("Failed to load Employee details.");
      }
    });
  });

  document.querySelectorAll(".delete_btn").forEach((button) => {
    button.addEventListener("click", async (event) => {
      const id = event.target.id;
      if (confirm("Are you sure you want to delete this service?")) {
        try {
          await axios.delete(
            `http://16.170.244.158/api/admin/deleteEmployee/${id}`,
            getAuthHeaders()
          );
          alert("Service deleted successfully!");

          fetchEmployee();
        } catch (err) {
          console.error("Error deleting service:", err);
          alert("Failed to delete service. Please try again.");
        }
      }
    });
  });
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
    fetchEmployee();
    fetchSpeciality();
  } catch (error) {
    console.error("Error fetching services:", error);
    alert("Failed to load services. Please try again later.");
  }
});

function fetchSpeciality() {
  const container = document.getElementById("speciality");
  container.innerHTML = "";

  axios
    .get(`http://16.170.244.158/api/getService`, getAuthHeaders())
    .then((result) => {
      const option = document.createElement("option");
      option.value = "";
      option.innerHTML = "Please choose the Speciality";
      container.appendChild(option);

      result.data.content.forEach((item) => {
        const option = document.createElement("option");
        option.value = item.serviceName;
        option.textContent = item.serviceName;

        container.appendChild(option);
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

document.getElementById("signout").addEventListener("click", () => {
  window.location.href = "../login/login.html";
});
