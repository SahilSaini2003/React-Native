import React, { createContext, useContext, ReactNode, useState } from 'react';
import _ from 'underscore';

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
}

const DataContext = createContext<DataContextProps | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    // let id = 1;
    let [id, setId] = useState(8);
    
    let [mainData, setMainData] = useState<mainType[]>([{ 'id': 1, 'amount': 1200, 'title': 'Bus Fair', 'description': 'We live in an age of science. Science has made uss', 'type': 'CREDIT', 'date': '2023-01-08 12:23:50', 'dateDay': '08', 'dateMonth': '01', 'dateMonthString': 'January' , 'dateYear': '2023', 'dateHour': '12', 'dateMinute': '23', 'dateSecond': '50' },
    { 'id': 2, 'amount': 800, 'title': 'Bought Cloth', 'description': 'We live in an age of science. Science has made us civilized. Every progress in human civilization is', 'type': 'CREDIT', 'date': '2023-11-10 13:23:50', 'dateDay': '10', 'dateMonth': '11', 'dateMonthString': 'November', 'dateYear': '2023', 'dateHour': '13', 'dateMinute': '23', 'dateSecond': '50' },
    { 'id': 3, 'amount': 500, 'title': 'QQQQQQQQQQQQQQQ', 'description': 'Bought Dell Mouse', 'type': 'DEBIT', 'date': '2022-12-13 12:24:50', 'dateDay': '13', 'dateMonth': '12','dateMonthString': 'December', 'dateYear': '2022', 'dateHour': '12', 'dateMinute': '24', 'dateSecond': '50' },
    { 'id': 4, 'amount': 10000000, 'title': 'Cap', 'description': 'We live in an age of science. Science has made us civilized. Every progress in human civilization is the gift of science. Science has solved our probl', 'type': 'DEBIT', 'date': '2022-10-15 12:23:59', 'dateDay': '15', 'dateMonth': '10', 'dateMonthString': 'October', 'dateYear': '2022', 'dateHour': '12', 'dateMinute': '23', 'dateSecond': '59' },
    { 'id': 5, 'amount': 10000000, 'title': 'Cap', 'description': 'We live in an age of science. Science has made us civilized. Every progress in human civilization is the gift of science. Science has solved our probl', 'type': 'DEBIT', 'date': '2020-12-01 05:23:50', 'dateDay': '01', 'dateMonth': '12', 'dateMonthString': 'December', 'dateYear': '2020', 'dateHour': '05', 'dateMinute': '23', 'dateSecond': '50' },
    { 'id': 6, 'amount': 10000000, 'title': 'Cap', 'description': 'We live in an age of science. Science has made us civilized. Every progress in human civilization is the gift of science. Science has solved our probl', 'type': 'DEBIT', 'date': '2022-08-10 17:23:50', 'dateDay': '10', 'dateMonth': '08', 'dateMonthString': 'August', 'dateYear': '2022', 'dateHour': '17', 'dateMinute': '23', 'dateSecond': '50' },
    { 'id': 7, 'amount': 10000000, 'title': 'Cap', 'description': null, 'type': 'DEBIT', 'date': '2020-10-15 13:23:50', 'dateDay': '15', 'dateMonth': '10', 'dateMonthString': 'October', 'dateYear': '2020', 'dateHour': '13', 'dateMinute': '23', 'dateSecond': '50' }
    ]);

    const insertData = (amount: number, title: string, description: string | null, type: string, date: string, dateDay: string, dateMonth: string, dateMonthString: string, dateYear: string, dateHour: string, dateMinute: string, dateSecond: string) => {
        let newData = { 'id': id, 'amount': amount, 'title': title, 'description': description, 'type': type, 'date': date, 'dateDay': dateDay, 'dateMonth': dateMonth, 'dateMonthString': dateMonthString, 'dateYear': dateYear, 'dateHour': dateHour, 'dateMinute': dateMinute, 'dateSecond': dateSecond};
        let data :mainType[] = [...mainData, newData];
        setId(id + 1);
        data.sort((a: mainType, b: mainType) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateA.getTime() - dateB.getTime();
        });
        console.log(data);
        
        setMainData(data.reverse());
    };

    const deleteData = (id: number) => {
        let newData = mainData.filter((item) => {
            return item.id != id;
          })
          setMainData(newData);
    };

    return (
        <DataContext.Provider value={{ mainData, insertData, deleteData }}>
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
