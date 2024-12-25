import { Button, Description, Dialog, DialogPanel, Field, Input, Label } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { FormEvent, useState } from "react";
import clsx from 'clsx'

interface Props {
    isOpen: boolean
    closeDialog: () => void
}

export default function SearchChannelDialog({isOpen, closeDialog}: Props) {

    const [ search, setSearch ] = useState('')
    const [ results, setResults ] = useState([])

    function submit(e: FormEvent) {
        console.log('submitted')
        e.preventDefault()

        const url = new URL(route('channels'));
        url.searchParams.append('search', search);

        fetch(url.toString())
            .then((res) => res.json())
            .then((data) => {
                console.log('Channels:', data.channels); // Access your channels
            })
            .catch((err) => console.error('Error:', err));
    }

    return (
        <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={() => {closeDialog();}}>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4">
                    <DialogPanel
                    transition
                    className="w-full max-w-md rounded-xl bg-white/80 dark:bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                    >
                        {/* Name */}
                        <Field>
                            <Label className="text-sm/6 font-medium dark:text-white text-black">Search</Label>
                            <Description className="text-sm/6 dark:text-white/50 text-gray-400">Search for channels to follow.</Description>
                            <Input
                            className={clsx(
                                'mt-3 block w-full rounded-lg border-none bg-gray-100 dark:bg-white/5 py-1.5 px-3 text-sm/6 text-black dark:text-white',
                                'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                            )}
                            value={search} onChange={e => setSearch(e.target.value)}
                            />
                            {/* {errors.name && <div className='text-red-500 p-1 text-sm'>{errors.name}</div>} */}
                        </Field>

                        {/* Submit */}
                        <div className="mt-8">
                            <Button
                            onClick={submit}
                            className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                            >
                                Search
                            </Button>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
      )

}
