import { router } from "@inertiajs/react"
import { on } from "events"
import { useState } from "react"

interface Props {
    feed: App.Data.FeedData
    channels: App.Data.ChannelData[]
    isSearch: boolean
    follows: App.Data.ChannelData[]
}

export default function FollowingsTable({ feed, channels, isSearch, follows }: Props) {

    const onClick = (channel: App.Data.ChannelData) => {
        switch (follows.some(follow => follow.source_id === channel.source_id)) {
            case false:
                router.visit(route('channel.store'), {
                    method: 'post',
                    data: {
                        ...channel,
                        feed_id: feed.id
                    },
                    only: ['follows', 'channels'],
                    preserveScroll: true,
                })
                break;
            case true:
                router.visit(route('channel.destroy', channel.source_id), {
                    method: 'delete',
                    data: {
                        feed_id: feed.id
                    },
                    only: ['follows', 'channels'],
                    preserveScroll: true,
                })
                break;
            default:
                break
        }
    }

    return (
        <>
        {channels.length !== 0 &&
            <div className='p-8 rounded-lg bg-gray-100 dark:bg-gray-900'>
                <ul role="list" className="divide-y divide-gray-100">
                {channels?.map((channel, index) => (
                    <li key={index} className="flex justify-between gap-x-6 py-5">
                    <div className="flex min-w-0 gap-x-4 max-w-xl">
                        <img alt="" src={channel.thumbnail} className="size-16" />
                        <div className="min-w-0 flex-auto">
                        <a href={channel.link ?? '#'} target='_blank' className="text-md/6 font-semibold dark:text-gray-400 hover:underline">{channel.name}</a>
                        <p className="mt-1 text-xs/5 text-gray-500 truncate">{channel.description}</p>
                        </div>
                    </div>
                    <div className='flex gap-8'>
                        <div className="hidden shrink-0 md:flex md:items-center gap-2">
                            <img alt="" src={`/images/${channel.type}.png`} className="w-10 h-auto flex-none" />
                            {/* <p className="text-sm/6 text-gray-500 dark:text-gray-400">{person.type}</p> */}
                        </div>
                        <div className='flex w-full items-center justify-center'>
                            <button onClick={() => onClick(channel)} className='flex items-center justify-center bg-white dark:bg-gray-800 w-20 h-8 p-2 rounded'>
                                <p className='text-sm dark:text-gray-400'>{follows.some(follow => follow.source_id === channel.source_id) ? 'Unfollow' : 'Follow'}</p>
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
