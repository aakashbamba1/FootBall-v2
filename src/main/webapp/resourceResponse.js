class resourceResponse{
    /**
     * create new instance of resourceResponse
     * 
     * @param {boolean} error boolean value repersting, if there is any error 
     * occured while processing request
     * @param {string} msg response message
     * @param {Array} data resource response data
     */
    
    constructor(error, msg, data){
        this.error = error;
        this.msg = msg;
        this.data = data;
    }
}