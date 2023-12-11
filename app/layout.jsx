import '@styles/globals.css';
import Nav from "@components/Nav";

export const metadata = {
    title: "Learn Indonesian",
    decription: "Learn Indonasian using spaced repetition"
}

const RootLayout = ({children}) => {
  return (
    <html>
        <body className="flex flex-col bg-gray-800 h-screen w-screen h-screen">
            <Nav/>
            <div className="flex justify-center items-center grow">
                {children}
            </div>
        </body>
    </html>
  )
}

export default RootLayout