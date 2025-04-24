import React from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Sidebar_Bottom from '../components/Sidebar_Bottom'

const layout = ({ children }: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
            <div className="flex flex-col h-screen">
                <Navbar />
                <section className="flex flex-1">
                    <Sidebar />
                    {children}
                </section>
                <Sidebar_Bottom />
            </div>
    )
}

export default layout
