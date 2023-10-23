import React from 'react';
import ClaimForm from '../Components/ClaimForm';
import NavigationMenu from '../Components/NavigationMenu';
import { Head } from '@inertiajs/react'

function Dashboard() {
    return (
        <div>
            <Head title="New Claim"/>
            <NavigationMenu />
            <ClaimForm />
        </div>
    );
}

export default Dashboard;
