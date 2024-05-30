export type SendActiveCameraPayload = {
  cams: string[];
};

export type SendActiveCameraResponse = {
  message: string;
  data: SendActiveCameraData;
};

export type SendActiveCameraData = {
  streamUrl: string;
};
