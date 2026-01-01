const dateInput = document.getElementById("bookingDate");
const submitBtn = document.querySelector(".btn__primary");
const warning = document.getElementById("dateWarning");

let bookedDates = [];

const today = new Date().toISOString().split("T")[0];
dateInput.setAttribute("min", today);

fetch("data.json")
  .then(response => response.json())
  .then(data => {
    bookedDates = data.bookings.bookedDates || [];
  })
  .catch(err => {
    console.error("Failed to load booked dates", err);
  });

dateInput.addEventListener("change", () => {
  const selectedDate = dateInput.value;

  if (bookedDates.includes(selectedDate)) {
    warning.style.display = "block";
    submitBtn.disabled = true;
    submitBtn.style.opacity = "0.5";
    submitBtn.style.cursor = "not-allowed";
  } else {
    warning.style.display = "none";
    submitBtn.disabled = false;
    submitBtn.style.opacity = "1";
    submitBtn.style.cursor = "pointer";
  }
});
