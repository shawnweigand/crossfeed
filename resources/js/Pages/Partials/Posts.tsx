import { useEffect, useState } from "react";
import Loading from "../Components/Loading";

interface Post {
    type: string
    source_id: string
    title: string
    description: string
    image: string
    link: string
    timestamp: string
    channel: App.Data.ChannelData
}

interface Props {
    feed: App.Data.FeedData
}

export default function Posts({feed}: Props) {

    const [ searching, setSearching ] = useState(false)
    const [ error, setError ] = useState('')
    const [ posts, setPosts ] = useState<Post[]>([])

    const url = new URL(route('posts', {feed: feed.id}));

    const search = () => {
        setSearching(true)
        fetch(url.toString())
            .then((res) => res.json())
            .then((data) => {
                setPosts(data.sort((a: {timestamp: string}, b: {timestamp: string}) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())); // setting response in state
            })
            .catch((err) => {console.log(`${err}`); setError(err)})
            .finally(() => setSearching(false))
    }

    useEffect(() => {
        search()
    }, [feed])

    if (searching) return <Loading />

    return (
        <div className="mx-auto max-w-xl sm:px-6 lg:px-8">
            {posts.map(post => (
                <a href={post.link} target='_blank' key={post.source_id}>
                    <div className="my-12 overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="text-gray-900 dark:text-gray-100">
                            <div className="flex gap-4 items-center p-6 w-full h-1/2">
                                <img src={post.channel.thumbnail} alt={post.title} className="size-16 rounded-full" />
                                <div className="flex flex-col">
                                    <p className='text-md'>{post.title}</p>
                                    <p className='text-xs mb-1'>{post.channel.name}</p>
                                    <p className='italic text-xs'>{(new Date(post.timestamp)).toDateString()}</p>
                                </div>
                            </div>
                            <img src={post.image} alt={post.title} className="w-full h-full" />
                            <p className="text-sm p-4">{post.description}</p>
                            <div className="flex items-center justify-center gap-2 w-full p-3">
                                <img src={`/images/${post.type}.png`} className="size-5" />
                                <p className="text-xs">Visit on {post.type}</p>
                            </div>
                        </div>
                    </div>
                    {/* <pre className="text-xs text-center text-gray-400 dark:text-gray-500">{JSON.stringify(post, null, 2)}</pre> */}
                </a>
            ))}
        </div>
    );
}
