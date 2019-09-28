function valid(value: number | boolean | string, pattern?: Object) {
    let isValid = [];
    if (typeof value != "undefined") {
        if (pattern) {
            Object.keys(pattern).map(restriction => { 
                /* we need only "true" values */
                let result = executeFunctionByName(restriction, window, value, pattern[restriction])
                if(!result) throw new Error(`${restriction} hatasi!`)
            })
            /** Everything went correct , so we are fine [validation OK!] */
            return true;
        } else {
            /* Pattern is not exist ! So we dont need to do anything*/
            return true;
        }
    } else throw new Error("Value is not defined!");  
}


/** 
 * @param functionName 
     * @type string 
     * @desc atanan fonksiyon ismi
 * @param context 
     * @desc window nesnesi
 * @param arguments 
     * @type string | number | boolean 
     * @desc kontrol edilmesi istenen deger
 * @param objectValue 
     * @type boolean | number | string
     * @desc pattern e uygunluk kontrollrinin saglanmasi icin tanimlanan deger
 */
function executeFunctionByName(functionName, context , arguments , objectValue) {   
    return context[functionName].apply(context,[arguments, objectValue])
};

/**
 * The following functions are related to value limitations
 * @param value is the main element in our proccess.
 * @param objectValue value must be to equal to this
 */
function IsNumber(value, objectValue) {
    if ((value instanceof Number || typeof value === "number")){
      if(objectValue) return true
      else return false;
    } else {
      if(!objectValue) return true
      else return false;
    }
}

function IsString(value, objectValue) {
    if ((value instanceof String || typeof value === "string")) {
    if(objectValue) return true
      else return false;
    } else {
      if(!objectValue) return true
      else return false;
    }
}

valid("3", {IsNumber:false , IsString:true})