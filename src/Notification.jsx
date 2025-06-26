
import { IoNotifications } from "react-icons/io5";

function Notification({ notifications, setNotifications }) {
  const okunmamisSayisi = notifications.filter((n) => !n.okundu).length;

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      
      <button className="btn btn-outline-secondary position-relative">
        <IoNotifications size={20}/> Bildirimler
        {okunmamisSayisi > 0 && (
          <span className="badge bg-danger position-absolute top-0 start-100 translate-middle">
            {okunmamisSayisi}
          </span>
        )}
      </button>

     
      <div
        className="bg-white border rounded shadow mt-2"
        style={{
          position: 'absolute',
          top: '100%',
          right: 0,
          width: '250px',
          zIndex: 1000,
          maxHeight: '90px',
          overflowY: 'auto',
          whiteSpace: 'normal',
        }}
      >
        {notifications.length === 0 ? (
          <div className="text-muted p-2">Bildirim yok.</div>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              onClick={() =>
                setNotifications((prev) =>
                  prev.map((item) =>
                    item.id === n.id ? { ...item, okundu: true } : item
                  )
                )
              }
              className={`p-2 m-1 rounded ${
                n.okundu ? 'bg-light text-muted' : 'bg-warning'
              }`}
              style={{ cursor: 'pointer' }}
            >
              {n.mesaj}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Notification;
