const htable = document.querySelector(".head-table");
const bTable = document.querySelector(".body-table");
const dateNumber = document.querySelector(".date-number");
const dayInWeek = document.querySelector(".week-day");
const fullDate = document.querySelector(".full-date");
const selectDay = document.querySelector(".select-day");
const selectMonth = document.querySelector(".select-month");
const yearInput = document.querySelector(".year-input");

let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let currentDate = today.getDate();

let dayOfWeek = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
let dayList = [
  "Chủ Nhật",
  "Thứ Hai",
  "Thứ Ba",
  "Thứ Tư",
  "Thứ Năm",
  "Thứ Sáu",
  "Thứ Bảy",
];

fullDate.innerHTML = `Tháng ${today.getMonth() + 1} năm ${today.getFullYear()}`;
dateNumber.innerHTML = today.getDate();
dayInWeek.innerHTML = dayList[new Date().getDay()];
selectDay.value = today.getDate();
selectMonth.value = currentMonth;
yearInput.value = currentYear;

// Render head table
let headTable = `<tr>`;

dayOfWeek.map((day) => {
  return (headTable += `<th class='dayOfWeek'>${day}</th>`);
});

headTable += `</tr>`;

htable.innerHTML = headTable;

// Render all days in a month
for (
  let i = 0;
  i < dayOfMonth(parseInt(selectMonth.value), parseInt(yearInput.value));
  i++
) {
  if (i + 1 === today.getDate()) {
    selectDay.innerHTML += `<option value=${i + 1} selected>${i + 1}</option>`;
  } else {
    selectDay.innerHTML += `<option value=${i + 1}>${i + 1}</option>`;
  }
}

// Onchange whenever choose month
function changeMonth() {
  selectDay.innerHTML = "";
  if (parseInt(selectMonth.value) === 1) {
    for (
      let i = 0;
      i < dayOfMonth(parseInt(selectMonth.value), parseInt(yearInput.value));
      i++
    ) {
      selectDay.innerHTML += `<option value=${i + 1}>${i + 1}</option>`;
    }
  } else if (
    parseInt(selectMonth.value) === 3 ||
    parseInt(selectMonth.value) === 5 ||
    parseInt(selectMonth.value) === 8 ||
    parseInt(selectMonth.value) === 10
  ) {
    for (
      let i = 0;
      i < dayOfMonth(parseInt(selectMonth.value), parseInt(yearInput.value));
      i++
    ) {
      selectDay.innerHTML += `<option value=${i + 1}>${i + 1}</option>`;
    }
  } else {
    for (
      let i = 0;
      i < dayOfMonth(parseInt(selectMonth.value), parseInt(yearInput.value));
      i++
    ) {
      selectDay.innerHTML += `<option value=${i + 1}>${i + 1}</option>`;
    }
  }
}

// Invoke whenever blur year input
function onblurYearInput() {
  selectDay.innerHTML = "";
  currentYear = parseInt(yearInput.value);
  for (
    let i = 0;
    i < dayOfMonth(parseInt(selectMonth.value), currentYear);
    i++
  ) {
    selectDay.innerHTML += `<option value=${i + 1}>${i + 1}</option>`;
  }
}

showCalendar(currentMonth, currentYear);

function clickCell(e) {
  activeDate(e.target);

  dateNumber.innerHTML = e.target.getAttribute("data-date");

  currentDate = e.target.getAttribute("data-date");

  let day = new Date(
    `${e.target.getAttribute("data-month")} ${e.target.getAttribute(
      "data-date"
    )}, ${e.target.getAttribute("data-year")}`
  );

  dayInWeek.innerHTML = dayList[day.getDay()];
}

// Active selected date on calendar
function activeDate(date) {
  date.classList.add("activeDate");

  let cells = document.querySelectorAll(".table-cell");
  for (let i = 0; i < cells.length; i++) {
    let activeCells = document.querySelectorAll(".activeDate");
    for (let j = 0; j < activeCells.length; j++) {
      if (
        activeCells[j].getAttribute("data-date") !==
        date.getAttribute("data-date")
      ) {
        activeCells[j].classList.remove("activeDate");
      }
    }
  }
}

// Ok click button
function clickOk() {
  showCalendar(selectMonth.value, yearInput.value);
  fullDate.innerHTML = `Tháng ${parseInt(selectMonth.value) + 1} năm ${
    yearInput.value
  }`;
  dateNumber.innerHTML = selectDay.value;
  dayInWeek.innerHTML =
    dayList[
      new Date(
        `${parseInt(selectMonth.value) + 1} ${selectDay.value}, ${
          yearInput.value
        }`
      ).getDay()
    ];

  let cells = document.querySelectorAll(".table-cell");
  for (let i = 0; i < cells.length; i++) {
    if (cells[i].getAttribute("data-date") === selectDay.value) {
      cells[i].classList.add("activeDate");
    }
  }

  currentDate = selectDay.value;
  currentYear = parseInt(yearInput.value);
}

