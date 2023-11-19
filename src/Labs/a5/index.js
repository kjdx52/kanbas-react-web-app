import EncodingParametersInURLs from "./EncodingParametersInURLs";
import SimpleAPIExamples from "./SimpleAPIExamples";
import WorkingWithArrays from "./WorkingWithArrays";
import WorkingWithObjects from "./WorkingWithObjects";
const REACT_BASE = process.env.REACT_APP_BASE;
function Assignment5() {
    return (
        <div>
            <h1>Assignment 5</h1>
            <div className="list-group">
                <a href={`${REACT_BASE}/a5/welcome`}
                   className="list-group-item">
                    Welcome
                </a>
            </div>
            <SimpleAPIExamples/>
            <EncodingParametersInURLs/>
            <WorkingWithObjects/>
            <WorkingWithArrays/>
        </div>
    );
}
export default Assignment5;

