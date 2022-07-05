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

export interface Scenic {
  picUrl: string,
  title: string
}

export interface ActivityList {
  ActivityID: string,
  ActivityName: string,
  Description: string,
  Particpation: string,
  Location: string,
  Address: string,
  Phone: string,
  Organizer: string,
  StartTime: string,
  EndTime: string,
  Picture: any, // 它的屬性內容是動態的，不確定數量的
  Position: {
    PositionLon: number,
    PositionLat: number,
    GeoHash: string
  },
  Class1: string,
  TravelInfo: string,
  SrcUpdateTime: string,
  UpdateTime: string
}

export interface DelicacyList {
  RestaurantID: string,
  RestaurantName: string,
  Description: string,
  Address: string,
  ZipCode: string,
  Phone: string,
  OpenTime: string,
  WebsiteUrl: string,
  Picture: {
    PictureUrl1: string,
    PictureDescription1: string
  },
  Position: {
    PositionLon: number,
    PositionLat: number,
    GeoHash: string
  },
  Class: string,
  SrcUpdateTime: string,
  UpdateTime: string
}

export interface AccommodationList {
  HotelID: string,
  HotelName: string,
  Description: string,
  Address: string,
  ZipCode: string,
  Phone: string,
  Picture: any, // 它的屬性內容是動態的，不確定數量的
  Position: {
    PositionLon: number,
    PositionLat: number,
    GeoHash: string
  },
  Class: string,
  ServiceInfo: string,
  ParkingInfo: string,
  SrcUpdateTime: string,
  UpdateTime: string
}
