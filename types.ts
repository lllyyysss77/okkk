
export enum RegionType {
  GLOBAL = 'GLOBAL',
  CHINA_MAINLAND = 'CHINA_MAINLAND'
}

export interface VoiceMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface AudioConfig {
  sampleRate: number;
  channels: number;
}
