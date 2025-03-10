import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function StockData() {
    const [stocksdata, setStockData] = useState("");
    const navigate= useNavigate();

    const DisplayDetails=(id)=>{
        navigate("/stockdata/view/"+id)
    }

    const EditDetails=(id)=>{
        navigate("/stockdata/edit/"+id);
    }

    const RemoveDetails=(id)=>{
        if(window.confirm("Are you sure you want to delete?")){
            fetch("http://localhost:8000/stockdata/"+id,{
                method: 'DELETE',
            })
            .then((res)=>{
                alert("Removed Stock Data Successfully");
                window.location.reload();
            })
            .catch((err)=>console.log(err.message))
        }
    }
    useEffect(()=>{
        fetch('http://localhost:8000/stockdata')
        .then((res)=>res.json())
        .then((data)=>
            setStockData(data)).catch((err)=>
            console.log(err.message))
    },[])
    return(
        <div className="container">
            <h2>Stock Data Table</h2>
            <div className="table-container">
                <Link to="/stockdata/create" class= "btn btn-add">Add new Data Stock</Link>
                <table>
                    <thead>
                        <tr>
                            <th>Sl No</th>
                            <th>Date</th>
                            <th>Trade Code</th>
                            <th>High</th>
                            <th>Low</th>
                            <th>Open</th>
                            <th>Close</th>
                            <th>Volume</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            stocksdata && stocksdata.map((item, index)=>(
                                <tr key={item.id}>
                                <td>{index+1}</td>
                                <td>{item.date}</td>
                                <td>{item.trade_code}</td>
                                <td>{item.high}</td>
                                <td>{item.low}</td>
                                <td>{item.open}</td>
                                <td>{item.close}</td>
                                <td>{item.volume}</td>
                                <td>
                                    <button onClick={()=>DisplayDetails(item.id)} className="btn btn-info">View</button>
                                    <button onClick={()=>EditDetails(item.id)} className="btn btn-primary">Edit</button>
                                    <button onClick={()=>RemoveDetails(item.id)} className="btn btn-danger">Delete</button>
                                </td>
                            </tr>
                            )
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}