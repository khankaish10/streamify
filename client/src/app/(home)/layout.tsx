import React from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Sidebar_Bottom from '../components/Sidebar_Bottom'
import GlobalModal from '../components/GlobalModal'

const layout = ({ children }: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <main className="flex flex-col h-screen w-full font-[poppins]">

            <Navbar />
            <section className="sm:min-flex-col sm:flex h-full">
                <Sidebar />
                {children}
                <Sidebar_Bottom />
            </section>
            <GlobalModal />
        </main>
    )
}

export default layout
