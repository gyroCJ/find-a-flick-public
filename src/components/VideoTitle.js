const VideoTitle = ({ title, overview }) => {
  return (
    <div className="px-4 py-4 border-b border-[#e9e9e9] lg:border-none">
      <h1 className="text-2xl text-white font-semibold mb-4">{title}</h1>
      <p className="mb-6 text-[#e9e9e9] ">{overview}</p>
      <div className="flex flex-row items-center gap-6">
        <button className="text-black border border-white bg-white px-3 py-1 rounded-md">
          Play now
        </button>
        <button className="text-black border border-white bg-white px-3 py-1 rounded-md">
          More info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
