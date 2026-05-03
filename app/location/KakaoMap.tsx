export default function KakaoMap() {
  return (
    <div style={{ position: "relative", width: "100%", paddingTop: "56.25%" }}>
      <iframe
        src="/kakaomap.html"
        title="오시는 길 지도"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          border: "none",
          display: "block",
        }}
      />
    </div>
  );
}
