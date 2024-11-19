// const { compareSync } = require("bcrypt");

const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD



document.addEventListener('DOMContentLoaded', async (event) => {

    try {

        const result = await axios.get("http://localhost:4000/api/fetchBookings", {
            params: {
              date: today 
            },
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}` 
            }
          })
    console.log(result)
        const current = result.data.current
        const past = result.data.past

        if(current.length > 0){
            displayCurrent(current)
        }

        if(past.length > 0){
            displayPast(past)
        }

        
    } catch (error) {
        console.log(error);
    }


})


async function updater(){

    try {

        const result = await axios.get("http://localhost:4000/api/fetchBookings", {
            params: {
              date: today 
            },
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}` 
            }
          })
            console.log(result)
        const current = result.data.current
        const past = result.data.past
    
        if(current.length > 0){
            displayCurrent(current)
        }
    
        if(past.length > 0){
            displayPast(past)
        }


        
    } catch (error) {
        console.log(error)
    }

  

}


function displayCurrent(data){

    const  filterData =  data.filter(obj => obj.status !== "cancelled")
    console.log(filterData)

    const current = document.getElementById("Current_appointments")
    current.innerHTML = ""
    
    filterData.forEach(element => {
        const div =  document.createElement('div')

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
           <!--  <button type="button" class="btn btn-success" data-bs-toggle="modal" id="Reschedule" value="${element.ID}" data-bs-target="#exampleModal">
                                                        Reschedule
            </button> -->
                <button class="btn btn-danger cancel_btn" id="${element.ID}">Cancel</button>
            </div>
        </div>
    </div>  
        
        `
          current.appendChild(div)
    });

    
    document.querySelectorAll(".cancel_btn").forEach((button)=>{
        button.addEventListener("click",(event)=>{
           
            axios.put(`http://localhost:4000/api/admin/appointmentStatus/${event.target.id}`, {
                params: { status: "cancelled" },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                  }
            })
            .then((result) => {
                
                updater()
            })
            .catch((err) => {
                console.log(err);
            });
        })
     })

}


function displayPast(data){
    const current = document.getElementById("past_appointments")
    current.innerHTML = ""
    
    data.forEach(element => {
        const div =  document.createElement('div')

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
        
        `
          current.appendChild(div)
    });
}

function Time24to12(time) {
    // Split the input time into hours and minutes
    let [hours, minutes] = time.split(':').map(Number);

    // Determine AM or PM suffix
    const suffix = hours >= 12 ? 'PM' : 'AM';

    // Convert hours from 24-hour format to 12-hour format
    hours = hours % 12 || 12; // Convert '0' or '12' to '12'

    // Return the formatted time
    return `${hours}:${minutes.toString().padStart(2, '0')} ${suffix}`;
}


document.getElementById("signout").addEventListener("click",()=>{
    window.location.href = "../login/login.html"
})