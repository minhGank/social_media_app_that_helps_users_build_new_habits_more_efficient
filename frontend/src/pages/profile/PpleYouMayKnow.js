import { Dots } from "../../svg";
import { stories } from "../../data/home";
import AddFriendSmallCard from "./AddFriendSmallCard";
export default function PpleYouMayKnow() {
  return (
    <div className="pplumayknow">
      <div className="pplumayknow_header">
        People You May Know
        <div className="hover1 post_header_right ppl_circle">
          <Dots />
        </div>
      </div>
      <div className="pplumayknow_list">
        {stories.map((item, i) => (
          <AddFriendSmallCard item={item} key={i} />
        ))}
      </div>
    </div>
  );
}
