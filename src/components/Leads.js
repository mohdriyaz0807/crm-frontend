// import React,{useState} from 'react'

// const Leads = () => {
//     const url="#"
//     const [lead,setlead]=useState('')
//     const [loading,setloading]=useState(false)
//     const [alert,setalert]=useState()
//     useEffect(() => {
//         fetch(`${url}/leads`, {
//             method : "GET",
//             headers : {
//                "auth" : localStorage.getItem('crmApplication')
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