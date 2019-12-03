// Your code here
function createEmployeeRecord(employeeInfo){
    return {
        firstName: employeeInfo[0],
        familyName: employeeInfo[1],
        title: employeeInfo[2],
        payPerHour: employeeInfo[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(employees){
    return employees.map(employee => createEmployeeRecord(employee))
}

function createTimeInEvent(employee, stamp){
    let [date, hour] = stamp.split(" ")

    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour),
        date: date
    })
    return employee
}

function createTimeOutEvent(employee, stamp){
    let [date, hour] = stamp.split(" ")

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour),
        date: date
    })
    return employee
}

function hoursWorkedOnDate(employee,date){
    let inEvent = employee.timeInEvents.find(event => event.date === date)
    let outEvent = employee.timeOutEvents.find(event => event.date === date)
    return (outEvent - inEvent) / 100
}