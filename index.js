function createEmployeeRecord(element) {
    return {
        firstName: element[0],
        familyName: element[1],
        title: element[2],
        payPerHour: element[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(empArray) {
    return empArray.map(createEmployeeRecord)
}

function createTimeInEvent(record, time) {
    let [date, hour] = time.split(' ')
    let timeIn = {
        type: 'TimeIn',
        date: date,
        hour: parseInt(hour)
    }   
    record.timeInEvents.push(timeIn) 
    return record
}

function createTimeOutEvent(record, time) {
    let [date, hour] = time.split(' ')
    let timeOut = {
        type: 'TimeOut',
        date: date,
        hour: parseInt(hour)
    }   
    record.timeOutEvents.push(timeOut) 
    return record
}

function hoursWorkedOnDate(record, date) {
    let inEvent = record.timeInEvents.find(function(event) {
       return event.date === date
    })
    let outEvent = record.timeOutEvents.find(function(event){
      return  event.date === date
    })

    return (outEvent.hour - inEvent.hour)/100
}

function wagesEarnedOnDate(record, date) {
    let hours = hoursWorkedOnDate(record, date)

    return (hours * record.payPerHour)
}

function allWagesFor(record) { 
    let allDates = record.timeInEvents.map(function(e) {return e.date})
    let wages = allDates.reduce(function(memo, date){
       return (memo + wagesEarnedOnDate(record, date))
    }, 0)
    return wages
}

function calculatePayroll(employees) {
    let allWages = employees.map(function(e) {return allWagesFor(e)})
    return allWages.reduce(function(memo, wage) {
        return (memo + wage)
    }, 0)
}

function findEmployeeByFirstName(src, name) {
    let employee = src.find(function(e) {
        return e.firstName === name
    })
    return employee
}