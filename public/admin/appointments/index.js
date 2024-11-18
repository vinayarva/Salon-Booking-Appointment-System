const date = document.getElementById("date");
const today = new Date().toISOString().split('T')[0]; 
date.value = today; 

date.addEventListener("change",(event)=>{
    const date = event.target.value;

    axios.get("http://localhost:4000/api/admin/getappointment",{
        params : {date: date}
    ,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    } }).then((result) => {
        console.log(result);
        displayAppointment(result.data.content)
    }).catch((err) => {
        console.log(err)
    });
})


function updater(){

    const currentDate =  date.value


    axios.get("http://localhost:4000/api/admin/getappointment", {
        params: { date: currentDate },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    })
    .then((result) => {
        
        // const array =  result.data.content
        displayAppointment(result.data.content)
    })
    .catch((err) => {
        console.log(err);
    });


}

document.addEventListener("DOMContentLoaded", () => {
    // const today = new Date().toISOString().split('T')[0]; // Get today's date in 'YYYY-MM-DD' format

    axios.get("http://localhost:4000/api/admin/getappointment", {
        params: { date: today },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    })
    .then((result) => {
        
        // const array =  result.data.content
        displayAppointment(result.data.content)
    })
    .catch((err) => {
        console.log(err);
    });
});



function displayAppointment(data){

    const confirmedAppointments = data.filter(item => item.status === 'confirmed');
    const completedAppointments = data.filter(item => item.status === 'completed');
    const cancelledAppointments = data.filter(item => item.status === 'cancelled');


    const tbody_confirm =  document.getElementById("tbody_confirm");
    tbody_confirm.innerHTML = ""

    confirmedAppointments.forEach(element => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
   
                <td>${element.date}</td>
                <td class="text-capitalize">${element.user.userName}</td>
                <td>${Time24to12(element.time)}</td>
                <td class="text-capitalize">${element.admin.name}</td>
                <td>
                    <div class="d-flex gap-2">
                        <button type="button" class="btn btn-outline-success completed_btn" id=${element.ID} value = "completed">Completed</button>
                          <button type="button" class="btn btn-outline-danger cancel_btn" id=${element.ID} value = "cancelled">Cancel</button>
                    </div>
                </td>
            `
            tbody_confirm.appendChild(tr)
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


    document.querySelectorAll(".completed_btn").forEach((button)=>{
        button.addEventListener("click",(event)=>{
    
            axios.put(`http://localhost:4000/api/admin/appointmentStatus/${event.target.id}`,{
                params: { status: "completed" },
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





    const tbody_completed = document.getElementById('tbody_completed')
    tbody_completed.innerHTML = ''

    completedAppointments.forEach(element => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
   
                <td>${element.date}</td>
                <td class="text-capitalize">${element.user.userName}</td>
                <td>${Time24to12(element.time)}</td>
                 <td class="text-capitalize">${element.admin.name}</td>
                <td>
                    <div class="d-flex gap-2">
                          <button type="button" class="btn btn-success">Completed</button>
                    </div>
                </td>
            `
            tbody_completed.appendChild(tr)
    });


const tbody_cancel =  document.getElementById("tbody_cancel");
tbody_cancel.innerHTML = ""


    cancelledAppointments.forEach(element => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
   
                <td>${element.date}</td>
                <td class="text-capitalize">${element.user.userName}</td>
                <td>${Time24to12(element.time)}</td>
                <td class="text-capitalize">${element.admin.name}</td>
                <td>
                    <div class="d-flex gap-2">
                          <button type="button" class="btn btn-danger pe-none" >Cancelled</button>
                    </div>
                </td>
            `
            tbody_cancel.appendChild(tr)
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