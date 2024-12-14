import Sidebar from '@/Components/Sidebar';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { FormEvent, useState } from 'react';
import { Button, Description, Dialog, DialogPanel, DialogTitle, Field, Input, Label } from '@headlessui/react'
import { useForm } from '@inertiajs/react'
import clsx from 'clsx'

interface Props {
    isOpen: boolean
    closeDialog: () => void
    feed?: App.Data.FeedData | null
    mode: string
}

export default function FeedDialog({isOpen, closeDialog, feed, mode}: Props) {

    const { data, setData, post, processing, errors, clearErrors, reset } = useForm({
        name: feed?.name || '',
    })

    function submit(e: FormEvent) {
        e.preventDefault()
        console.log(data)
        if (mode == 'Add') {
            console.log(mode)
            post(route('feed.store'), {
                onSuccess: () => {
                    reset()
                    clearErrors()
                    closeDialog()
                }
            })
        }
    }

    return (
        // <form onSubmit={submit}>
        // <input type="text" value={data.email} onChange={e => setData('email', e.target.value)} />
        // {errors.email && <div>{errors.email}</div>}
        // <input type="password" value={data.password} onChange={e => setData('password', e.target.value)} />
        // {errors.password && <div>{errors.password}</div>}
        // <input type="checkbox" checked={data.remember} onChange={e => setData('remember', e.target.checked)} /> Remember Me
        // <button type="submit" disabled={processing}>Login</button>
        // </form>
        <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={() => {closeDialog(); reset(); clearErrors()}}>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
                <DialogTitle as="h3" className="text-base/7 font-medium text-white mb-4">
                    {mode} Feed {feed && <p>: {feed.name}</p>}
                </DialogTitle>
                <form onSubmit={submit}>
                <Field>
                    <Label className="text-sm/6 font-medium text-white">Name</Label>
                    <Description className="text-sm/6 text-white/50">Give this feed a name.</Description>
                    <Input
                    className={clsx(
                        'mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white',
                        'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                    )}
                    value={data.name} onChange={e => setData('name', e.target.value)}
                    />
                    {errors.name && <div className='text-red-500 p-1 text-sm'>{errors.name}</div>}
                </Field>
                <div className="mt-4">
                    <Button
                    className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                    type="submit"
                    >
                    Got it, thanks!
                    </Button>
                </div>
                </form>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    );
}
