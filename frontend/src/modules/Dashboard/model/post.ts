export interface postfeed {
    post_id?: number,
    user?:any,
    reports?:any,
    likes?:any,
    comments?: any,
    caption?: string,
    text?:string,
    media?: string,
    date_time?:number,
    type?:string
  }
  // "post_id": 2,
  // "user": {
  //   "id": 4,
  //   "username": "test1@test.com",
  //   "first_name": "test1",
  //   "last_name": "cyabge",
  //   "profile_pic": null
  // },
  // "reports": [],
  // "likes": [],
  // "comments": [],
  // "caption": "New Post Caption",
  // "text": "This is the text content of the new post.",
  // "media": null,
  // "date_time": "2024-02-02T08:55:33.955129Z"