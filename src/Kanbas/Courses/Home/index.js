import Modules from "../Modules/";
import HomeStatus from "./HomeStatus";

function Home() {
  return (
    <div className="my-2 mx-2" style={{ display: "flex" }}>
      <div style={{ flex: 1 }}>
        <Modules />
      </div>
      <HomeStatus />
    </div>
  );
}
export default Home;
