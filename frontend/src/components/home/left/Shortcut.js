export default function Shortcut({ link, img, name }) {
  return (
    <a className="shortcut_item" href={link} target="blank" rel="noreferrer">
      <img src={img} />
      <span>{name}</span>
    </a>
  );
}
