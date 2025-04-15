import { BackgroundPic } from "./components/BackGroundImg";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { HomePage } from "./components/HomePage";


export default function Home() {
  return ( 
    <div className="flex flex-col w-max-[1440px] w-[1440px] h-fit mx-auto">
       <Header/>
       <BackgroundPic/>
       <HomePage/>
       <Footer/>
       
    </div>
   
  );
}
