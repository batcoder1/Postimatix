
export class WebhookMap  {

  static toBackend(raw: any): any {
    return {
      id: raw.id_str,
      originalTweetId: raw.in_reply_to_status_id_str,
      user: raw.user.screen_name,
    };
  }
}
