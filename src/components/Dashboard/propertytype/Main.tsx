import { Button } from "@/components/ui/button"
import { MyContext } from "@/context/context";
import { useContext } from "react";

export default function Properties() {

    const {properties} = useContext(MyContext)
    return (
        <div className="flex flex-row gap-7 overflow-x-auto">
            {
                properties.map((property, index) => (
                    <Button key={index} variant="outline">
                        {property}
                    </Button>
                ))
            }
        </div>

    );
}