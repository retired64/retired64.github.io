export interface Mod {
  id: string
  title: string
  shortDescription: string
  thumbnail: string
  tags: string[]
  hasDownload: boolean
  downloadUrl?: string
  detailedDescription: string
  features: string[]
  activation: string
  youtubeVideoId?: string
  images: string[]
}
