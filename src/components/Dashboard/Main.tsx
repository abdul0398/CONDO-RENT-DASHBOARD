import FlatType from "./flattype/Main";
import Months from "./months/Main";
import Graph from "./graph/Main";
import MapCompenent from "./map/Main";
import Streets from "./streets/Main";
import Properties from "./propertytype/Main";
import Projects from "./projects/Main";
import Districts from "./districts/Main";
import Areas from "./areas/Main";


export default function Dashboard() {
    return (
        <section className="mb-52 w-full mt-5 mx-auto bg-gray-100 shadow-md p-3 overflow-auto">
            {/* <Towns /> */}
            <section className="h-40 w-full">

            </section>
            <section className="flex mt-5">
                <div className="w-[400px] border border-slate-300 h-[250px]">
                    <MapCompenent />
                </div>
                <div className="w-[280px] border border-slate-300 ms-5 h-[250px]">
                    <Districts />
                </div>
                <div className="w-[180px] border border-slate-300 mx-5">
                    <Projects />
                </div>
                <div className="w-[180px] border border-slate-300 me-5">
                    <Streets />
                </div>
                <div className="w-[150px] border border-slate-300">
                    <Months />
                </div>
            </section>
            <section className="flex w-full mt-5">
                <div className="w-1/2 h-28 me-5">
                    <h2 className="">Bedrooms</h2>
                    <div className="w-full overflow-x-auto overflow-y-hidden">
                        <FlatType />
                    </div>
                </div>
                <div className="w-1/2 h-28">
                    <h2 className="">Property Type</h2>
                    <div className="">
                        <div className="w-full">
                            <Properties />
                        </div>
                    </div>
                </div>
            </section>
            <section className="w-100 h-96 flex">
                <div className="w-1/2">
                    <Graph />
                </div>
                <div className="w-1/2">
                    <Areas/>                
                </div>

            </section>
        </section>
    )
}