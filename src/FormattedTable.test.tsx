import {ColumnDefinitionType} from "./ColumnDefinitionType";
import {render, screen} from "@testing-library/react";
import React from "react";
import FormattedTable from "./FormattedTable";

interface Cat {
    name: string;
    age: number;
    gender: string;
    color: string;
    activityLevel?: string; // optional, same as string | undefined
    favoriteFood?: string;  // optional, same as string | undefined
}

const data: Cat[] = [
    {
        name: 'Mittens',
        color: 'black',
        age: 2,
        gender: 'female',
        activityLevel: 'hight',
        favoriteFood: 'milk'
    },
    {
        name: 'Mons',
        color: 'grey',
        age: 2,
        gender: 'male',
        favoriteFood: 'old socks',
        activityLevel: 'medium'
    },
    {
        name: 'Luna',
        color: 'black',
        age: 2,
        gender: 'female',
        activityLevel: 'medium',
        favoriteFood: 'fish'
    },
    {
        name: 'Bella',
        color: 'grey',
        age: 1,
        gender: 'female',
        activityLevel: 'high',
        favoriteFood: 'mice'
    },
    {
        name: 'Oliver',
        color: 'orange',
        age: 1,
        gender: 'male',
        activityLevel: 'low',
        favoriteFood: 'fish'
    }
]

const columns: ColumnDefinitionType<Cat, keyof Cat>[] = [
    {
        key: 'name',
        header: 'Name',
        width: 150
    },
    {
        key: 'age',
        header: 'Age in years',
        width: 30
    },
    {
        key: 'color',
        header: 'Color'
    }
]

it('renders without crashing', async () => {
    render(<FormattedTable data={data} columns={columns}/>);
    // table column header
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Age in years')).toBeInTheDocument();
    expect(screen.getByText('Color')).toBeInTheDocument();
    //! \todo more expect()
})
