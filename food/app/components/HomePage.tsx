"use client"
import { Categories } from "./Categories"
import { CategorySection } from "./CategorySection"

 
export const HomePage = () => {
    return (
        <div className="bg-black h-fit w-full ">
            <Categories/>
            <CategorySection/>
            <CategorySection/>
        </div>
        
    )
}