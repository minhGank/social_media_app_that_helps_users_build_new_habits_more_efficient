export default function Story({ story }) {
  return (
    <div className="story">
      <img src={story.image} className="story_img" />
      <div className="story_profile_pic">
        <img src={story.profile_picture} />
      </div>
      <div className="story_profile_name">{story.profile_name}</div>
    </div>
  );
}
