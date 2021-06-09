import FooterComponent from "./footer";
import HeaderComponent from "./header";

interface BaseProps{
    children: React.ReactNode
}

export default function BaseComponent({children}: BaseProps){
    return (
        <>
            <HeaderComponent />
            <main className="w-full max-w-7xl mx-auto flex flex-col">
                {children}
            </main>
            <FooterComponent />
        </>
    )
}