import { useEffect, useState } from "react";
import Loading from "../Components/Loading";

interface Props {
    feed: App.Data.FeedData
}

export default function Posts({feed}: Props) {

    const [ searching, setSearching ] = useState(false)
    const [ error, setError ] = useState('')
    const [ posts, setPosts ] = useState([])

    const url = new URL(route('posts', {feed: feed.id}));

    const search = () => {
        setSearching(true)
        fetch(url.toString())
            .then((res) => res.json())
            .then((data) => {
                setPosts(data); // setting response in state
            })
            .catch((err) => {console.log(`${err}`); setError(err)})
            .finally(() => setSearching(false))
    }

    useEffect(() => {
        search()
    }, [])

    if (searching) return <Loading />

    return (
        <div>
            Selected: {feed.name}
            <pre className='text-xs'>{JSON.stringify(posts, null, 2)}</pre>
        </div>
    );
}
