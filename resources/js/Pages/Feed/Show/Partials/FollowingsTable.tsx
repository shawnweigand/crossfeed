interface Props {
    channels: App.Data.ChannelData[]
    isSearch: boolean
    onClick: (channel: App.Data.ChannelData) => void
}

export default function FollowingsTable({ channels, isSearch, onClick }: Props) {

    return (
        <>
        {channels.length !== 0 &&
            <div className='p-8 rounded-lg bg-gray-100 dark:bg-gray-900'>
                <ul role="list" className="divide-y divide-gray-100">
                {channels?.map((channel) => (
                    <li key={channel.source_id} className="flex justify-between gap-x-6 py-5">
                    <div className="flex min-w-0 gap-x-4">
                        <img alt="" src={channel.thumbnail} className="size-16" />
                        <div className="min-w-0 flex-auto">
                        <a href={channel.link} target='_blank' className="text-md/6 font-semibold dark:text-gray-400 hover:underline">{channel.name}</a>
                        <p className="mt-1 text-xs/5 text-gray-500 max-w-lg truncate">{channel.description}</p>
                        </div>
                    </div>
                    <div className='flex gap-8'>
                        <div className="hidden shrink-0 md:flex md:items-center gap-2">
                            <img alt="" src={`/images/${channel.type}.png`} className="w-10 h-auto flex-none" />
                            {/* <p className="text-sm/6 text-gray-500 dark:text-gray-400">{person.type}</p> */}
                        </div>
                        <div className='flex w-full items-center justify-center'>
                            <button onClick={() => onClick(channel)} className='flex items-center justify-center bg-white dark:bg-gray-800 w-20 h-8 p-2 rounded'>
                                <p className='text-sm dark:text-gray-400'>Follow</p>
                            </button>
                        </div>
                    </div>
                    </li>
                ))}
                </ul>
            </div>
        }
        </>
      )

}
