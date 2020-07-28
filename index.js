const Papa = require('papaparse')
const fs = require('fs');


let checksArray = []
let schedulesArray = []
let scheduleObjects = []
let checkObjects = []
const masterScheds = {}

const checkCount = {}
let duplicateSchedules = 0

async function getData(){ 
    const {checkData, scheduleData} = await getFiles()
    checksArray = checkData.fileData.split('\n')
    schedulesArray = scheduleData.fileData.split('\n')
    
    formatCheckData(checksArray)
    formatScheduleData(schedulesArray)    

    attachChecksToSchedules()
}
  

async function getFiles(){
    const checkFile = await getFileData('./csvs/checkfile_for_node_test.csv')
    const scheduleFile = await getFileData('./csvs/schedules_for_node_test.csv')

    return {checkData: checkFile, scheduleData: scheduleFile}
}

async function getFileData(file){ 
    const readFile = new Promise( (res, rej) => {
        fs.readFile(file, {encoding: 'utf-8'}, (err, data) =>{
            if(err) rej(err)
            res({fileData: data})
        })
    })

    readFile.catch((error) => {
        console.error(error);   
    });

      return readFile
}


function formatScheduleData(){
    for(let i=0; i < schedulesArray.length; i++){
        const current = schedulesArray[i].split(',')
        const scheduleObject = {}
        scheduleObject.deal = current[0]
        scheduleObject.week = current[3]
        scheduleObject.longform = current[4]
        scheduleObject.rate = current[5]
        scheduleObject.status = current[6]
        const key = scheduleObject.week + ' ' + scheduleObject.longform
        scheduleObject.checks = []
        if(masterScheds[key] !== undefined){
            console.log('duplicate schedules: ', scheduleObject)
            duplicateSchedules += 1
        } else {
            masterScheds[key] = scheduleObject
        }
        // console.log(scheduleObject)
        scheduleObjects.push(scheduleObject)
    }
}

function formatCheckData(){
    for(let i=0; i < checksArray.length; i++){
        const current = checksArray[i].split(',')
        const checkObject = {}
        // console.log(current)
        checkObject.week = current[3]
        checkObject.longform = `A-${current[4].trim().slice(1,5)}`
        checkObject.rate = current[7].trim().slice(1)
            if(checkObject.rate.includes('(')) checkObject.rate = `-${checkObject.rate.slice(1, checkObject.rate.length -1)}`
        checkObject.checknum = current[6].trim().slice(1)
        checkObject.checkdate = current[8].trim().slice(1)
        checkObject.debitcheck = current[9].trim().slice(1)
        checkObject.debitdate = current[10].trim().slice(1)
        // console.log(checkObject)

        checkObjects.push(checkObject)
    }
}


function attachChecksToSchedules(){
    let found = 0

    for(let i = 0; i < checkObjects.length; i++){
        const currentCheck = checkObjects[i]
        // console.log(masterScheds)
        const schedKey = currentCheck.week.slice(1, currentCheck.week.length-2).split('-').join('/')+ ' ' + currentCheck.longform
        console.log('key: ', schedKey)
        // '4/15/20 A-3:30'
        // '4-16-20 A-3:00'
        console.log('sched keys', Object.keys(masterScheds))
        const schedule = masterScheds[schedKey]
        if(schedule){
            schedule.checks.push(currentCheck)
            found+=1
        } 
    }

    for(key in masterScheds){
        let curr = masterScheds[key]
        let checkLength = curr.checks.length 
        checkCount[checkLength] = checkCount[checkLength] + 1  ||  1
        if(checkLength >= 3) {
            console.log()
            console.log(curr)
        }
    }

    console.log(found)
    console.log(duplicateSchedules)
    console.log(checkCount)

    

}

getData()


