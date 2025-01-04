interface Props {
    feed: App.Data.FeedData
}

export default function Posts({feed}: Props) {

    return (
        <div>
            Selected: {feed.name}
        </div>
    );
}
