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
        email: 'short description...',
        role: 'Business Relations',
        imageUrl:
          'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        lastSeen: null,
    },
    {
        name: 'Spotify podcast about dogs',
        email: 'short description...',
        role: 'Business Relations',
        imageUrl:
          'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        lastSeen: null,
    },
    {
      name: 'Other medium...',
      email: 'short description...',
      role: 'Business Relations',
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
                <li key={person.email} className="flex justify-between gap-x-6 py-5">
                <div className="flex min-w-0 gap-x-4">
                    <img alt="" src={person.imageUrl} className="size-12 flex-none rounded-full bg-gray-50" />
                    <div className="min-w-0 flex-auto">
                    <p className="text-sm/6 font-semibold text-gray-900">{person.name}</p>
                    <p className="mt-1 truncate text-xs/5 text-gray-500">{person.email}</p>
                    </div>
                </div>
                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                    <p className="text-sm/6 text-gray-900">{person.role}</p>
                    {person.lastSeen ? (
                    <p className="mt-1 text-xs/5 text-gray-500">
                        Last seen <time dateTime={person.lastSeenDateTime}>{person.lastSeen}</time>
                    </p>
                    ) : (
                    <div className="mt-1 flex items-center gap-x-1.5">
                        <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                        <div className="size-1.5 rounded-full bg-emerald-500" />
                        </div>
                        <p className="text-xs/5 text-gray-500">Online</p>
                    </div>
                    )}
                </div>
                </li>
            ))}
            </ul>
        </div>
      )

}
