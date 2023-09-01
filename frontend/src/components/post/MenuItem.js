export default function MenuItem({ icon, title, subtitle, img }) {
  return (
    <li className="hover1">
      {icon ? <i className={`${icon}`}></i> : <img src={img} />}
      <div className="post_menu_text">
        <span>{title}</span>
        {subtitle && <span className="menu_post_col">{subtitle}</span>}
      </div>
    </li>
  );
}
