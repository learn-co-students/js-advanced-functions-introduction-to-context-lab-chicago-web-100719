
function createEmployeeRecord(employee){
  return {
    firstName: employee[0],
    familyName: employee[1],
    title: employee[2],
    payPerHour: employee[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

function createEmployeeRecords(employees){
 return employees.map(employee => createEmployeeRecord(employee))
}

function createTimeInEvent(employee, date){
  const dateTime = date.split(" ")
  const timeIn = {
    type: "TimeIn",
    hour: parseInt(dateTime[1]),
    date: dateTime[0]
  }
  employee.timeInEvents.push(timeIn)
  return employee
}

function createTimeOutEvent(employee, date){
  const dateTime = date.split(" ")
  const timeOut = {
    type: "TimeOut",
    hour: parseInt(dateTime[1]),
    date: dateTime[0]
  }
  employee.timeOutEvents.push(timeOut)
  return employee
}

function hoursWorkedOnDate(employee, date){
  const timeIn = employee.timeInEvents.find(ev => ev.date === date)
  const timeOut = employee.timeOutEvents.find(ev => ev.date === date)
  return (timeOut.hour - timeIn.hour) / 100
}

function wagesEarnedOnDate(employee, date){
  const hours = hoursWorkedOnDate(employee, date)
  return hours * employee.payPerHour
}

function allWagesFor(employee){
  const dates = employee.timeInEvents.map(ev => ev.date)
  return dates.reduce((a, b, ) => a + wagesEarnedOnDate(employee, b), 0)
}

function calculatePayroll(employees){
  return employees.reduce((a,b) => a + allWagesFor(b), 0)
}

function findEmployeeByFirstName(employees, name){
  return employees.find(employee => employee.firstName === name)
}
