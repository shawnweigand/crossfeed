import Sidebar from '@/Components/Sidebar';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import FeedBar from './Partials/FeedBar';
import Posts from './Partials/Posts';

interface Props {
    feeds: App.Data.FeedData[]
}

export default function Dashboard({feeds}: Props) {

    // get recent posts by all types ordered by date

    return (
        <AuthenticatedLayout
            // header={
            //     <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
            //         Dashboard
            //     </h2>
            // }
        >
            <Head title="Dashboard" />

            <FeedBar feeds={feeds} />

            <div className="py-12">
                    <Posts feed={feeds.find(feed => feed.selected) as App.Data.FeedData}/>
            </div>
        </AuthenticatedLayout>
    );
}
