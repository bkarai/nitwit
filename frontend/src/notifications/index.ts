import toastr from 'toastr';

export enum NotificationType {
  ERROR,
  INFO,
  SUCCESS,
};

export function sendNotification(message: string, type: NotificationType = NotificationType.INFO, title = undefined,) {
  switch(type) {
    case NotificationType.ERROR:
      toastr.error(message, title, { newestOnTop: false });
      break;
    case NotificationType.INFO:
      toastr.info(message, title, { newestOnTop: false });
      break;
    case NotificationType.SUCCESS:
      toastr.success(message, title, { newestOnTop: false });
      break;
    default:
      console.log(message);
      break;
  }
}
