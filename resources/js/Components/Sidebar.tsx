// Sidebar.js
import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Disclosure } from '@headlessui/react';
import { ChevronRightIcon } from '@heroicons/react/24/solid';

export default function Sidebar() {
    const { url } = usePage(); // Get the current URL

    const navigation = [
        {
            name: 'Dashboard',
            href: '/dashboard',
        },
        {
            name: 'Profile',
            href: '/profile',
        },
        {
            name: 'Settings',
            href: '/settings',
            children: [
                { name: 'Account', href: '/settings/account' },
                { name: 'Privacy', href: '/settings/privacy' },
            ],
        },
    ];

    const isActive = (href: any) => url.startsWith(href);

    return (
        <div className="h-screen w-56 bg-gray-800 text-white flex flex-col fixed">
            <div className="p-4 text-lg font-bold">My Application</div>
            <nav className="flex-1 overflow-y-auto">
                {navigation.map((item) => (
                    <div key={item.name}>
                        {item.children ? (
                            <Disclosure>
                                {({ open }) => (
                                    <>
                                        <Disclosure.Button
                                            className={`flex w-full items-center px-4 py-2 text-left focus:outline-none transition-colors ${
                                                isActive(item.href) ? 'bg-gray-700' : 'hover:bg-gray-600'
                                            }`}
                                        >
                                            <span>{item.name}</span>
                                            <ChevronRightIcon
                                                className={`w-5 h-5 ml-auto transition-transform ${open ? 'rotate-90' : ''}`}
                                            />
                                        </Disclosure.Button>
                                        <Disclosure.Panel className="pl-8">
                                            {item.children.map((subItem) => (
                                                <Link
                                                    key={subItem.name}
                                                    href={subItem.href}
                                                    className={`block px-4 py-2 rounded-md text-sm ${
                                                        isActive(subItem.href) ? 'bg-gray-700' : 'hover:bg-gray-600'
                                                    }`}
                                                >
                                                    {subItem.name}
                                                </Link>
                                            ))}
                                        </Disclosure.Panel>
                                    </>
                                )}
                            </Disclosure>
                        ) : (
                            <Link
                                href={item.href}
                                className={`block px-4 py-2 rounded-md transition-colors ${
                                    isActive(item.href) ? 'bg-gray-700' : 'hover:bg-gray-600'
                                }`}
                            >
                                {item.name}
                            </Link>
                        )}
                    </div>
                ))}
            </nav>
        </div>
    );
};
