
// Your code here
let createEmployeeRecord = function (info) {
    return {
        firstName: info[0],
        familyName: info[1],
        title: info[2],
        payPerHour: info[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployees = function (employeeInfo) {
    return employeeInfo.map(function (info) {
        return createEmployeeRecord(info)
    })
}

let createTimeInEvent = (function (employeeRecord, dateStamp) {
    let [date, hour] = dateStamp.split(' ')

    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })
    return employeeRecord
})

let createTimeOutEvent = function (employeeRecord, dateStamp) {
    let [date, hour] = dateStamp.split(" ")

    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })
    return employeeRecord
}

let hoursWorkedOnDate = function (employeeRecord, dateRecord) {
    let inEvent = employeeRecord.timeInEvents.find(function (e) {
        return e.date === dateRecord
    })
    let outEvent = employeeRecord.timeOutEvents.find(function (e) {
        return e.date === dateRecord
    })
    return (outEvent.hour - inEvent.hour) / 100
}

let wagesEarnedOnDate = function (employeeRecord, dateRecord) {
    let wage = hoursWorkedOnDate(employeeRecord, dateRecord) * employeeRecord.payPerHour
    return wage
}

let allWagesFor = function (employeeRecord) {
    let datesWorked = employeeRecord.timeInEvents.map(function (e) {
        return e.date
    })

    let allPay = datesWorked.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate(employeeRecord, d)
    }, 0)

    return allPay
}

let createEmployeeRecords = function (info) {
    return info.map(function (info) {
        return createEmployeeRecord(info)
    })
}

let calculatePayroll = function (allEmployeeRecords) {
    return allEmployeeRecords.reduce(function (mem, rec) {
        return mem + allWagesFor(rec)
    }, 0)
}

let findEmployeeByFirstName = function(srcArray, firstName) {
    return srcArray.find(function(rec){
      return rec.firstName === firstName
    })
  }