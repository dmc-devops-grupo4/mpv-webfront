import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function jsonToFormData(data: any): FormData {
  const formData = new FormData();
  buildFormData(formData, data);
  return formData;
}

function buildFormData(
  formData: FormData,
  data: any,
  parentKey: any = undefined
): void {
  if (
    data &&
    typeof data === 'object' &&
    !(data instanceof Date) &&
    !(data instanceof File)
  ) {
    let separationOpen = '';
    let separationClose = '';
    Object.keys(data).forEach((key: any) => {
      if (isNaN(key) === true) {
        // es letra
        separationOpen = '.';
        separationClose = '';
      } else {
        // es número
        separationOpen = '[';
        separationClose = ']';
      }
      buildFormData(
        formData,
        data[key],
        parentKey
          ? `${parentKey}${separationOpen}${key}${separationClose}`
          : key
      );
    });
  } else {
    const value = data == null ? '' : data;

    formData.append(parentKey, value);
  }
}

export function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) {
    return '0 Bytes';
  }

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export function requiredFileType(types: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const file = control.value as File;
    if (file) {
      const extension = file.type.split('/')[1]?.toLowerCase();
      if (extension) {
        for (const type of types) {
          if (type.toLowerCase() === extension) {
            return null;
          }
        }
      }
      return {
        requiredFileType: file.type,
      };
    }
    return null;
  };
}

export function fileMinSizeValidator(minSize: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const file = control.value as File;
    if (file && minSize) {
      const size = file.size;
      if (size > minSize) {
        return null;
      }
      return { fileMinSize: { requiredSize: minSize, actualSize: size } };
    }
    return null;
  };
}

export function fileMaxSizeValidator(maxSize: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const file = control.value as File;
    if (file && maxSize) {
      const size = file.size;
      if (size <= maxSize) {
        return null;
      }
      return { fileMaxSize: { requiredSize: maxSize, actualSize: size } };
    }
    return null;
  };
}

export function requiredFileTypeValidator(types: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const file = control.value as File;
    if (file && types) {
      // const extension = file.type.split('/')[1]?.toLowerCase();
      const fileNameArr = file.name.split('.');
      let extension = '';
      if (fileNameArr?.length > 1) {
        extension = fileNameArr[fileNameArr.length - 1]?.toLowerCase();
      }
      let extensionsString = '';
      if (extension) {
        for (const type of types) {
          extensionsString += type.toLowerCase() + ', ';
          if (type.toLowerCase() === extension) {
            return null;
          }
        }
        extensionsString = extensionsString.substring(
          0,
          extensionsString.length - 2
        );
      }
      return {
        requiredFileType: {
          requiredType: extensionsString,
          actualType: extension,
        },
      };
    }
    return null;
  };
}

export function noWhitespaceValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (value) {
      const isValid = value.length === value.trim().length;
      return isValid ? null : { whitespace: value };
    }
    return null;
  };
}

export const normalizeString = (str: string): string => {
  return (
    str
      ?.toLowerCase()
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '')
      .replace(/\s+/g, ' ') ?? ''
  );
};
