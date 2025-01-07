import { Button, Description, Dialog, DialogPanel, Field, Input, Label } from "@headlessui/react";
import { CheckIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { FormEvent, useState } from "react";
import clsx from 'clsx'
import Loading from "@/Pages/Components/Loading";
import FollowingsTable from "./FollowingsTable";

interface Props {
    isOpen: boolean
    closeDialog: () => void
    feed: App.Data.FeedData
    follows: App.Data.ChannelData[]
}

export default function SearchChannelDialog({isOpen, closeDialog, feed, follows}: Props) {

    const [ searching, setSearching ] = useState(false)
    const [ error, setError ] = useState('')
    const [ search, setSearch ] = useState('')
    const [ results, setResults ] = useState([])
    const [ filter, setFilter ] = useState([
        {
            name: 'Spotify',
            status: false
        },
        {
            name: 'YouTube',
            status: false
        }
    ])

    function submit(e: FormEvent) {
        // reset error
        e.preventDefault()
        setError('')
        setSearch('')
        setResults([])

        // prepare search url to SearchChannelsController
        const url = new URL(route('channels'));
        url.searchParams.append('search', search);
        url.searchParams.append('filter', filter
            .filter(item => item.status)
            .map(item => item.name)
            .join(','))

        // complete search
        setSearching(true)
        fetch(url.toString())
            .then((res) => res.json())
            .then((data) => {
                setResults(data); // setting response in state
            })
            .catch((err) => {console.log(`${err}`); setError(err)})
            .finally(() => setSearching(false))
    }

    function close() {
        closeDialog()
        setError('')
        setSearch('')
        setResults([])
    }

    return (
        <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4">
                    <DialogPanel
                    transition
                    className="w-full max-w-4xl rounded-xl bg-white/80 dark:bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                    >
                    {!searching ?
                        <>
                        {/* Name */}
                        <Field>
                            <Label className="text-sm/6 font-medium dark:text-white text-black">Search</Label>
                            <Description className="text-sm/6 dark:text-white/50 text-gray-400">Search for channels to follow.</Description>
                            <div className="flex w-full gap-4 p-4">
                                {
                                    filter.map(item => (
                                        <button
                                        key={item.name}
                                        onClick={() => setFilter(filter.map(f => f.name === item.name ? {...f, status: !f.status} : f))}
                                        className={clsx(
                                            'flex items-center rounded-full py-1.5 px-3 text-sm/6 font-semibold text-white',
                                            item.status ? 'dark:bg-gray-700 dark:hover:bg-gray-800 bg-gray-800 hover:bg-gray-700' : 'dark:bg-gray-800 dark:hover:bg-gray-700 bg-gray-400 hover:bg-gray-800'
                                        )}
                                        >
                                            {item.status && <CheckIcon className="size-4 mr-1" />}
                                            {item.name}
                                        </button>
                                    ))
                                }
                            </div>
                            <Input
                            required
                            className={clsx(
                                'mt-3 block w-full rounded-lg border-none bg-gray-100 dark:bg-white/5 py-1.5 px-3 text-sm/6 text-black dark:text-white',
                                'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                            )}
                            value={search} onChange={e => setSearch(e.target.value)}
                            />
                            {error && <div className='text-red-500 p-1 text-sm'>{`${error}`}</div>}
                        </Field>

                        {/* Submit */}
                        <div className="my-8">
                            <Button
                            onClick={submit}
                            className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                            >
                                Search
                            </Button>
                        </div>

                        <FollowingsTable feed={feed} channels={results} isSearch={true} follows={follows} />
                        {/* {results.map((item) => (
                            <p>{JSON.stringify(item)}</p>
                        ))} */}

                        </> :
                        <Loading />
                    }
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
      )

}
