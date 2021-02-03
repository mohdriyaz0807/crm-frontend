// import React,{useState} from 'react'

// const Leads = () => {
//     let url='https://crm-easy.herokuapp.com'
//     const [lead,setlead]=useState('')
//     const [loading,setloading]=useState(false)
//     useEffect(() => {
//         fetch(`${url}/leads`, {
//             method : "GET",
//             headers : {
//                "auth" : localStorage.getItem('token')
//             }
//         } ).then(res => res.json()).then((data) =>{
//             setLoading(false)
//             if(data.message === "success"){
//                console.log(data)
//                setlead(data.leads)
//             }
//             else{
//                setAlert({display : true , message : data.message })
//             }
//         }).catch((err) => {
//           setLoading(false)
//            setAlert({display : true , message : "Something went wrong try again later" })
//         })
//    }, [])
//     return (
//         <div>
        
//         </div>
//     )
// }

// export default Leads