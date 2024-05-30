export type CameraResponse = Record<string, CamData>;

export type CamData = {
  name: string;
  rtsp: string;
};
