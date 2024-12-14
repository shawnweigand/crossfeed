import Sidebar from '@/Components/Sidebar';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import FeedDialog from './FeedDialog';

interface Props {
    feeds: App.Data.FeedData[]
}

export default function FeedBar({feeds}: Props) {

    let [ selectedFeed, setSelectedFeed ] = useState(feeds.filter(feed => feed.selected === true)[0] || null)
    let [ editFeed, setEditFeed ] = useState(null)
    let [ dialogOpen, setDialogOpen ] = useState(false)
    let [ mode, setMode ] = useState('Add') // Add or Edit

    const closeDialog = () => setDialogOpen(false)
    const openDialong = () => setDialogOpen(true)

    return (
            <div className="mx-auto w-full">
                <div className="flex gap-6 justify-center items-center overflow-hidden bg-white shadow-sm dark:bg-gray-800">

                    {/* Selected feed */}
                    { selectedFeed &&
                        <div className="flex flex-col p-6 items-center hover:bg-gray-200 dark:hover:bg-gray-700 rounded" >
                            <img
                                src="https://via.placeholder.com/150"//{selectedFeed.imageUrl}
                                className="w-20 h-20 rounded-full mx-auto mb-2"
                            />
                            <p className='text-lg font-bold text-gray-900 dark:text-gray-100'>{selectedFeed.name}</p>
                        </div>
                    }

                    {/* Other feeds */}
                    {feeds.map(feed => (
                        !feed.selected &&
                        <div className="flex flex-col p-6 items-center hover:bg-gray-200 dark:hover:bg-gray-700 rounded rounded" key={feed.id}>
                            <img
                                src="https://via.placeholder.com/150"//{selectedFeed.imageUrl}
                                className="w-16 h-16 rounded-full mx-auto mb-2"
                            />
                            <p className='text-gray-900 dark:text-gray-100'>{feed.name}</p>
                        </div>
                    ))}

                    {/* Add feed */}
                    <Button onClick={() => {setEditFeed(null); openDialong(); setMode('Add')}} className="flex flex-col p-6 items-center hover:bg-gray-200 dark:hover:bg-gray-700 rounded rounded" >
                        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-600 rounded-full mx-auto mb-2 flex items-center justify-center">
                            <p className='text-3xl text-gray-400'>+</p>
                        </div>
                        <p className='text-gray-900 dark:text-gray-100'>Add feed</p>
                    </Button>

                    {/* Add/edit feed dialog */}
                    <FeedDialog isOpen={dialogOpen} closeDialog={closeDialog} feed={editFeed} mode={mode} />

                </div>
            </div>
    );
}
