import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { ChevronLeftIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';
import { Head, Link } from '@inertiajs/react';
import FollowingsTable from './Partials/FollowingsTable';

interface Props {
    feed: App.Data.FeedData
}

export default function Dashboard({feed}: Props) {

    return (
        <AuthenticatedLayout
            // header={
            //     <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
            //         Dashboard
            //     </h2>
            // }
        >
            <Head title="Feed" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <Link href={route('dashboard')} className='hover:underline underline-offset-4 mb-4 inline-flex gap-2 items-center px-1 pt-1 text-md font-medium leading-5 transition duration-150 ease-in-out focus:outline-none text-gray-500 hover:text-gray-700 focus:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 dark:focus:text-gray-300'>
                        <ChevronLeftIcon className='h-5 w-5'/>
                        <p>Back to Dashboard</p>
                    </Link>
                    <div className='overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800'>
                        <div className="grid grid-cols-3 mb-6">
                            <div className="col-start-2 flex flex-col p-6 items-center relative">
                                <div className="relative group">
                                    {/* Image */}
                                    <img
                                        src="https://via.placeholder.com/150" // {selectedFeed.imageUrl}
                                        alt="Profile"
                                        className="w-32 h-32 rounded-full mx-auto mb-2"
                                    />
                                    {/* Hover Overlay */}
                                    <div className="absolute inset-0 rounded-full bg-gray-200/50 dark:bg-gray-700/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"></div>

                                    {/* Hover Actions */}
                                    <div className="flex flex-col gap-2 absolute inset-0 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20">
                                        <button>
                                            <PencilSquareIcon className="w-10 h-10 text-gray-900 hover:text-gray-600" />
                                        </button>
                                    </div>
                                </div>
                                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-2">{feed.name}</p>
                            </div>
                            <div className='w-full place-self-start items-center'>
                                <button className='flex gap-1 items-center place-self-end p-2 pr-4 bg-red-300 hover:bg-red-200 rounded mt-4 mr-4'>
                                    <TrashIcon className='text-red-500 h-6 w-6'/>
                                    <p className='text-red-600'>Delete</p>
                                </button>
                            </div>
                        </div>
                        <div className='place-self-center mb-6 w-3/4'>
                            <FollowingsTable />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}