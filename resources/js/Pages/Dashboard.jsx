import React from 'react';
import ClaimList from '../components/ClaimList';
import NavigationMenu from '../Components/NavigationMenu';
import { Head } from '@inertiajs/react'


function Dashboard() {
    return (
        <div>
            <Head title="Dashboard"/>
            <NavigationMenu />
            <br/>
            <ClaimList />
        </div>
    );
}

export default Dashboard;
