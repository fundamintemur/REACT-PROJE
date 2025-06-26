import { useState,useEffect} from 'react';
import Table from './Table';
import Notification from "./Notification";
import FlowChart from './FlowChart';
import { IoSunnyOutline } from "react-icons/io5";
import { MdModeNight } from "react-icons/md";
import './App.css';


function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [users,setUsers]=useState([]);
  const temaDegistir = () => {
    setDarkMode(!darkMode);
  };
 
   useEffect(() => {
    const interval = setInterval(() => {
      const yeniBildirim = {
        id: Date.now(),
        mesaj: "Kullanıcı eklendi!",
        okundu: false,
      };
      setNotifications((prev) => [yeniBildirim, ...prev]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);


   useEffect(() => {
  fetch('https://jsonplaceholder.typicode.com/users')
    .then((res) => res.json())
    .then((data) => {
      setUsers(data);
    });
}, []);

  // const users = [
  //   { name: 'Funda', surname: 'Mintemur', email: 'mintemurfunda@gmail.com' },
  //   { name: 'Ayşe', surname: 'Ergün', email: 'ayseergun@gmail.com' },
  //   { name: 'Jones', surname: 'Smith', email: 'jonessmith@gmail.com' },
  // ];

  return (
    <div className={darkMode ? 'app dark' : 'app light'}>
      <div className="d-flex justify-content-between align-items-center p-2 flex-wrap" style={{ marginBottom: '100px' }}>
      <button className="tema-btn" onClick={temaDegistir}>
        {darkMode ? <IoSunnyOutline size={20}/> : <MdModeNight size={20}/>}
      </button>
    
        <Notification
          notifications={notifications}
          setNotifications={setNotifications}
        />
      </div>
      <Table
        searchable={true}
        head={[
          { name: 'Ad-Soyad', sortable: true },
          { name: 'E-posta', sortable: true },
        ]}
        body={users.map((user) => [
          `${user.name} ${user.username}`,
          user.email,
        ])}
      />
      <div className='mt-2'>
       <FlowChart/>
      </div>
      
    </div>
  );
}

export default App;
