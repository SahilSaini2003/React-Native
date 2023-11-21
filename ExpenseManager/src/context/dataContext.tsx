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
    dateYear: string
}

interface DataContextProps {
    mainData: mainType[];
    insertData: (amount: number, title: string, description: string | null, type: string, date: string, dateDay: string, dateMonth: string, dateYear: string) => void;
    deleteData: (id: number) => void;
}

const DataContext = createContext<DataContextProps | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    // let id = 1;
    let [id, setId] = useState(8);
    
    let [mainData, setMainData] = useState<mainType[]>([{ 'id': 1, 'amount': 1200, 'title': 'Bus Fair', 'description': 'We live in an age of science. Science has made uss', 'type': 'Credit', 'date': '2023-11-08 12:23:50', 'dateDay': '08', 'dateMonth': '01', 'dateYear': '2023' },
    { 'id': 2, 'amount': 800, 'title': 'Bought Cloth', 'description': 'We live in an age of science. Science has made us civilized. Every progress in human civilization is', 'type': 'Credit', 'date': '2023-11-08 13:23:50', 'dateDay': '10', 'dateMonth': '11', 'dateYear': '2023' },
    { 'id': 3, 'amount': 500, 'title': 'QQQQQQQQQQQQQQQ', 'description': 'Bought Dell Mouse', 'type': 'Debit', 'date': '2023-11-08 12:24:50', 'dateDay': '13', 'dateMonth': '12', 'dateYear': '2023' },
    { 'id': 4, 'amount': 10000000, 'title': 'Cap', 'description': 'We live in an age of science. Science has made us civilized. Every progress in human civilization is the gift of science. Science has solved our probl', 'type': 'Debit', 'date': '2023-11-08 12:23:59', 'dateDay': '15', 'dateMonth': '10', 'dateYear': '2022' },
    { 'id': 5, 'amount': 10000000, 'title': 'Cap', 'description': 'We live in an age of science. Science has made us civilized. Every progress in human civilization is the gift of science. Science has solved our probl', 'type': 'Debit', 'date': '2023-11-08 05:23:50', 'dateDay': '01', 'dateMonth': '12', 'dateYear': '2020' },
    { 'id': 6, 'amount': 10000000, 'title': 'Cap', 'description': 'We live in an age of science. Science has made us civilized. Every progress in human civilization is the gift of science. Science has solved our probl', 'type': 'Debit', 'date': '2023-11-08 17:23:50', 'dateDay': '10', 'dateMonth': '08', 'dateYear': '2022' },
    { 'id': 7, 'amount': 10000000, 'title': 'Cap', 'description': null, 'type': 'Debit', 'date': '2023-11-08 13:23:50', 'dateDay': '15', 'dateMonth': '10', 'dateYear': '2020' }
    ]);

    const insertData = (amount: number, title: string, description: string | null, type: string, date: string, dateDay: string, dateMonth: string, dateYear: string) => {
        let newData = { 'id': id, 'amount': amount, 'title': title, 'description': description, 'type': type, 'date': date, 'dateDay': dateDay, 'dateMonth': dateMonth, 'dateYear': dateYear };
        let data :mainType[] = [...mainData, newData];
        setId(id + 1);
        data.sort((a: mainType, b: mainType) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateA.getTime() - dateB.getTime();
        });
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
