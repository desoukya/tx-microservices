export type AppResponseResults = {
  success: boolean;
  code: number;
  message: string;
  request_id: string;
  path: string;
  method: string;
  timestamp: string;
  count?: number;
  filter?: any;
};
