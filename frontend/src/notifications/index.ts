import toastr from 'toastr';

export enum NotificationType {
  ERROR,
  INFO,
  SUCCESS,
};

const TOASTR_CONFIG = { newestOnTop: false };

export function sendNotification(message: string, type: NotificationType = NotificationType.INFO, title = undefined,) {
  switch(type) {
    case NotificationType.ERROR:
      toastr.error(message, title, TOASTR_CONFIG);
      break;
    case NotificationType.INFO:
      toastr.info(message, title, TOASTR_CONFIG);
      break;
    case NotificationType.SUCCESS:
      toastr.success(message, title, TOASTR_CONFIG);
      break;
    default:
      console.log(message);
      break;
  }
}
