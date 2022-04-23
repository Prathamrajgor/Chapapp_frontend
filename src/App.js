import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import "./App.css";
import Logo from "./logo.jpg";
import Reactscroll from "react-scroll-to-bottom";
// import { data } from "autoprefixer";
import image from "./chat.png";

const socket = io("http://localhost:5000");
function App() {
  const [username, Newusername] = useState("");   
  const [formDisplay, NewformDisplay] = useState([
    "flex",
    "flex",
    "none",
    "none",
  ]);
  const [wrapperVisibility, NewwrapperVisibility] = useState(["block", "none"]);
  const [messages, Newmessages] = useState([
    {
      username: "demo",
      message: "Demo message",
      roomid: "b2LYSx",
    },
  ]);
  const [chat, Newchat] = useState("");
  const [roomid, Newroomid] = useState("");
  const [count, Newcount] = useState(0);
  const [password, Newpassword] = useState("");
  const [alert, Newalert] = useState("none");
  const [alertMessage, NewalertMessage] = useState(["", ""]);
  const [featureDisplay,NewfeatureDisplay]=useState("block") 
  // const sendMessgae=(data)=>{
  //   console.log(data  ," ONce Onmce   \n");
  //   console.log(messages);
  //   let temp=messages;
  //   temp.push(data);
  //   Newmessages(temp);
  //   Newcount(1)
  //   Newmessages(messages)
  // }

  useEffect(() => {
    socket.on("created", (msg) => {
      // console.log(msg);
      Newroomid(msg.roomid);
    });
    socket.on("receive", (data) => {
      // Newmessages([...messages,data])
      if (data.message === "room not found") {
        // console.log("room not found");
        NewalertMessage(["Room not found", "Re-enter roomID"]);
        Newalert("block");
        setTimeout(() => {
          Newalert("none");
        }, 3000);
      } else if (data.message === "Wrong username or password") {
        // console.log("wrong username and password");
        NewalertMessage(["Wrong Password", "Re-enter password"]);
        Newalert("block");
        setTimeout(() => {
          Newalert("none");
        }, 3000);
      } else {
        NewformDisplay(["none", "none", "none", "none"]);
        NewwrapperVisibility(["none", "block"]);
        Newmessages(data);
      }
      // else if()
      // NewformDisplay(["none", "none", "none", "none"]);
      // NewwrapperVisibility(["none", "block"]);
      // Newmessages(data);
    });
    socket.on("live-chat", (data) => {
      // sendMessgae(data)
      // console.log(data);
      Newmessages(() => {
        return [...messages, data];
      });
    });
  }, [socket, messages]);

  return (
    // Entry

    <div className="bg-[#F7F5F2] flex flex-col justify-between h-[100vh] w-[100w] font-quicksand">

      <div >

      

      <nav className="flex bg-[#A85CF9] shadow-lg">
        {/* auhysgd yugf */}
        {/* <Image/> */}
        <img src={image} className="sm:h-11 h-10 lg:h-16 my-2" alt="error " />
        <div className="  lg:text-2xl text-lg   lg:w-[90vw] sm:justify-center flex     items-center">
          Create and Join Custom Rooms
        </div>
      </nav>
      <div
        class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert"
        style={{ display: alert }}
      >
        <strong class="font-bold">{alertMessage[0]} </strong>
        <span class="block sm:inline">{alertMessage[1]} </span>
        <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
          <svg
            class="fill-current h-6 w-6 text-red-500"
            role="button"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <title>Close</title>
            <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
          </svg>
        </span>
      </div>
      <div className="wrapper" style={{ display: wrapperVisibility[0] }}>

        <div className="chid-wrapper shadow-lg  bg-gradient-to-r from-[#A88BEB] to-[#F8CEEC]">


      <div className="landing flex flex-col justify-center border   lg:space-x-4 h-72"    style={{ display: formDisplay[0] }}>
      <div className="wrapper  ml-5 space-y-4   ">

        <div className="messgae  flex flex-col  ">
          <p className=" font-anton text-4xl lg:text-5xl">
              <span className="text-red-600">Let's</span>  <span className="text-purple-900"> Chat</span> 
          </p>
          <p className="text-slate-700 lg:text-xl " >Let's Chat allows you to  Create and Join Anonymous rooms </p>

        </div>
      
        <div className="flex flex-row buttons ">
          
          <div
            className="w-36 flex justify-start  items-center "
            
            >
            <div>
              <button
                onClick={() => {
                  NewformDisplay(["none", "none", "block", "none"]);
                  NewfeatureDisplay("none")
                }}
                class="bg-blue-700  hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
              >
                Create Room
              </button>
            </div>
          </div>
          <div
            className="w-36  flex justify-start  items-center    "
            style={{ display: formDisplay[1] }}
            >
            <div>
              <button
                onClick={() => {
                  NewformDisplay(["none", "none", "none", "block"]);
                  NewfeatureDisplay("none")
                }}
                class="bg-blue-700 hover:bg-blue-800  text-white font-bold py-2 px-4 rounded"
                >
                Join Room
              </button>
            </div>
          </div>
          </div>

          
        </div>
        </div>
        </div>


        <div className="features  border-2 " style={{display:featureDisplay}}>
          <div className="text-3xl font-sans font-light flex mb-4 justify-center">
                Features
          </div>
          <div className="grid md:grid-cols-4 grid-cols-2  gap-y-2 gap-x-2">

                <div className="parent space-y-1  ">
                  <div className="cards  flex justify-center">
                    <img src="https://www.freevector.com/uploads/vector/preview/30642/Privacy_Guard.jpg" className="h-32 lg:h-44 shadow-sm rounded-3xl" alt="" />
                  </div>
                  <p className="text-center font-semibold text-xl text-slate-700">Privacy</p>
                </div>
                <div className="parent space-y-1   ">
                  <div className="cards  flex justify-center">
                    <img src="https://img.freepik.com/free-vector/illustration-vector-graphic-cartoon-character-cyber-security_516790-930.jpg" className="h-32 lg:h-44 shadow-md rounded-3xl" alt="" />
                  </div>
                  <p className="text-center font-semibold text-xl text-slate-700">Security</p>
                </div>
                <div className="parent space-y-1   ">
                  <div className="cards  flex justify-center">
                    <img src="https://img.freepik.com/free-vector/speed-website-icon-fast-browser-vector-white_88813-1451.jpg" className="h-32 shadow-md lg:h-44 rounded-2xl" alt="" />
                  </div>
                  <p className="text-center font-semibold text-xl text-slate-700">Fast</p>
                </div>
                <div className="parent space-y-1   ">
                  <div className="cards  flex justify-center">
                    <img src="https://png.pngtree.com/element_origin_min_pic/17/03/09/c5139d26bb4a6632ee19216ee13cf75f.jpg" className="h-32 shadow-md lg:h-44 rounded-2xl" alt="" />
                  </div>
                  <p className="text-center font-semibold text-xl text-slate-700">Group Chat</p>
                </div>
                
             
              
                
          </div>
        </div>
          


        <div className=" " style={{ display: formDisplay[2] }}>
          <div className="pt-2 lg:pl-4 pl-2">
            <button
              class="bg-[#8f34f0] hover:bg-[#8f34f0d7] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={() => {
                NewformDisplay(["flex", "flex", "none", "none"]);
                NewfeatureDisplay("block");
                Newpassword("")
                Newusername("")
              }}
            >
              <i class="fa-solid fa-backward"></i>
            </button>
          </div>

          {/*  Create Room Form */}
          <div className="w-[100vw]  flex  justify-center items-center mt-6">
            <div class=" ">
              <form class="bg-white lg:w-[50vw] shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div class="mb-4">
                  <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="username"
                  >
                    Create New Username
                  </label>
                  <input
                    value={username}
                    onChange={(event) => {
                      if (event.target.value.includes(" ")) {
                        Newusername(username);
                      } else {
                        Newusername(event.target.value);
                      }
                    }}
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    type="text"
                  />
                </div>
                {/* password */}
                <div class="mb-4">
                  <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="username"
                  >
                    Create New password
                  </label>
                  <input
                    value={password}
                    onChange={(event) => {
                      if (event.target.value.includes(" ")) {
                        Newpassword(password);
                      } else {
                        Newpassword(event.target.value);
                      }
                    }}
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    type="text"
                  />
                  <p class="text-black text-xs italic">
                    Dont Share Password with Anyone
                  </p>
                </div>

                <div class="flex items-center justify-between">
                  <button
                    onClick={() => {
                      socket.emit("create-room", {
                        username: username,
                        password: password,
                      });
                      NewwrapperVisibility(["none", "block"]);
                      Newmessages([]);
                    }}
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                  >
                    Create New Room
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Chat  */}

      <div className="chat" style={{ display: wrapperVisibility[1] }}>
        <div className="text-xl text-slate-900 ml-6 pt-0 flex">
          <p className="pt-2">The room id: {roomid}</p>

          <button
            onClick={() => {
              navigator.clipboard.writeText(roomid);
            }}
            className=" bg-[#035397] hover:bg-[#035397] hover:border-2 hover:border-red-400 cursor-pointer text-white font-bold border-2 text-sm h-9 w-20 ml-5 my-1 flex justify-center items-center rounded-2xl bg-"
          >
            <p className="mr-2">Copy</p>
            <p className="mr-0">
              <i class="fa-solid fa-paste"></i>
            </p>
          </button>
        </div>
        <p className="text-xs ml-6 pt-2 text-red-700">
          Share id with only people whome you want to allow
        </p>
        <div className="border-2 h-[80vh] mt-4 mx-6  items-end bg-slate-100 rounded-sm">
          <Reactscroll className="">
            <div className="chats h-[70vh]   text-slate-800">
              {messages.map((element) => {
                if (element.username === username) {
                  return (
                    <div className=" flex justify-end ml-7 mr-3   ">
                      <div className="my-2">
                        <div className="flex text-right">
                          <p className="bg-white shadow-sm rounded-lg py-2 px-2">
                            {element.message}{" "}
                          </p>
                        </div>
                        <div className="flex text-xs text-gray-500 justify-end px-2">
                          {element.username}
                        </div>
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div className="flex flex-col mr-7 ">
                      <div>
                        <div className="flex ml-1 pt-1 text-left">
                          <p className="bg-[#e4e4e4] shadow-sm rounded-lg py-2 px-2">
                            {element.message}{" "}
                          </p>
                        </div>
                        <div className="flex text-xs text-gray-500 justify-start px-2">
                          {element.username}
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          </Reactscroll>
          <div className="message  flex h-[10vh] border-t-[2px]  text-slate-800">
            <div className="input flex items-center  w-[87%] lg:w-[95%] ">
              <input
                value={chat}
                onChange={(event) => {
                  Newchat(event.target.value);
                  // console.log(chat);
                }}
                placeholder="    Message..."
                type="text"
                className="ml-2   rounded-full bg-gray-200 h-[6vh] w-[98%] "
                name=""
                id=""
              />
            </div>
            <div
              onClick={() => {
                let obj = {
                  username: username,
                  message: chat,
                  roomid: roomid,
                };
                socket.emit("send-message", {
                  username: username,
                  message: chat,
                  roomid: roomid,
                });
                // console.log(obj);
                let temp = messages;
                temp.push(obj);
                Newmessages(temp);
                Newchat("");
                // let temp=messages;
                // temp.push(obj);
                // Newmessages(temp)
                // Newmessages([...messages,{username:username}])
              }}
              className="icon cursor-pointer text-slate-600 w-[13%] lg:w-[5%] flex justify-center flex-col items-center"
              title="Send Message?"
            >
              <i class="fa-solid fa-share"> </i>
              <p className="text-[12px] ">Send</p>
            </div>
          </div>
        </div>
        <div className="flex h-18 justify-center pt-6 ">
          <div>
            <button
              onClick={() => {
                NewwrapperVisibility(["block", "none"]);
                NewformDisplay(["flex", "flex", "none", "none"]);
                window.location.reload();
              }}
              class="bg-[#573391] hover:bg-[#7a49c9] text-white font-bold py-2 px-4 rounded"
            >
              Exit Room
            </button>
          </div>
        </div>
      </div>

      {/* Join Room Form */}
      <div
        className="join_room_form justify-center"
        style={{ display: formDisplay[3] }}
      >
        <div className="pt-2 lg:pl-4 pl-2">
          <button
            class="bg-[#712B75] hover:bg-[#aa43af] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={() => {
              NewformDisplay(["flex", "flex", "none", "none"]);
              NewfeatureDisplay("block");
              Newpassword("");
              Newroomid("");
              Newusername("")
            }}
          >
            <i class="fa-solid fa-backward"></i>
          </button>
        </div>

        <div class="w-full max-w-[100%] flex justify-center mt-8 ">
          <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div class="mb-4">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="username"
              >
                Username
              </label>
              <input
                value={username}
                onChange={(event) => {
                  if (event.target.value.includes(" ")) {
                    Newusername(username);
                  } else {
                    Newusername(event.target.value);
                  }
                  // console.log(username);
                  socket.emit();
                }}
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Username"
              />
            </div>
            <div class="mb-4">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="username"
              >
                Password
              </label>
              <input
                value={password}
                onChange={(event) => {
                  if (event.target.value.includes(" ")) {
                    Newpassword(password);
                  } else {
                    Newpassword(event.target.value);
                  }
                  // console.log(password);
                }}
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Password"
              />
            </div>
            <div class="mb-4">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="username"
              >
                Room id
              </label>
              <input
                value={roomid}
                onChange={(event) => {
                  if (event.target.value.includes(" ")) {
                    Newroomid(roomid);
                  } else {
                    Newroomid(event.target.value);
                  }
                  // console.log(roomid);
                }}
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Room Id"
              />
            </div>

            <div class="flex items-center justify-between lg:w-[70vw]">
              <button
                onClick={() => {
                  if (roomid === "" || username === "" || password === "") {
                    // console.log("Cannot be Empty");
                  } else {
                    socket.emit("join-room", {
                      username: username,
                      password: password,
                      roomid: roomid,
                    });
                  }
                }}
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                Join Now
              </button>
            </div>
          </form>
        </div>
      </div>
      </div>
      <div className=" text-sm  text-slate-400 text-center mb-4">
        &copy; Pratham Rajgor 
      </div>
    </div>
  );
}

export default App;
