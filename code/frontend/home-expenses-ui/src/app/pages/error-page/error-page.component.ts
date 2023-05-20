import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

export const ErrorPagePresets = {
  400: {
    errorTitle: 'Bad Request',
    errorDesc: 'The page you were looking for doesn’t exist.'
  },
  401: {
    errorTitle: 'Unauthorized Access',
    errorDesc: 'You do not have permission to access this page.'
  },
  403: {
    errorTitle: 'Forbidden',
    errorDesc: 'You do not have permission to access this page.'
  },
  404: {
    errorTitle: 'Page not found',
    errorDesc: 'The page you were looking for doesn’t exist.'
  },
  409: {
    errorTitle: 'File Conflict',
    errorDesc: 'Please verify your file and attempt to reupload.'
  },
  429: {
    errorTitle: 'Too many requests',
    errorDesc: 'Too many requests from this location, please wait and retry.'
  },
  500: {
    errorTitle: 'Something went wrong',
    errorDesc: 'The page you were looking for doesn’t exist.'
  },
  unknown: {
    errorTitle: 'Error',
    errorDesc: 'Something went wrong.'
  }
};

interface ErrorDetails {
  errorTitle: string;
  errorDesc: string;
}

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss']
})
export class ErrorPageComponent {
  @Input()
  errorCode = 'unknown';

  errorDetails: ErrorDetails;

  constructor(private readonly route: ActivatedRoute) {
    const param = Number(this.route.snapshot.paramMap.get('errorCode'));
    this.errorCode = Number.isInteger(param) && param >= 100 && param < 600 ? String(param) : '404';
    this.errorDetails = ErrorPagePresets[this.errorCode];
  }
}
