//"All Brokers - Static" is the page this starting the vlookup on
//"CompanyID" is which field it is searching
let mainTable = base.getTable("All Brokers - Static");
let mainTableRecords = await mainTable.selectRecordsAsync({fields:["CompanyID"]});

//Substitute "2021 Survey" for table which contains range to search in
//Substitute "2020 Volume" for the value you want to pull over to main table
let lookupTable = base.getTable("2021 Survey");
let lookupRangeRecords = await lookupTable.selectRecordsAsync({fields:["CompanyID","2020 Volume"]});

//Always leave "CompanyID". This is the value to look up by
for (let record of mainTableRecords.records) {
     let lookupValue = record.getCellValue("CompanyID");

    //Replace "2020 Volume" with columnn name which value should be returned
    for (let rangeRecord of lookupRangeRecords.records) {
        if (rangeRecord.getCellValue("CompanyID") == lookupValue) {
            let returnValue = rangeRecord.getCellValue("2020 Volume");

            //Replace "2020 Volume" with column name from mainTable which should contain the link
            await mainTable.updateRecordAsync(record, {
                "2020 Volume": returnValue
            });
       }
    }
}
