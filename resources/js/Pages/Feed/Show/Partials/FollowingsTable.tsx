import Sidebar from '@/Components/Sidebar';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { FormEvent, useState } from 'react';
import { Button, Description, Dialog, DialogPanel, Field, Input, Label } from '@headlessui/react'
import { useForm } from '@inertiajs/react'
import clsx from 'clsx'

interface Props {

}

const people = [
    {
        name: 'Youtube dog highlights',
        desc: 'short description...',
        id: 1,
        type: 'YouTube',
        imageUrl:
          'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        lastSeen: null,
    },
    {
        name: 'Spotify podcast about dogs',
        desc: 'short description...',
        id: 2,
        type: 'Spotify',
        imageUrl:
          'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        lastSeen: null,
    },
    {
      name: 'Other medium...',
      desc: 'short description...',
      id: 3,
      type: 'Other',
      imageUrl:
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      lastSeen: null,
    },
  ]

export default function FollowingsTable({}: Props) {

    return (
        <div className='p-8 rounded-lg bg-gray-100 dark:bg-gray-900'>
            <h1 className='text-xl mb-2 text-gray-500'>Following</h1>
            <ul role="list" className="divide-y divide-gray-100">
            {people.map((person) => (
                <li key={person.id} className="flex justify-between gap-x-6 py-5">
                <div className="flex min-w-0 gap-x-4">
                    <img alt="" src={person.imageUrl} className="size-12 flex-none rounded-full bg-gray-50" />
                    <div className="min-w-0 flex-auto">
                    <p className="text-sm/6 font-semibold text-gray-900">{person.name}</p>
                    <p className="mt-1 truncate text-xs/5 text-gray-500">{person.desc}</p>
                    </div>
                </div>
                <div className='flex gap-12'>
                    <div className="hidden shrink-0 md:flex md:items-center gap-2">
                        <img alt="" src={`/images/${person.type}.png`} className="w-10 h-auto flex-none bg-gray-50" />
                        <p className="text-sm/6 text-gray-900">{person.type}</p>
                    </div>
                    <div className='flex w-full items-center justify-center'>
                        <button className='flex items-center justify-center bg-white hover:bg-gray-50 w-20 h-8 p-2 rounded'>
                            <p className='text-sm'>Unfollow</p>
                        </button>
                    </div>
                </div>
                </li>
            ))}
            </ul>
        </div>
      )

}
