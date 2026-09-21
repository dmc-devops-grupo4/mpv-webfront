export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  errors?: Array<any>
}
