// Your code here
const createEmployeeRecord = employeeInfo =>{
    return {
        firstName: employeeInfo[0],
        familyName: employeeInfo[1],
        title: employeeInfo[2],
        payPerHour: employeeInfo[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

const createEmployeeRecords = employees => {
    return employees.map(employee => createEmployeeRecord(employee))
}

const createTimeInEvent = (employee, stamp)=>{
    let [date, hour] = stamp.split(" ")

    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour),
        date: date
    })
    return employee
}

const createTimeOutEvent = (employee, stamp)=>{
    let [date, hour] = stamp.split(" ")

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour),
        date: date
    })
    return employee
}

const hoursWorkedOnDate = (employee,date)=>{
    let inEvent = employee.timeInEvents.find(event => event.date === date)
    let outEvent = employee.timeOutEvents.find(event => event.date === date)
    return (outEvent.hour - inEvent.hour) / 100
}

const wagesEarnedOnDate = (employee, date)=>{
    const hours = hoursWorkedOnDate(employee, date)
    return hours * employee.payPerHour
}

const allWagesFor = employee => {
    const dates = employee.timeInEvents.map(event => event.date)
    let wages = dates.reduce(function(memo, date){
        return memo + wagesEarnedOnDate(employee,date)}, 0)
    return wages
}

const calculatePayroll = employees =>{
    return employees.reduce(function(memo,record){
        return memo + allWagesFor(record)
    }, 0)
}

const findEmployeeByFirstName = (array,firstName) => array.find(employee => employee.firstName === firstName)