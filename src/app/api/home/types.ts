export interface ScenicSpot {
  ScenicSpotID: string,
  ScenicSpotName: string,
  DescriptionDetail: string,
  Description: string,
  Phone: string,
  Address: string,
  ZipCode: string,
  TravelInfo: string,
  OpenTime: string,
  Picture: {
    PictureUrl1: string,
    PictureDescription1: string,
  },
  Position: {
    PositionLon: string,
    PositionLat: string,
    GeoHash: string
  },
  ParkingPosition: undefined,
  TicketInfo: string,
  Remarks: string,
  SrcUpdateTime: string,
  UpdateTime: string
}
