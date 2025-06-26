
import ReactFlow, { Background, Controls } from "reactflow";
import "reactflow/dist/style.css";

const nodeStyle = {
  padding: 10,
  borderRadius: 8,
  border: "1px solid #888",
  background: "#f9f9f9",
};

const nodes = [
  {
    id: "1",
    data: { label: "Kullanıcı Verisi Çek (API)" },
    position: { x: 100, y: 50 },
    style: nodeStyle,
  },
  {
    id: "2",
    data: { label: "Tabloda Göster" },
    position: { x: 100, y: 150 },
    style: nodeStyle,
  },
  {
    id: "3",
    data: { label: "Bildirim Gönder" },
    position: { x: 100, y: 250 },
    style: nodeStyle,
  },
  {
    id: "4",
    data: { label: "Tema Değiştir" },
    position: { x: 300, y: 250 },
    style: nodeStyle,
  },
];

const edges = [
  { id: "e1-2", source: "1", target: "2", animated: true },
  { id: "e2-3", source: "2", target: "3", animated: true },
  { id: "e3-4", source: "3", target: "4", animated: true },
];

export default function FlowChart() {
  return (
    <div
      style={{
        width: "100%",
        height: "60vh",
        minHeight: 300, 
        border: "1px solid #ddd",
        borderRadius: 8,
      }}
    >
      <ReactFlow nodes={nodes} edges={edges} fitView>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