// Back Month button
function clickBackMonth() {
  currentYear = currentMonth === 0 ? currentYear - 1 : currentYear;
  currentMonth = currentMonth === 0 ? 11 : currentMonth - 1;

  let day = new Date(
    `${currentMonth + 1} ${currentDate ? currentDate : today.getDate()}, ${
      currentMonth === 0 ? currentYear - 1 : currentYear
    }`
  );
  dayInWeek.innerHTML = dayList[day.getDay()];

  fullDate.innerHTML = `Tháng ${currentMonth + 1} năm ${currentYear}`;
  showCalendar(currentMonth, currentYear);

  let cells = document.querySelectorAll(".table-cell");
  for (let i = 0; i < cells.length; i++) {
    if (cells[i].getAttribute("data-date") === currentDate.toString()) {
      cells[i].classList.add("activeDate");
    }
  }
}

// Back year button
function clickBackYear() {
  currentYear = currentYear - 1;
  showCalendar(currentMonth, currentYear);

  let day = new Date(
    `${currentMonth + 1} ${currentDate ? currentDate : today.getDate()}, ${
      currentMonth === 0 ? currentYear - 1 : currentYear
    }`
  );
  dayInWeek.innerHTML = dayList[day.getDay()];

  fullDate.innerHTML = `Tháng ${currentMonth + 1} năm ${currentYear}`;

  let cells = document.querySelectorAll(".table-cell");
  for (let i = 0; i < cells.length; i++) {
    if (cells[i].getAttribute("data-date") === currentDate.toString()) {
      cells[i].classList.add("activeDate");
    }
  }
}

// Next month button
function clickNextMonth() {
  currentYear = currentMonth === 11 ? currentYear + 1 : currentYear;
  currentMonth = currentMonth === 11 ? 0 : currentMonth + 1;
  showCalendar(currentMonth, currentYear);

  let day = new Date(
    `${currentMonth + 1} ${currentDate ? currentDate : today.getDate()}, ${
      currentMonth === 12 ? currentYear + 1 : currentYear
    }`
  );
  dayInWeek.innerHTML = dayList[day.getDay()];

  fullDate.innerHTML = `Tháng ${currentMonth + 1} năm ${currentYear}`;

  let cells = document.querySelectorAll(".table-cell");
  for (let i = 0; i < cells.length; i++) {
    if (cells[i].getAttribute("data-date") === currentDate.toString()) {
      cells[i].classList.add("activeDate");
    }
  }
}

// Next year button
function clickNextYear() {
  currentYear = currentYear + 1;
  showCalendar(currentMonth, currentYear);

  let day = new Date(
    `${currentMonth + 1} ${
      currentDate ? currentDate : today.getDate()
    }, ${currentYear}`
  );
  dayInWeek.innerHTML = dayList[day.getDay()];

  fullDate.innerHTML = `Tháng ${currentMonth + 1} năm ${currentYear}`;

  let cells = document.querySelectorAll(".table-cell");
  for (let i = 0; i < cells.length; i++) {
    if (cells[i].getAttribute("data-date") === currentDate.toString()) {
      cells[i].classList.add("activeDate");
    }
  }
}

// Show calendar according to the month and year
function showCalendar(month, year) {
  let firstday = new Date(year, month).getDay();

  bTable.innerHTML = "";

  let date = 1;
  for (let i = 0; i < 6; i++) {
    let row = document.createElement("tr");

    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < firstday) {
        let cell = document.createElement("td");
        let cellText = document.createTextNode("");
        cell.appendChild(cellText);
        row.appendChild(cell);
      } else if (date > dayOfMonth(month, year)) {
        break;
      } else {
        let cell = document.createElement("td");
        cell.addEventListener("click", clickCell);
        cell.className = "table-cell";
        cell.setAttribute("data-date", date);
        cell.setAttribute("data-month", parseInt(month) + 1);
        cell.setAttribute("data-year", year);
        cell.innerHTML = date;

        if (
          date === today.getDate() &&
          month === today.getMonth() &&
          year === today.getFullYear()
        ) {
          cell.classList.add("activeDate");
        }

        row.appendChild(cell);
        date++;
      }
    }

    bTable.appendChild(row);
  }
}

// Days in a month
function dayOfMonth(iMonth, iYear) {
  return 32 - new Date(iYear, iMonth, 32).getDate();
}
