
import './App.css';
import {useState} from "react";
import Axios from 'axios';

function App() {
      const [SellerName,setSellerName] = useState ("");
      const [SellerPhone,setSellerPhone] = useState (0);
      const [SellerAddress,setSellerAddress] = useState ("");
      const [Product,setProduct] = useState ("");
      const [Description,setDescription] = useState ("");

      const [sellerList,setSellerList] = useState([]);

      const addDetails = () =>{
             Axios.post("http://localhost:3001/create",{
                    SellerName: SellerName,
                    SellerPhone: SellerPhone,
                    SellerAddress: SellerAddress,
                    Product: Product,
                    Description: Description,
             }).then(() =>{
                    setSellerList([...sellerList, {
                     SellerName: SellerName,
                     SellerPhone: SellerPhone,
                     SellerAddress: SellerAddress,
                     Product: Product,
                     Description: Description,   
                    },
              ]);
             });
      };

      const getSellers = () =>{
       Axios.get("http://localhost:3001/sellers").then((response) =>{
              setSellerList(response.data);
       });
      };

      const updateSeller = (id) => {
       Axios.put("http://localhost:3001/update", { id: id }).then(
         (response) => {
           setSellerList(
             sellerList.map((val) => {
               return val.id == id
                 ? {
                     id: val.id,
                     SellerName: val.SellerName,
                     SellerPhone:val.SellerPhone,
                     SellerAddress: val.SellerAddress,
                     Product: val.Product,
                     Description: val.Description, 
                   }
                 : val;
             })
           );
         }
       );
     };
   
     const deleteSeller = (id) => {
       Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
         setSellerList(
           sellerList.filter((val) => {
             return val.id != id;
           })
         );
       });
     };
   



  return (
    <div className="App">
      <h1>CRUD OPERATION</h1>
      <div className="seller-name">
               <label>SellerName:</label>
        <input type="text" onChange={(event) => {setSellerName(event.target.value)}} />
               <label>SellerPhone:</label>
        <input type="number" onChange={(event) => {setSellerPhone(event.target.value)}} />
               <label>SellerAddress:</label>
        <input type="text" onChange={(event) => {setSellerAddress(event.target.value)}} />
               <label>Product:</label>
        <input type="text" onChange={(event) => {setProduct(event.target.value)}} />
               <label>Description:</label>
        <input  id="description" type="text" onChange={(event) => {setDescription(event.target.value)}} />
        <button onClick={addDetails}>Add Details</button>
        <br/>
      </div>
      <div className="details">
      <button onClick={getSellers}>Show Details</button>

      {sellerList.map((val,key) =>{
              return(
                     <><div className="view">
                            <div>
                                   <h3>SellerName: {val.SellerName}</h3>
                                   <h3>SellerPhone: {val.SellerPhone}</h3>
                                   <h3>sellerAddress: {val.SellerAddress}</h3>
                                   <h3>Product: {val.Product}</h3>
                                   <h3>Description: {val.Description}</h3>
                            </div>
                     </div>
                     <div>
                                   <input type="text" placeholder="....." onChange={(event) => { updateSeller(event.target.value); } } />
                                   <button onClick={() => { updateSeller(val.id); } }> {" "} Update </button>

                                   <button onClick={() => { deleteSeller(val.id); } }>Delete</button>

                            </div></>
              );
      }) }
      </div>
    </div>
  );
}

export default App;
