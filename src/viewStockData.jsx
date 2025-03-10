import { Link, useParams } from "react-router-dom";
import {useEffect, useState} from "react";

export default function ViewStockData() {
    const {stockdataid}= useParams();
    const [stockdata, setStockData]=useState({});
    useEffect(()=>{
        fetch("http://localhost:8000/stockdata/"+stockdataid)
        .then((res)=>res.json())
        .then((data)=>setStockData(data))
        .catch((err)=>console.log(err.message))
    },[]);
    return(
        <div className="container">
            <h1>Stock Data Details</h1>
            { stockdata && <div className="details">
                <p><strong>ID</strong>{stockdata.id}</p>
                <p><strong>Date</strong>{stockdata.date}</p>
                <p><strong>Trade Code</strong>{stockdata.trade_code}</p>
                <p><strong>High</strong>{stockdata.high}</p>
                <p><strong>Low</strong>{stockdata.low}</p>
                <p><strong>Open</strong>{stockdata.open}</p>
                <p><strong>Close</strong>{stockdata.close}</p>
                <p><strong>Volume</strong>{stockdata.volume}</p>
            </div>}
            <button className="btn-print" onClick={() => window.print()}>Print</button>
            <Link to="/" class="btn btn-back">Back</Link>
        </div>
    )
}