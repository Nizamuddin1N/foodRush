import {useParams} from "react-router-dom";
import api from "../api/axios";

export default function Payment(){
    const {orderId} = useParams()
    const pay = async() =>{
        await api.post("/payments", {
            orderId
        })
        alert("Payment successful")
    }
    
    return(
        <div>
            <h2>Payment</h2>
            <button onClick={pay}>
                Pay Now
            </button>
        </div>
    )
}