import toastr from 'toastr';

export enum NotificationType {
  ERROR,
  INFO,
  SUCCESS,
};

const TOASTR_CONFIG = {
  newestOnTop: false,
  showDuration: 300,
  hideDuration: 1000,
  timeOut: 3000,
  extendedTimeOut: 1000,
  showEasing: "swing",
  hideEasing: "linear",
  showMethod: "slideDown",
  hideMethod: "fadeOut"
};

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
