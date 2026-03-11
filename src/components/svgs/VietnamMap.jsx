export default function VietnamMap() {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <img
        src="/vietnam_map.svg"
        alt="Bản đồ Việt Nam 1954-1975"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          objectPosition: 'center top',
          display: 'block'
        }}
      />
    </div>
  );
}
