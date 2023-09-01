export default function LeftLink({ img, text, notification }) {
  return (
    <div className="left_link hover1">
      <img src={`../../../self-icon/${img}.png`} />
      {notification !== undefined ? (
        <div className="col">
          <div className="col_1">{text}</div>
          <div className="col_2">{notification}</div>
        </div>
      ) : (
        <span>{text}</span>
      )}
    </div>
  );
}
