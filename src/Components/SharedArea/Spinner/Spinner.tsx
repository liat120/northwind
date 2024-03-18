import "./Spinner.css";
import imageSource from "../../../Assets/Images/gif.gif"

export function Spinner(): JSX.Element {
    return (
        <div className="Spinner">

            <img src= {imageSource} />
			
        </div>
    );
}
