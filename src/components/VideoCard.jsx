export default function VideoCard() {
  return (
    <div className="video-card">

      <h3>
        3D Video Preview
      </h3>

      <video
        width="100%"
        controls
      >
        <source
          src="/videos/tkr.mp4"
          type="video/mp4"
        />
      </video>

      <p>
        Total Knee Replacement (TKR)
      </p>

    </div>
  );
}