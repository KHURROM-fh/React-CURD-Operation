import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditStockData() {
    const {stockdataid}= useParams();
    const [id,setId]=useState("");
    const [date,setDate]=useState("");
    const [tradecode,setTradecode]=useState("");
    const [high,setHigh]=useState("");
    const [low,setLow]=useState("");
    const [open,setOpen]=useState("");
    const [close,setClose]=useState("");
    const [volume,setVolume]=useState("");
    const [validation, setValidation]= useState(false);
    const navigate= useNavigate();
    //const [stockdata, setStockData]=useState({});
    useEffect(()=>{
        fetch("http://localhost:8000/stockdata/"+stockdataid)
        .then((res)=>res.json())
        .then((data)=>{
            setId(data.id);
            setDate(data.date);
            setTradecode(data.tradecode);
            setHigh(data.high);
            setLow(data.low);
            setOpen(data.open);
            setClose(data.close);
            setVolume(data.volume);       
        }
        )
        .catch((err)=>console.log(err.message))
    },[stockdataid]);
    const handleSubmit= (e)=>{
        e.preventDefault();
        const stockData={id,date,tradecode,high,low,open,close,volume};
        fetch("http://localhost:8000/stockdata/"+stockdataid,{
            method: 'PUT',
            headers:{
                "content-type" : "application/json"
            },
            body: JSON.stringify(stockData)
        })
        .then((res)=>{
            alert("Stock Data Updated Successfully");
            navigate("/")
        })
        .catch((err)=>console.log(err.message))
    }
    return(
        <div className="container">
            <h2>Edit The Stock Data</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="id">ID</label>
                <input type="text" id= "id" name="id" required value={id} onChange={e=>setId (e.target.value)}/>
                {id.length===0 && validation && <span className="errorMsg">Please Enter Your ID</span>}

                <label htmlFor="date">Date</label>
                <input type="text" id= "date" name="date" required value={date} onChange={e=>setDate(e.target.value)}/>
                {id.length===0 && validation && <span className="errorMsg">Please Enter Date</span>}

                <label htmlFor="tradecode">Trade Code</label>
                <input type="text" id= "tradecode" name="tradecode" required value={tradecode} onChange={e=>setTradecode(e.target.value)}/>
                {tradecode.length===0 && validation && <span className="errorMsg">Please Enter Trade Code</span>}

                <label htmlFor="high">High</label>
                <input type="text" id= "high" name="high" required value={high} onChange={e=>setHigh(e.target.value)}/>

                <label htmlFor="low">Low</label>
                <input type="text" id= "low" name="low" required value={low} onChange={e=>setLow(e.target.value)}/>

                <label htmlFor="open">Open</label>
                <input type="text" id= "open" name="open" required value={open} onChange={e=>setOpen(e.target.value)}/>

                <label htmlFor="close">Close</label>
                <input type="text" id= "close" name="close" required value={close} onChange={e=>setClose(e.target.value)}/>

                <label htmlFor="volume">Volume</label>
                <input type="text" id= "volume" name="volume" required value={volume} onChange={e=>setVolume(e.target.value)}/>

                <div>
                <button className="btn btn-save">Update</button>
                <Link to="/" className="btn btn-back">Back</Link>
                </div>
            </form>
        </div>
    )
}