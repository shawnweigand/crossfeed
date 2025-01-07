declare namespace App.Data {
export type ChannelData = {
id: number;
name: string;
source_id: string;
type: string;
description: string;
thumbnail: string;
link: string | null;
publisher: string | null;
created_at: string;
updated_at: string;
};
export type FeedData = {
id: number;
name: string;
user_id: number;
user: any | null;
selected: boolean;
created_at: string;
updated_at: string;
};
}
