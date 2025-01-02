import Sidebar from '@/Components/Sidebar';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import FeedBar from './Partials/FeedBar';

interface Props {
    feeds: App.Data.FeedData[]
}

export default function Dashboard({feeds}: Props) {

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
                            Selected: {feeds.find(feed => feed.selected).name}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
