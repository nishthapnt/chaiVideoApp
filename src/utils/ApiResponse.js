class ApiResponse {
    constructor(statusCode, data , message = "Success") {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
        this.success = statusCode<400; //study response codes and why above 500 is sent by error
    }
}

export { ApiResponse };