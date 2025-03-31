import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { CheckIcon, ChevronLeftIcon, ChevronRightIcon, MagnifyingGlassIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';
import { Head, Link, router, useForm } from '@inertiajs/react';
import FollowingsTable from './Partials/FollowingsTable';
import { Disclosure, DisclosureButton, DisclosurePanel, Input, Popover, PopoverButton, PopoverPanel, Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import SearchChannelDialog from './Partials/SearchChannelDialog';
import { FormEventHandler, useState } from 'react';
import useColor from '@/Utils/useColor';
import ColorGrid from './Partials/ColorGrid';
import axios from 'axios';
import clsx from 'clsx';

interface Props {
    feed: App.Data.FeedData
    channels: App.Data.ChannelData[]
}

export default function Page({ feed, channels }: Props) {

    const [ isOpen, setIsOpen ] = useState(false)

    const closeDialog = () => setIsOpen(false)
    const openDialog = () => setIsOpen(true)
    const [ iconColors, setIconColors ] = useState<{ bg: string, text: string }>(
        useColor({ bg: feed.icon_bg_color, text: feed.icon_text_color })
    )
    const [ selected, setSelected ] = useState<'bg' | 'text'>('bg')

    const { data, setData, put, processing, errors, reset } = useForm({
        name: feed.name
    });

    const onSelect = (color: string) => {
        let colors = useColor({ bg: color, text: color })
        setIconColors(selected === 'bg' ? { bg: colors.bg, text: iconColors.text } : { bg: iconColors.bg, text: colors.text })
        try {
            axios.put(route('feed.update', { id: feed.id }),  { [`icon_${selected}_color`]: color }, { withCredentials: true })
        } catch (error) {
            console.error(error)
        } finally {
            router.reload({ only: ['feed'] })
        }
    }

    const onNameChange: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('feed.update', { id: feed.id }), {
            onFinish: () => router.reload({ only: ['feed'] }),
        });
    }

    return (
        <AuthenticatedLayout
            // header={
            //     <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
            //         Dashboard
            //     </h2>
            // }
        >
            <SearchChannelDialog isOpen={isOpen} closeDialog={closeDialog} feed={feed} follows={channels} />

            <Head title="Feed" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <Link href={route('dashboard')} className='hover:underline underline-offset-4 mb-4 inline-flex gap-2 items-center px-1 pt-1 text-md font-medium leading-5 transition duration-150 ease-in-out focus:outline-none text-gray-500 hover:text-gray-700 focus:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 dark:focus:text-gray-300'>
                        <ChevronLeftIcon className='h-5 w-5'/>
                        <p>Back to Dashboard</p>
                    </Link>
                    <div className='overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800'>
                        <div className="grid grid-cols-3 mb-6">
                            <Popover className="relative ">
                                <PopoverButton className='flex m-4 p-2 bg-gray-200 dark:bg-gray-600 rounded'>
                                    <PencilSquareIcon className="size-5 mr-1"/>
                                    <p>Edit Icon</p>
                                </PopoverButton>
                                <PopoverPanel anchor="bottom start" className="p-2 flex flex-col [--anchor-gap:16px] w-64 bg-gray-200 dark:bg-gray-700">
                                    <TabGroup
                                        defaultIndex={0}
                                        onChange={(index) => {
                                            setSelected(index === 0 ? 'bg' : 'text')
                                        }}
                                    >
                                        <TabList className='flex gap-4 justify-center'>
                                            <Tab>
                                                {({ hover, selected }) => (
                                                    <p className={`dark:text-white p-2 border-b-2 ${hover || selected ? 'border-indigo-500' : 'border-transparent'}`}>
                                                        Background
                                                    </p>
                                                )}
                                            </Tab>
                                            <Tab>
                                                {({ hover, selected }) => (
                                                    <p className={`dark:text-white p-2 border-b-2 ${hover|| selected ? 'border-indigo-500' : 'border-transparent'}`}>
                                                        Text
                                                    </p>
                                                )}
                                            </Tab>
                                        </TabList>
                                        <TabPanels className='p-2'>
                                            <TabPanel className='grid grid-cols-4 gap-4'>
                                                <ColorGrid color={iconColors.bg} onSelect={(color) => onSelect(color)} />
                                            </TabPanel>
                                            <TabPanel className='grid grid-cols-4 gap-4'>
                                                <ColorGrid color={iconColors.text} onSelect={(color) => onSelect(color)} />
                                            </TabPanel>
                                        </TabPanels>
                                    </TabGroup>
                                </PopoverPanel>
                            </Popover>
                            <div className="col-start-2 flex flex-col p-6 items-center relative">
                                <div className="relative group">
                                    {/* Image */}
                                    {/* <img
                                        src="https://via.placeholder.com/150" // {selectedFeed.imageUrl}
                                        alt="Profile"
                                        className="w-32 h-32 rounded-full mx-auto mb-2"
                                    /> */}
                                    <div className={`${iconColors.bg} ${iconColors.text} flex size-32 rounded-full mx-auto mb-2 flex items-center justify-center text-5xl font-bold relative group`}>
                                        {data.name.charAt(0)}
                                    </div>
                                    {/* Hover Overlay */}
                                    {/* <div className="absolute inset-0 rounded-full bg-gray-200/50 dark:bg-gray-700/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"></div> */}

                                    {/* Hover Actions */}
                                    {/* <div className="flex flex-col gap-2 absolute inset-0 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20">
                                        <button>
                                            <PencilSquareIcon className="w-10 h-10 text-gray-900 hover:text-gray-600" />
                                        </button>
                                    </div> */}
                                </div>
                                <div className="flex mt-5 w-full">
                                    <Input value={data.name} onChange={(e) => setData('name', e.target.value)} className={clsx(
                                        'block rounded-lg border-none bg-gray-100 dark:bg-white/5 py-1.5 px-3 text-2xl text-black dark:text-white text-center',
                                        'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                                    )} />
                                    <button onClick={onNameChange} className='cursor-pointer block rounded-lg border-none bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 py-1.5 px-3 ml-2'>
                                        <CheckIcon className="w-6 h-6 text-green-500 h-full" />
                                    </button>
                                </div>
                                { errors && errors.name && <div className='text-red-500 pt-3 text-sm'>{`${errors.name}`}</div> }
                            </div>
                            <div className='w-full place-self-start items-center'>
                                <Disclosure>
                                    {({ open }) => (
                                        <>
                                            <DisclosureButton className='flex gap-1 items-center place-self-end p-2 pr-4 bg-red-200 hover:bg-red-300 rounded mt-4 mr-4'>
                                                <TrashIcon className='text-red-500 h-6 w-6'/>
                                                <p className='text-red-600'>Delete</p>
                                            </DisclosureButton>
                                            <DisclosurePanel className="mt-4 rounded-md text-sm bg-red-200 px-4 py-2">
                                                <div className='p-4 flex flex-col gap-3'>
                                                    <p className='text-center text-md'>Are you sure you'd like to delete this feed?</p>
                                                    <p className='text-center italic text-red-500'>This action cannot be undone.</p>
                                                    <Link
                                                        as='button'
                                                        href={route('feed.destroy', { id: feed.id })}
                                                        method="delete"
                                                        className='hover:bg-red-500 place-self-center block w-1/4 bg-red-100 rounded py-2'
                                                    >
                                                        Delete
                                                    </Link>
                                                </div>
                                            </DisclosurePanel>
                                        </>
                                    )}
                                </Disclosure>
                            </div>
                        </div>
                        <div className='place-self-center mb-6 w-1/2'>
                            <div className='p-6 rounded-lg bg-gray-100 dark:bg-gray-900'>
                                <button onClick={openDialog} className="w-full flex gap-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                                    <MagnifyingGlassIcon className="w-5 h-5" />
                                    <p>Search all channels...</p>
                                </button>
                            </div>
                        </div>
                        <div className='place-self-center mb-6 w-3/4'>
                            <FollowingsTable feed={feed} channels={channels} isSearch={false} follows={channels} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
