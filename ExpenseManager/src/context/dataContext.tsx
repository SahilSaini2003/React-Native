import React, { createContext, useContext, ReactNode, useState } from 'react';

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

    let id = 5;
    // let id = 1;

    let [mainData, setMainData] = useState<mainType[]>([{ 'id': 1, 'amount': 1200, 'title': 'Bus Fair', 'description': 'We live in an age of science. Science has made uss', 'type': 'Credit', 'date': '08-11-2023', 'dateDay': '08', 'dateMonth': '11', 'dateYear': '2023' },
    { 'id': 2, 'amount': 800, 'title': 'Bought Cloth', 'description': 'We live in an age of science. Science has made us civilized. Every progress in human civilization is', 'type': 'Credit', 'date': '10-11-2023', 'dateDay': '10', 'dateMonth': '11', 'dateYear': '2023' },
    { 'id': 3, 'amount': 500, 'title': 'QQQQQQQQQQQQQQQ', 'description': 'Bought Dell Mouse', 'type': 'Debit', 'date': '13-12-2023', 'dateDay': '13', 'dateMonth': '12', 'dateYear': '2023' },
    { 'id': 4, 'amount': 10000000, 'title': 'Cap', 'description': 'We live in an age of science. Science has made us civilized. Every progress in human civilization is the gift of science. Science has solved our probl', 'type': 'Debit', 'date': '15-08-2023', 'dateDay': '15', 'dateMonth': '08', 'dateYear': '2023' }]);

    const insertData = (amount: number, title: string, description: string | null, type: string, date: string, dateDay: string, dateMonth: string, dateYear: string) => {
        let newData = { 'id': id++, 'amount': amount, 'title': title, 'description': description, 'type': type, 'date': date, 'dateDay': dateDay, 'dateMonth': dateMonth, 'dateYear': dateYear };
        setMainData([...mainData, newData]);
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
