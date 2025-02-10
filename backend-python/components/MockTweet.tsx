interface MockTweetProps {
    position: string;
    avatar: string;
    username: string;
    time: string;
    text: string;
}

export default function MockTweet({ position, avatar, username, time, text }: MockTweetProps) {
    return (
        <div className={`hidden lg:block absolute ${position}`}>
            <div className="bg-white p-4 rounded-xl shadow-lg max-w-[300px]">
                <div className="flex items-center gap-3 mb-2">
                    <img src={avatar} className="w-10 h-10 bg-gray-200 rounded-full" />
                    <div>
                        <p className="font-bold">{username}</p>
                        <p className="text-gray-500 text-sm">{time}</p>
                    </div>
                </div>
                <p className="text-gray-800">{text}</p>
            </div>
        </div>
    );
}
