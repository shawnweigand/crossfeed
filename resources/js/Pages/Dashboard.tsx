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
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <Posts feed={feeds.find(feed => feed.selected)}/>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
