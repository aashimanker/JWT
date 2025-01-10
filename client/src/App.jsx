import { useState } from 'react'
import axios from 'axios'
import { useAuth } from './store/auth'


function App() {
  const [student,setStudent] = useState({
    studentID:"",
    name:"",
    email:"",
    year:"",
})

const handleInput = (e)=>{
    let name = e.target.name
    let value = e.target.value

    setStudent({
      ...student,
      [name]:value, //giving dynamic value 
    })
  }

  const {storeTokenInLS,user,isLoggedIn,LogoutUser} = useAuth()

  const handleSubmit = async(e)=>{
    e.preventDefault()
    alert("Success")

    try {
        const response = await axios.post("http://localhost:5000/api/student/register",student)

        // console.log(studentDetails.data)
        // console.log(studentDetails.status)
        console.log("Response: ",response.data)
        const data = response.data
        console.log("Token: ",data.token)
        const token = data.token
        storeTokenInLS(token)

        if (response.status === 200){
            alert("successful registration")
        }
        // else{
        //     console.log("error in registrering student")
           
        // }
    } catch (error) {
        console.log("registration error: ",error)
    }
  }

  return (
    !isLoggedIn ? 
    <>
      <div className="py-16">
      <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
        <div
          className="hidden lg:block lg:w-1/2 bg-cover"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1546514714-df0ccc50d7bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80")'
          }}
        ></div>
        <div className="w-full p-8 lg:w-1/2">
          <h2 className="text-2xl font-semibold text-gray-700 text-center">
            Brand
          </h2>
          <p className="text-xl text-gray-600 text-center">Welcome back!</p>
          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Student-ID
            </label>
            <input
              className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
              type="studentID" 
              value={student.studentID}
              onChange={handleInput}
              name='studentID'
              placeholder='studentID'
              id='studentID'
              required
              autoComplete='off'
            />
          </div>
          <div className="mt-4">
            <div className="flex justify-between">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Name
              </label>
            </div>
            <input
              className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
              type="text"
              name="name"
              placeholder='name'
              id='name'
              required
              autoComplete='off'
              value={student.name}
              onChange={handleInput}
            />
          </div>
          <div className="mt-4">
            <div className="flex justify-between">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                email
              </label>
            </div>
            <input
              className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
              type="text"
              name='email'
              placeholder='email'
              id='email'
              required
              autoComplete='off'
              value={student.email}
              onChange={handleInput}
            />
          </div>
          <div className="mt-4">
            <div className="flex justify-between">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                year
              </label>
            </div>
            <input
              className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
              type="text"
              name='year'
              placeholder='year'
              id='year'
              required
              autoComplete='off'
              value={student.year}
              onChange={handleInput}
            />
          </div>
          <div className="mt-8">
            <button className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600"
            onClick={handleSubmit}>
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
    </>:<>
    <div className="bg-gray-100 p-4 rounded shadow-md max-w-sm mx-auto text-center">
    <p className="text-lg font-semibold text-gray-700">
        Hello <br />
        <span className="text-blue-600">{user.name}</span>
    </p>
    <p className="text-sm text-gray-500">{user.email}</p>
    <button 
        onClick={LogoutUser} 
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
    >
        Log Out
    </button>
</div>
    </>
  )
}

export default App
