// import React ,{useState} from "react";
// import { FormControl,Input,InputLabel , Button } from '@material-ui/core'

// function Add({setData , data, channel}) {
//     let url='https://crm-easy.herokuapp.com'


//   const handleAdd = async () => {
//     var lead = await fetch(`${url}/${channel}`,{
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "auth" : localStorage.getItem('token')
//       },
//       body : JSON.stringify(data)
//     }).then((res) => res.json())
//     if(lead.message === "success"){
//       console.log(lead.message)
//       setLoading(false)
//       setData({...data , email : '' , description : ""} )
//     }
//     else{
//       console.log(lead.message)
//       setLoading(false)
//     }

//   }

//   const handleEdit = async() =>{
//     try{
//     var lead = await fetch(`${url}/${channel}`,{
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//         "auth" : localStorage.getItem('crmApplication')
//       },
//       body : JSON.stringify(data)
//     }).then((res) => res.json())
//     if(lead.message === "success"){
//       console.log(lead.message)
//       setLoading(false)
//       setData({status : "new"  , email : '' , description : ""} )
//     }
//     else{
//       console.log(lead.message)
//       setLoading(false)
//     }
//     }catch(err) {
//       setLoading(false)
//     }
//   }

//   const servicerequestArray=['Created','Open','In process','Released','Cancelled','Completed']
//   const leadArray=['new','Contacted','Qualified','Lost','Cancelled','Confirmed']

//   const handleOnSubmit = async (event) => {
//     event.preventDefault()
//     setLoading(true)

//     if(data._id)
//     handleEdit();
//     else
//     handleAdd();

//   }

//   const handleOnChange = (event) => {
//     const prop = event.target.name;
//     const value = event.target.value;
//     var temp = JSON.parse(JSON.stringify(data))
//     temp[prop] = value;
//     setData(temp)
//   }
  
//   const [loading , setLoading ] = useState(false)

//   return (
//     <>
//     <<Grid
//   container
//   direction="column"
//   justify="center"
//   alignItems="center"
// >
//       <Form.Group as={Col} md="3" >
//       <InputLabel>Email Contacts </InputLabel>
//           <Input placeholder="Email" type="email" onChange={handleOnChange} value={data.email} name="email" />
//     </Form.Group>
//     <Form.Group as={Col} md="3" >
//     <InputLabel>{channel} </InputLabel>
//           <Input placeholder={channel} type="text" onChange={handleOnChange} value={data.description} name="description" />
          
//     </Form.Group>
//         <FormControl  as={Col} >
//           <InputLabel  htmlFor="inlineFormCustomSelect">Status</InputLabel>
//           <Select as="select" id="inlineFormCustomSelect" onChange={handleOnChange} value={data.status} name="status" >
//             {data._id ?  <> 
//             <MenuItem  value="new">new</MenuItem >
//             </> : <MenuItem  value="new">new</MenuItem > }
//           </Select>
//           </FormControl >

//           <Form.Group as={Col} md="3" className="pt-4" >
//   <Button type="submit" disabled={loading}>{loading ? "Please Wait" : "Submit"}</Button>
//         </Form.Group>
//         </Form.Row>
//     </Form>
//         </Grid>
//     </>
//   );
// }

// export default Add