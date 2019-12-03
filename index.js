// Your code here
function createEmployeeRecord(array) {
    let employee = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employee
}

function createEmployeeRecords(arrayOfArrays) {
    const recordArray = []
    arrayOfArrays.forEach(array => recordArray.push(createEmployeeRecord(array)))
    return recordArray
}

function createTimeInEvent(record, timeString) {
    let [date, hour] = timeString.split(' ')
    record.timeInEvents.push({
        type: 'TimeIn',
        hour: parseInt(hour, 10),
        date,
    })
    return record
}

function createTimeOutEvent(record, timeString) {
    let [date, hour] = timeString.split(' ')
    record.timeOutEvents.push({
        type: 'TimeOut',
        hour: parseInt(hour, 10),
        date,
    })
    return record
}

function hoursWorkedOnDate(record, dateString) {
    let inEvent = record.timeInEvents.find(timeIn => timeIn.date === dateString)
    let outEvent = record.timeOutEvents.find(timeOut => timeOut.date === dateString)
    return (outEvent.hour - inEvent.hour) / 100
}

function wagesEarnedOnDate(record, date) {
    return hoursWorkedOnDate(record, date) * record.payPerHour
}

function allWagesFor(record) {
    let dates = record.timeInEvents.map(timeIn => timeIn.date)
    let payment = dates.reduce(function(memo, d) {
        return memo + wagesEarnedOnDate(record, d)
    }, 0)
    return payment
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(employee => employee.firstName === firstName)
}

function calculatePayroll(recordArray) {
    return recordArray.reduce(function(memo, employee) {
        return memo + allWagesFor(employee)
    }, 0)
}