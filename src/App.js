
import { About } from "./About";
import { Route, Routes } from "react-router";
import Header from "./Header";
import Home from "./Home";
import List from "./List";
import Contact from "./Contact";
import ProductItem from "./ProductItem";
import { useState ,useContext,useEffect} from "react";
import HomePage from "./pages/HomePage";
import AuthContext from "./store/auth-context";
import UserProfile from "./components/Profile/UserProfile";
import AuthPage from "./pages/AuthPage";
import Layout from "./components/Layout/Layout";
import Cart from "./Cart";



function App() {
  const authCtx=useContext(AuthContext)
  
  const [cartCount, setCartCount] = useState(0);
  

  const count=(data)=>{
    const item= data.reduce((acc,item)=>acc+1,0)
    setCartCount(item);
  }
  // const login=()=>{
  //   const email=localStorage.getItem('email')
  //   console.log(email)
  //   const updated=email.replace('@gmail.com', '');
  // }

  const getHandlder=async()=>{
    try{
      const email=localStorage.getItem('email')
      console.log(email)
      const updated=email.replace('@gmail.com', '');
      const res= await fetch(`https://crudcrud.com/api/a942991cd72e48e6802d8231fce8d6f2/${updated}`)
      const data= await res.json()
      count(data)   
    }catch(err){
      console.log(err)
    }   
  }
    
  useEffect(()=>{
    getHandlder()
  },[getHandlder])


  // const addHandler = (id) => {
  //     const item = products.find((item) => item.id === id);
  //     const existingItem = cart.findIndex((i) => i.id === id);
  //     if (existingItem!==-1) {
  //       setCart(prev=>{
  //         let avail=[...prev]
  //         avail[existingItem]={...item,quantity:item.quantity+1}
  //         return avail
          
  //       })
  //     } else {
  //       setCart((prev) => [...prev, item]);
  //     }
  //   };
  //   const remover=(id)=>{
    
  //     const decrease=cart.map(i=>{
  //         if (i.id===id && i.quantity>1){
  //             return {...i,quantity:i.quantity-1}
  //         }else if(i.id===id && i.quantity===1){
  //             return null
  //         }else{
  //             return i
  //         } 
  //     })
  //     const updatedDecrease=decrease.filter(i=>i!==null) 
  //     setCart(updatedDecrease)

  //   }
  return (
    <> 
     <Layout>
    
     {authCtx.isLoggedIn &&<Header cartCount={cartCount} />}
      <Routes>
        <Route path="/" element={
          <>
            {authCtx.isLoggedIn &&<Home />}
            {!authCtx.isLoggedIn &&<HomePage/>}
          </>}/>
        <Route>
            <Route path="/list"element={<List />}/>
            <Route path='/list/:id' element={<ProductItem getHandlder={getHandlder} />}/>
        </Route>
        <Route path='/profile' element={
          <>
           {authCtx.isLoggedIn && <UserProfile />}
           {!authCtx.isLoggedIn &&  <AuthPage getHandlder={getHandlder}/>}
          </>
        }/>
         {!authCtx.isLoggedIn&&<Route path='/auth' element={<AuthPage />} />}
        <Route path="/list" element={<List/>}/>
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path='/cart' element={<Cart  getHandlder={getHandlder}/>}/>
         
      </Routes>
    </Layout>
    </>
    
  ) 
}

export default App;
