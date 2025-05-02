import { House, History, FileVideo, User } from 'lucide-react'

export const API_URL = "http://192.168.0.116:8000/api/v1"

interface sideBarMenuAndPathDetail {
    name: string,
    Icon: React.ElementType,
    iconSize: number,
    path: string,
}


export const sideBarMenuAndPath: sideBarMenuAndPathDetail[] = [
    {
        name: "Home",
        Icon: House,
        iconSize: 24,
        path: "/"
    },
    {
        name: "History",
        Icon: History,
        iconSize: 24,
        path: "/history"
    },
    {
        name: "Your videos",
        Icon: FileVideo,
        iconSize: 24,
        path: "/profile"
    },
    {
        name: "Profile",
        Icon: User,
        iconSize: 24,
        path: "/profile"
    }
    
]

