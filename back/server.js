const express = require("express");
const { spawn } = require("child_process");
const path = require("path");
const fs = require("fs");

const app = express();
const port = 3010;

// Путь к папке, где будут храниться HLS сегменты и плейлисты
const hlsDir = path.join(__dirname, "hls");
if (!fs.existsSync(hlsDir)) {
  fs.mkdirSync(hlsDir, { recursive: true });
}

// Функция для запуска ffmpeg
const startFFmpeg = () => {
  const ffmpeg = spawn("ffmpeg", [
    "-rtsp_transport",
    "tcp",
    "-buffer_size",
    "100000k",
    "-i",
    rtspUrl_1,
    "-rtsp_transport",
    "tcp",
    "-buffer_size",
    "100000k",
    "-i",
    rtspUrl_2,
    "-rtsp_transport",
    "tcp",
    "-buffer_size",
    "100000k",
    "-i",
    rtspUrl_3,
    "-rtsp_transport",
    "tcp",
    "-buffer_size",
    "100000k",
    "-i",
    rtspUrl_4,
    "-rtsp_transport",
    "tcp",
    "-buffer_size",
    "100000k",
    "-i",
    rtspUrl_5,
    "-rtsp_transport",
    "tcp",
    "-buffer_size",
    "100000k",
    "-i",
    rtspUrl_6,
    "-map",
    "0:v",
    "-codec:v",
    "libx264",
    "-f",
    "hls",
    "-hls_time",
    "10",
    "-hls_list_size",
    "5",
    "-hls_flags",
    "delete_segments",
    path.join(hlsDir, "stream1.m3u8"),
    "-map",
    "1:v",
    "-codec:v",
    "libx264",
    "-f",
    "hls",
    "-hls_time",
    "10",
    "-hls_list_size",
    "5",
    "-hls_flags",
    "delete_segments",
    path.join(hlsDir, "stream2.m3u8"),
    "-map",
    "2:v",
    "-codec:v",
    "libx264",
    "-f",
    "hls",
    "-hls_time",
    "10",
    "-hls_list_size",
    "5",
    "-hls_flags",
    "delete_segments",
    path.join(hlsDir, "stream3.m3u8"),
    "-map",
    "3:v",
    "-codec:v",
    "libx264",
    "-f",
    "hls",
    "-hls_time",
    "10",
    "-hls_list_size",
    "5",
    "-hls_flags",
    "delete_segments",
    path.join(hlsDir, "stream4.m3u8"),
    "-map",
    "4:v",
    "-codec:v",
    "libx264",
    "-f",
    "hls",
    "-hls_time",
    "10",
    "-hls_list_size",
    "5",
    "-hls_flags",
    "delete_segments",
    path.join(hlsDir, "stream5.m3u8"),
    "-map",
    "5:v",
    "-codec:v",
    "libx264",
    "-f",
    "hls",
    "-hls_time",
    "10",
    "-hls_list_size",
    "5",
    "-hls_flags",
    "delete_segments",
    path.join(hlsDir, "stream6.m3u8"),
  ]);

  ffmpeg.stdout.on("data", (data) => {
    console.log(`stdout: ${data}`);
  });

  ffmpeg.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });

  ffmpeg.on("close", (code) => {
    console.log(`ffmpeg process exited with code ${code}`);
  });
};

const startFFmpegAll = (arr) => {
  const arrData = arr.reduce((acc, item) => {
    return [
      ...acc,
      `-rtsp_transport`,
      `tcp`,
      `-buffer_size`,
      `100000k`,
      `-i`,
      item,
    ];
  }, []);

  const ffmpeg = spawn("ffmpeg", [
    ...arrData,
    "-filter_complex",
    "[0:v]scale=640:480[v0];[1:v]scale=640:480[v1];[2:v]scale=640:480[v2];[3:v]scale=640:480[v3];[4:v]scale=640:480[v4];[5:v]scale=640:480[v5];[v0][v1][v2][v3][v4][v5]xstack=inputs=6:layout=0_0|640_0|1280_0|0_480|640_480|1280_480[v]",
    "-map",
    "[v]",
    "-c:v",
    "libx264",
    "-f",
    "hls",
    "-hls_time",
    "10",
    "-hls_list_size",
    "5",
    "-hls_flags",
    "delete_segments",
    path.join(hlsDir, "streamAll.m3u8"),
  ]);
  ffmpeg.stdout.on("data", (data) => {
    console.log(`stdout: ${data}`);
  });

  ffmpeg.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });

  ffmpeg.on("close", (code) => {
    console.log(`ffmpeg process exited with code ${code}`);
  });
};
const Cam_obj = {
  cam_1: {
    name: "Угловая камера коридора правого крыла",
    rtsp: "rtsp://admin:Qwerty123@192.168.1.32:554/cam/realmonitor?channel=1&subtype=1",
  },
  cam_2: {
    name: "Кабинет 301",
    rtsp: "rtsp://admin:Qwerty123@192.168.1.33:554/cam/realmonitor?channel=1&subtype=1",
  },
  cam_3: {
    name: "Коридор правого крыла",
    rtsp: "rtsp://admin:Qwerty123@192.168.1.34:554/cam/realmonitor?channel=1&subtype=1",
  },
  cam_4: {
    name: "Угловая камера коридора левого крыла",
    rtsp: "rtsp://admin:Qwerty123@192.168.1.35:554/cam/realmonitor?channel=1&subtype=1",
  },
  cam_5: {
    name: "Холл",
    rtsp: "rtsp://admin:Qwerty123@192.168.1.36:554/cam/realmonitor?channel=1&subtype=1",
  },
  cam_6: {
    name: "Коридор левого крыла",
    rtsp: "rtsp://admin:Qwerty123@192.168.1.37:554/cam/realmonitor?channel=1&subtype=1",
  },
};

// Запускаем ffmpeg при старте сервера
// startFFmpeg();
//startFFmpegAll();

// Отдача HLS сегментов и плейлиста клиенту
// app.use("/hls", express.static(hlsDir));
app.use("/hls", express.static(path.join(__dirname, "hls")));
app.use(express.json());

app.get("/", (req, res) => {
  let data = JSON.stringify(Cam_obj);
  res.send(data);
});

app.post("/quad", (req, res) => {
  const payload = req.body;
  startFFmpegAll(payload.cams);

  res.status(200).json({
    message: "success",
    data: { streamUrl: "http://localhost:3010/hls/streamAll.m3u8" },
  });
});

// Страница с видеоплеером
// app.get("/", (req, res) => {
//   res.send(`
//     <!DOCTYPE html>
//     <html>
//     <head>
//       <title>HLS Stream</title>
//       <script src="https://cdn.jsdelivr.net/npm/hls.js@latest"></script>
//     </head>
//     <body>
//       <video id="video" height=480px width=480px autoplay controls></video>
//       <script>
//         if (Hls.isSupported()) {
//           var video = document.getElementById('video');
//           var hls = new Hls();
//           hls.loadSource('/hls/streamAll.m3u8');
//           hls.attachMedia(video);
//           hls.on(Hls.Events.MANIFEST_PARSED, function() {
//             video.play();
//           });
//         }
//       </script>
//     </body>
//     </html>
//   `);
// });

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
