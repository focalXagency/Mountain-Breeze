//select arow in contact page animation
const selectArow =document.querySelector('.ho-form-name img');
const select =document.querySelector('.ho-form-name select');
const body =document.querySelector('body');

select.addEventListener("click",()=>{
    selectArow.classList.toggle('ho-arow');
})

//text area animation in contact page
const textArea = document.querySelector('ho-text-area textarea');
const textAreaMessage =document.querySelector('.ho-text-area .ho-form-textarea');


function hideMessage(){
    textAreaMessage.style.display = "none" }


    //API form
    const form = document.querySelector('#form');
form.addEventListener('submit', function(e) {
  e.preventDefault();

  const fullName = document.getElementById('Full_Name').value;
  const email = document.getElementById('Email').value;
  const phone = document.getElementById('Phone').value;
  const subjectElement = document.getElementById('subject');
  const subject = subjectElement.options[subjectElement.selectedIndex].value;
  const content = document.getElementById('content').value;
  const agree = document.getElementById('accept').checked;
const message = 'The message has been sent ';
  const data = {
    full_name: fullName,
    email: email,
    phone: phone,
    subject: subject,
    content: content,
    agree: agree
  };

  fetch('https://mountain.lavetro-agency.com/api/dashboard/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      // Add any additional headers if required
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    // Handle the response data
  })
  .catch(error => {
    console.error(error);
    // Handle any errors that occur during the request
  }).then(function(){
location.reload(500);
  }).then(alert(message));
});
// const submit =document.getElementById('sumit');
// submit.addEventListener("click",()=>{
// location.reload();
// })