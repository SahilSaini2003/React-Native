import React, { createContext, useContext, ReactNode, useState } from 'react';
import _ from 'underscore';
import { Alert } from 'react-native';
import moment from 'moment-timezone';

interface mainType {
    id: number,
    amount: number,
    title: string,
    description: string | null,
    type: string, date: string,
    dateDay: string,
    dateMonth: string,
    dateMonthString: string,
    dateYear: string,
    dateHour: string,
    dateMinute: string,
    dateSecond: string
}

interface DataContextProps {
    mainData: mainType[];
    insertData: (amount: number, title: string, description: string | null, type: string, date: string, dateDay: string, dateMonth: string, dateMonthString: string, dateYear: string, dateHour: string, dateMinute: string, dateSecond: string) => void;
    deleteData: (id: number) => void;
    verifyData: (amount: number, title: string, description: string | null, type: string, date: string, taskId: number, dataId: number) => string | undefined;
    manageAdvancedData: (timeLine: string, year1: string, month1: string, date1: string) => void;
    year1Data: String[];
    month1Data: String[];
    type1Data: String[];
}

const DataContext = createContext<DataContextProps | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    // let id = 1;
    let [id, setId] = useState(9);

    let [mainData, setMainData] = useState<mainType[]>([{"amount": 500, "date": "2023-12-08 10:33:12", "dateDay": "08", "dateHour": "10", "dateMinute": "33", "dateMonth": "12", "dateMonthString": "December", "dateSecond": "12", "dateYear": "2023", "description": "Delhi To Jaipur", "id": 8, "title": "Train Fair", "type": "CREDIT"}, {"amount": 800, "date": "2023-11-10 13:23:50", "dateDay": "10", "dateHour": "13", "dateMinute": "23", "dateMonth": "11", "dateMonthString": "November", "dateSecond": "50", "dateYear": "2023", "description": "We live in an age of science. Science has made us civilized. Every progress in human civilization is", "id": 2, "title": "Bought Cloth", "type": "CREDIT"}, {"amount": 1200, "date": "2023-01-08 12:23:50", "dateDay": "08", "dateHour": "12", "dateMinute": "23", "dateMonth": "01", "dateMonthString": "January", "dateSecond": "50", "dateYear": "2023", "description": "We live in an age of science. Science has made uss", "id": 1, 
    "title": "Bus Fair", "type": "CREDIT"}, {"amount": 500, "date": "2022-12-13 12:24:50", "dateDay": "13", "dateHour": "12", "dateMinute": "24", "dateMonth": "12", "dateMonthString": "December", "dateSecond": "50", "dateYear": "2022", "description": "Bought Dell Mouse", "id": 3, "title": "QQQQQQQQQQQQQQQ", "type": "DEBIT"}, {"amount": 1000, "date": "2022-10-15 12:23:59", "dateDay": "15", "dateHour": "12", "dateMinute": "23", "dateMonth": "10", "dateMonthString": "October", "dateSecond": "59", "dateYear": "2022", "description": "We live in an age of science. Science has made us civilized. Every progress in human civilization is the gift of science. Science has solved our probl", "id": 4, "title": "Cap", "type": "DEBIT"}, {"amount": 20000, "date": "2022-08-10 17:23:50", "dateDay": "10", "dateHour": "17", "dateMinute": "23", "dateMonth": "08", "dateMonthString": "August", "dateSecond": "50", "dateYear": 
    "2022", "description": "We live in an age of science. Science has made us civilized. Every progress in human civilization is the gift of science. Science has solved our probl", "id": 6, "title": "Cap", "type": "CREDIT"}, {"amount": 12000, "date": "2020-12-01 05:23:50", "dateDay": "01", "dateHour": "05", "dateMinute": "23", "dateMonth": "12", "dateMonthString": "December", "dateSecond": "50", "dateYear": "2020", "description": "We live in an age of science. Science has made us civilized. Every progress in human civilization is the gift of science. Science has solved our probl", "id": 5, "title": "Cap", "type": "DEBIT"}, {"amount": 6000, "date": "2020-10-15 13:23:50", "dateDay": "15", "dateHour": "13", "dateMinute": "23", "dateMonth": "10", "dateMonthString": "October", "dateSecond": "50", "dateYear": "2020", "description": null, "id": 7, "title": "Cap", "type": "CREDIT"}]);
    
    let sortData = (data: mainType[]) => {
        let dummy = data;
        dummy.sort((a: mainType, b: mainType) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateA.getTime() - dateB.getTime();
        });
        return dummy;
    }

    const insertData = (amount: number, title: string, description: string | null, type: string, date: string, dateDay: string, dateMonth: string, dateMonthString: string, dateYear: string, dateHour: string, dateMinute: string, dateSecond: string) => {
        let newData = { 'id': id, 'amount': amount, 'title': title, 'description': description, 'type': type, 'date': date, 'dateDay': dateDay, 'dateMonth': dateMonth, 'dateMonthString': dateMonthString, 'dateYear': dateYear, 'dateHour': dateHour, 'dateMinute': dateMinute, 'dateSecond': dateSecond };
        let data: mainType[] = [...mainData, newData];
        setId(id + 1);
        data = sortData(data);
        // console.log(data.reverse());
        setMainData(data.reverse());
        setYear1Data(Object.keys(_.groupBy(data, 'dateYear')));
        setMonth1Data(Object.keys(_.groupBy(data, 'dateMonthString')));
        let tType = Object.keys(_.groupBy(data, 'type'));
        if (tType.length == 2) {
            setType1Data(['Both',...tType]);
        }
        else setType1Data(tType);
        // setDay1Data(Object.keys(_.groupBy(data, 'dateDay')));

    };

    const deleteData = (id: number) => {
        let newData = mainData.filter((item) => {
            return item.id != id;
        })
        setMainData(newData);
        return 'success';
    };

    let updateData = (id: number, amount: number, title: string, description: string | null, type: string, date: string, dateDay: string, dateMonth: string, dateMonthString: string, dateYear: string, dateHour: string, dateMinute: string, dateSecond: string) => {
        let dataToBeUpdated: any = _.filter(mainData, (data: mainType) => {
            return data.id == id;
        })
        dataToBeUpdated[0].amount = amount;
        dataToBeUpdated[0].title = title;
        dataToBeUpdated[0].description = description;
        dataToBeUpdated[0].type = type;
        dataToBeUpdated[0].date = date;
        dataToBeUpdated[0].dateDay = dateDay;
        dataToBeUpdated[0].dateMonth = dateMonth;
        dataToBeUpdated[0].dateMonthString = dateMonthString;
        dataToBeUpdated[0].dateYear = dateYear;
        dataToBeUpdated[0].dateHour = dateHour;
        dataToBeUpdated[0].dateMinute = dateMinute;
        dataToBeUpdated[0].dateSecond = dateSecond;
        let data = sortData(mainData);
        // console.log(data)
        setMainData(data.reverse());

    }

    let verifyData = (amount: number, title: string, description: string | null = null, type: string, date: string, taskId: number, dataId: number) => {
        if (!date) {
            Alert.alert('Invalid Date!', 'Date Required!', [{ text: 'Okay!' },]);
            return;
        }
        const dateTimeParts = date.split(' ');
        const dateParts = dateTimeParts[0].split('-');
        const timePart = dateTimeParts[1].split(':');
        let year: any = dateParts[0] != undefined && dateParts[0] != null ? dateParts[0] : [];
        let month: any = dateParts[1] != undefined && dateParts[1] != null ? dateParts[1] : [];
        let textMonth: any = new Date(date).toLocaleString('en-US', { month: 'long' });
        let day: any = dateParts[2] != undefined && dateParts[2] != null ? dateParts[2] : [];
        let hour: any = timePart[0] != undefined && timePart[0] != null ? timePart[0] : [];
        let minute: any = timePart[1] != undefined && timePart[1] != null ? timePart[1] : [];
        let second: any = timePart[2] != undefined && timePart[2] != null ? timePart[2] : [];
        if (year.length != 4 || month.length != 2 || day.length != 2 || hour.length != 2 || minute.length != 2 || second.length != 2) {
            Alert.alert('Invalid Date!', `Please Enter a valid Date! \n\t\t\tFormat(YYYY-MM-DD hh-mm-ss) \n\t\t\tExample :- ${moment.tz(moment(), 'Asia/Kolkata').format('YYYY-MM-DD hh:mm:ss')}`, [{ text: 'Okay!' },]);
            return;
        }
        if (month > 12 || month < 1) {
            Alert.alert('Invalid Month!', 'We only have 1 to 12 Months in a Year!', [{ text: 'Okay!' },]);
            return;
        }
        if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
            if (day > 31) {
                let dummyDate = new Date(date);
                dummyDate.setMonth(month - 1);
                Alert.alert('Invalid Date!', `We only have 31 Days in ${dummyDate.toLocaleString('en-US', { month: 'long' })} Month!`, [{ text: 'Okay!' },]);
                return;
            }
        }
        if (month == 2) {
            let dummyDate = new Date(date);
            dummyDate.setMonth(month - 1);
            if (year % 4 == 0 && day > 29) {
                Alert.alert('Invalid Date!', `We only have 29 Days in ${dummyDate.toLocaleString('en-US', { month: 'long' })}/${year}!`, [{ text: 'Okay!' },]);
                return;
            }
            if (year % 4 != 0 && day > 28) {
                Alert.alert('Invalid Date!', `We only have 28 Days in ${dummyDate.toLocaleString('en-US', { month: 'long' })}/${year}!`, [{ text: 'Okay!' },]);
                return;
            }
        }
        if (month == 4 || month == 6 || month == 9 || month == 11) {
            if (day > 30) {
                let dummyDate = new Date(date);
                dummyDate.setMonth(month - 1);
                Alert.alert('Invalid Date!', `We only have 30 Days in ${dummyDate.toLocaleString('en-US', { month: 'long' })} Month!`, [{ text: 'Okay!' },]);
                return;
            }
        }
        if (hour > 24) {
            Alert.alert('Invalid Hour!', 'We only have 24 Hours in a Day!', [{ text: 'Okay!' },]);
            return;
        }
        if (minute > 60) {
            Alert.alert('Invalid Minute!', 'We only have 60 Minutes in a Day!', [{ text: 'Okay!' },]);
            return;
        }
        if (second > 60) {
            Alert.alert('Invalid Second!', 'We only have 60 Seconds in a Day!', [{ text: 'Okay!' },]);
            return;
        }
        if (date > moment.tz(moment(), 'Asia/Kolkata').format('YYYY-MM-DD hh:mm:ss')) {
            Alert.alert('Invalid Date!', 'Sorry! But You can\'t add Future Transactions!', [{ text: 'Okay!' },]);
            return;
        }
        if (date < '2000-01-01 00:00:00') {
            Alert.alert('Invalid Date!', 'Sorry! We only allow Transaction Till 2000-01-01 00:00:00', [{ text: 'Okay!' },]);
            return;
        }
        if (!amount) {
            Alert.alert('Invalid Amount!', 'Amount can be of Type Number Only!', [{ text: 'Okay!' },]);
            return;
        }
        if (title.length < 1) {
            Alert.alert('Title Required!', 'Min Length :- 2 & Max Lenght :- 15', [
                { text: 'Okay!' },
            ]);
            return;
        }
        // console.log(type);
        if (taskId == 1) {
            insertData(amount, title, description == undefined ? null : description, type, date, day, month, textMonth, year, hour, minute, second);
            return 'success';
        }
        if (taskId == 2) {
            updateData(dataId, amount, title, description == undefined ? null : description, type, date, day, month, textMonth, year, hour, minute, second);
            return 'success';
        }
    }

    // const [ timeLineData, setTimeLineData] = useState<String>();
    const [ year1Data , setYear1Data] = useState<String[]>([]);
    const [ month1Data , setMonth1Data] = useState<String[]>([]);
    const [ type1Data , setType1Data] = useState<String[]>([]);

    let manageAdvancedData = (timeLine: string = '', year1: string = '', month1: string = '', date1: string = '') => {
        let dateYear = _.groupBy(mainData, 'dateYear');
        if (timeLine != '') {
            let year = Object.keys(dateYear)
            let type = Object.keys(_.groupBy(mainData, 'type'));
            if (type.length == 2) {
                type = ['BOTH',...type];
            }
            return {year, type}
        }
        else if (year1 != '' && month1 != '' && date1 != '') {
            let year = _.groupBy(dateYear[year1], 'dateMonthString');
            let month = _.groupBy(year[month1], 'dateDay');
            let type = Object.keys(_.groupBy(month[date1], 'type'));
            if (type.length == 2) {
                type = ['BOTH',...type];
            }
            return {type};
        }
        else if (year1 != '' && month1 != '' && date1 == '') {
            let year = _.groupBy(dateYear[year1], 'dateMonthString');
            let month = _.groupBy(year[month1], 'dateDay');
            let day = Object.keys(month);
            let type = Object.keys(_.groupBy(year[month1], 'type'));
            if (type.length == 2) {
                type = ['BOTH',...type];
            }
            return {day, type};
        }
        else if (year1 != '' && month1 == '' && date1 == '') {
            let month = Object.keys(_.groupBy(dateYear[year1], 'dateMonthString'));
            let type = Object.keys(_.groupBy(dateYear[year1], 'type'));
            if (type.length == 2) {
                type = ['BOTH',...type];
            }
            return {month, type};
        }
    }

    return (
        <DataContext.Provider value={{ mainData, insertData, deleteData, verifyData, manageAdvancedData, year1Data, month1Data, type1Data }}>
            {children}
        </DataContext.Provider>
    );
};

export const useDataContext = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useDataContext must be used within a DataProvider');
    }
    return context;
};
