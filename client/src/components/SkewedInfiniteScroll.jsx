import { avatars } from "../assets/avatar/index.js"

const SkewedInfiniteScroll = () => {
    let itemArray = [{
        title: "林怡君",
        quantity: "1",
        avatar: avatars.girl1,
        message: "非常感謝您的創作，您的努力讓我的每一天都充滿啟發和喜悅。"
    }, {
        title: "Emily Carter",
        quantity: "5",
        avatar: avatars.girl2,
        message: "Thank you for constantly inspiring us with your innovative creations, your work truly makes a difference!"
    }, {
        title: "John Smith",
        quantity: "12",
        avatar: avatars.boy2,
        message: "Your creativity continues to amaze me, thank you for sharing your unique vision with us all!"
    }, {
        title: "陳大為",
        quantity: "2",
        avatar: avatars.boy1,
        message: "感謝您的不懈努力和創意，您的作品讓人感到溫暖和受到鼓勵。"
    }, {
        title: "王心怡",
        quantity: "5",
        avatar: avatars.girl3,
        message: "每次看到您的新作品，我都感到無比的驚喜和感動，真心感謝您！"
    }, {
        title: "Chris Evans",
        quantity: "1",
        avatar: avatars.boy3,
        message: "I am always inspired by your dedication and talent. Thanks for making the world a brighter place with your art!"
    }, {
        title: "黃俊傑",
        quantity: "8",
        avatar: avatars.boy4,
        message: "您的作品總是讓人眼前一亮，真的很感謝您不斷地提供這麼多美好！"
    }, {
        title: "Sophia Lee",
        quantity: "2",
        avatar: avatars.girl4,
        message: "Thank you for pouring your heart into your work. Your passion and dedication shine through every piece!"
    }
    ]
    return (

        <div>
            <div className="flex items-center justify-center">
                <div className="relative w-full overflow-hidden">
                    <div className="pointer-events-none absolute -top-1 z-10 h-20 w-full bg-gradient-to-b from-white"></div>
                    <div className="pointer-events-none absolute -bottom-1 z-10 h-20 w-full bg-gradient-to-t from-white"></div>
                    <div className="pointer-events-none absolute -left-1 z-10 h-full w-20 bg-gradient-to-r from-white"></div>
                    <div className="pointer-events-none absolute -right-1 z-10 h-full w-20 bg-gradient-to-l from-white"></div>

                    <div className="animate-skew-scroll mx-auto grid md:h-[550px] h-[300px] min-w-[300px] relative md:left-[-21vw] grid-cols-1 gap-5 md:gap-x-[1000px] sm:w-[600px] sm:grid-cols-2">
                        {itemArray.map((item) => (
                            <div
                                key={item.title}
                                className="flex w-72 justify-center cursor-pointer items-center space-x-2 rounded-2xl border border-gray-100 px-5 shadow-md transition-all hover:-translate-y-1 hover:translate-x-1 hover:scale-[1.025] hover:shadow-xl"
                            >
                                < div className="flex flex-col justify-center items-center m-6" >
                                    <div className="w-64 min-h-48 flex flex-col items-center rounded-xl shadow-md bg-slate-100 pb-3">
                                        <div className="text-xs text-slate-400 self-end my-2 mr-3">
                                            {item.createdAt}
                                        </div>
                                        <div className="w-4/5 px-3 mb-3 min-h-20 flex items-center rounded-full shadow-md bg-white">
                                            <img src={item.avatar} alt="avatar"
                                                className="w-16"
                                            />
                                            <div className="text-2xl flex-1 text-center text-slate-600">{item.title}</div>
                                        </div>
                                        <div className="m-1 text-slate-500 my-2">
                                            {item.title} 買了 {item.quantity} 杯🧋
                                        </div>
                                        <div className="w-48 max-h-60 my-auto flex flex-col items-center rounded-xl shadow-md bg-white mb-3">
                                            <div className="min-h-[60px] p-3 flex justify-center items-center text-slate-600">
                                                {item.message}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>

    )
}

export default SkewedInfiniteScroll