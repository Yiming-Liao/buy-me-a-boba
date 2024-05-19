import { motion } from 'framer-motion'
import { UsersRound, CupSoda, MessageSquareMore, HeartHandshake } from 'lucide-react';


const ProjectsData = [
    {
        id: 1,
        name: '選擇你想支持的創作者',
        description: '瀏覽我們的創作者列表，找到你想要支持的人。',
        icon: <UsersRound />
    },
    {
        id: 2,
        name: '贊助一杯珍珠奶茶',
        description: '選擇你想要贊助的 Boba Tea 杯數。',
        icon: <CupSoda />
    },
    {
        id: 3,
        name: '留言鼓勵',
        description: '在贊助時，你可以留下一些鼓勵的話，讓創作者知道有人在支持他們。',
        icon: <MessageSquareMore />
    },
    {
        id: 4,
        name: '看著你的支持轉化為成果',
        description: '你的支持將直接讓創作者有更多時間和資源來創作更多優質的內容。',
        icon: <HeartHandshake />
    },
]

const HoverSpring = () => {
    return (
        <div>
            <div className="flex justify-center max-md:justify-start items-center flex-wrap w-4/5 max-md:w-3/5 mx-auto mt-8">
                {ProjectsData.map((project) => {
                    return (
                        <motion.div
                            whileHover={{
                                y: -8,
                            }}
                            transition={{
                                type: 'spring',
                                bounce: 0.7,
                            }}
                            key={project.id}
                            className="text-left max-w-96 h-24 mx-3 my-1 "
                        >
                            <div>
                                <div className='flex justify-start items-center gap-2 m-1'>
                                    <div className='mb-2'>
                                        {project.icon}
                                    </div>
                                    <div className="mb-1 text-sm font-medium text-gray-700">
                                        {project.name}
                                    </div>
                                </div>
                                <div className="text-sm font-normal w-56 text-gray-500">
                                    {project.description}
                                </div>
                            </div>
                        </motion.div>
                    )
                })}
            </div>
        </div>
    )
}

export default HoverSpring