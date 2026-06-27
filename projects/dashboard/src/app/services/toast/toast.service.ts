import { Injectable } from '@angular/core';
import { toast, ExternalToast, PromiseT } from 'ngx-sonner';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor() {}

  present(message: string, data?: ExternalToast) {
    toast(message, data);
  }

  loading(message: string, data?: ExternalToast) {
    toast.loading(message, data);
  }

  promise(promise: PromiseT, data?: ExternalToast) {
    toast.promise(promise, data);
  }

  success(message: string, data?: ExternalToast) {
    toast.success(message, data);
  }

  info(message: string, data?: ExternalToast) {
    toast.info(message, data);
  }

  warning(message: string, data?: ExternalToast) {
    toast.warning(message, data);
  }

  error(message: string, data?: ExternalToast) {
    toast.error(message, data);
  }
}
