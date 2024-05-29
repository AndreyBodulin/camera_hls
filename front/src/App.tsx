import React from "react";
import HLSVideo from "./components/HLSVideo/HLSVideo";
import { Header } from "./components/header/Header";

function App() {
  return (
    <div>
      <Header />
      <HLSVideo
        src="http://localhost:3010/hls/stream1.m3u8"
        controls={true}
        width={"480px"}
      />
      <HLSVideo
        src="http://localhost:3010/hls/stream2.m3u8"
        controls={true}
        width={"480px"}
      />
      <HLSVideo
        src="http://localhost:3010/hls/stream3.m3u8"
        controls={true}
        width={"480px"}
      />
      <HLSVideo
        src="http://localhost:3010/hls/stream4.m3u8"
        controls={true}
        width={"480px"}
      />
      <HLSVideo
        src="http://localhost:3010/hls/stream5.m3u8"
        controls={true}
        width={"480px"}
      />
      <HLSVideo
        src="http://localhost:3010/hls/stream6.m3u8"
        controls={true}
        width={"480px"}
      />
    </div>
  );
}

export default App;
