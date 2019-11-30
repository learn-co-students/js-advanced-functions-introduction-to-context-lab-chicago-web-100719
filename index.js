// Your code here
const createEmployeeRecord = ([first_name, family_name, title, rate]) =>{
    return {firstName: first_name, familyName: family_name, title: title, payPerHour: rate, timeInEvents: [], timeOutEvents: []}
}

const createEmployeeRecords = (array) => array.map(employee => createEmployeeRecord(employee))

const createTimeInEvent = (employee,stamp) => {
    let [date, hour] = stamp.split(' ')
    employee.timeInEvents.push({
        type : 'TimeIn',
        hour: parseInt(hour,10),
        date: date
    })
    return employee
}

const createTimeOutEvent = (employee,stamp) => {
    let [date,hour] = stamp.split(' ')
    employee.timeOutEvents.push({
        type: 'TimeOut',
        hour: parseInt(hour,10),
        date: date
    })
    return employee
}

const hoursWorkedOnDate = (employee,date) => {
    const timeIn = employee.timeInEvents.find(event => event.date === date)
    const timeOut = employee.timeOutEvents.find(event =>event.date === date )
    return (timeOut.hour - timeIn.hour)/100
}

const wagesEarnedOnDate = (employee,date) =>{
    return parseInt(employee.payPerHour,10) * hoursWorkedOnDate(employee,date)
}

const allWagesFor = employee => {
    const dates = employee.timeInEvents.map(event => event.date)
    let wages = dates.reduce(function(memo,date){return memo + wagesEarnedOnDate(employee,date)},0)
    return wages
}

const calculatePayroll = employees => {
    return employees.reduce(function(memo,record){
        return memo + allWagesFor(record)
    },0)
}

const findEmployeeByFirstName = (srcArray,firstName) => srcArray.find(employee => employee.firstName === firstName)