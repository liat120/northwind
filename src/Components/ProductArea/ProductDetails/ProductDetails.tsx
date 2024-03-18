import { useParams } from "react-router-dom";
import "./ProductDetails.css";

export function ProductDetails(): JSX.Element {

    const params = useParams();
    const id = +params.id;
    console.log(id);

    return (
        <div className="ProductDetails">
            details..
			
        </div>
    );
}
