import Sidebar from '@/Components/Sidebar';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import FeedDialog from './FeedDialog';
import { PencilSquareIcon } from '@heroicons/react/24/solid';

interface Props {
    feeds: App.Data.FeedData[]
}

export default function FeedBar({feeds}: Props) {

    let [ selectedFeed, setSelectedFeed ] = useState(feeds.filter(feed => feed.selected === true)[0] || null)
    let [ editFeed, setEditFeed ] = useState(null)
    let [ dialogOpen, setDialogOpen ] = useState(false)

    const closeDialog = () => setDialogOpen(false)
    const openDialong = () => setDialogOpen(true)

    return (
            <div className="mx-auto w-full">
                <div className="flex gap-6 justify-center items-center overflow-hidden bg-white shadow-sm dark:bg-gray-800">

                    {/* Selected feed */}
                    { selectedFeed &&
                        <div className='relative group rounded overflow-hidden'>
                            <div className="absolute inset-0 group-hover:bg-gray-200/50 group-hover:dark:bg-gray-700/50 group-hover:backdrop-blur-sm group-hover:bg-opacity-50 transition-all duration-200 z-10" />
                            <div className="flex flex-col p-6 items-center relative" >
                                <img
                                    src="https://via.placeholder.com/150"//{selectedFeed.imageUrl}
                                    className="w-20 h-20 rounded-full mx-auto mb-2"
                                />
                                <p className='text-lg font-bold text-gray-900 dark:text-gray-100'>{selectedFeed.name}</p>
                            </div>
                            <div className="flex flex-col gap-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-2 py-1 text-sm text-white rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20">
                                <button className='bg-gray-900 hover:bg-gray-600 px-4 py-2 rounded-lg' onClick={() => console.log('')}>Edit</button>
                            </div>
                        </div>
                    }

                    {/* Other feeds */}
                    {feeds.map(feed => (
                        !feed.selected &&
                        <div key={feed.id} className='relative group rounded overflow-hidden'>
                            <div className="absolute inset-0 group-hover:bg-gray-200/50 group-hover:dark:bg-gray-700/50 group-hover:backdrop-blur-sm group-hover:bg-opacity-50 transition-all duration-200 z-10" />
                            <div className="flex flex-col p-6 items-center relative" >
                                <img
                                    src="https://via.placeholder.com/150"//{selectedFeed.imageUrl}
                                    className="w-16 h-16 rounded-full mx-auto mb-2"
                                />
                                <p className='text-gray-900 dark:text-gray-100'>{feed.name}</p>
                            </div>
                            <div className="flex flex-col gap-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-2 py-1 text-sm text-white rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20">
                                <button className='bg-gray-900 hover:bg-gray-600 px-4 py-2 rounded-lg' onClick={() => console.log('')}>Select</button>
                                <button className='bg-gray-900 hover:bg-gray-600 px-4 py-2 rounded-lg' onClick={() => console.log('')}>Edit</button>
                            </div>
                        </div>
                    ))}

                    {/* Add feed */}
                    <Button onClick={() => {setEditFeed(null); openDialong()}} className="flex flex-col p-6 items-center hover:bg-gray-200 dark:hover:bg-gray-700 rounded rounded" >
                        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-600 rounded-full mx-auto mb-2 flex items-center justify-center">
                            <p className='text-3xl text-gray-400'>+</p>
                        </div>
                        <p className='text-gray-900 dark:text-gray-100'>Add feed</p>
                    </Button>

                    {/* Add/edit feed dialog */}
                    <FeedDialog isOpen={dialogOpen} closeDialog={closeDialog} feed={editFeed} />

                </div>
            </div>
    );
}
