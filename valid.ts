function valid(value: number | boolean | string, pattern?: Object) {
    let isValid = [];
    if (typeof value != "undefined") {
        if (pattern) {
            Object.keys(pattern).map((restriction : string) => {                
                /* if inside of object any value is false, its useless, so we ignore that value*/
                if (typeof pattern[restriction] == "boolean" && !pattern[restriction]) return delete pattern[restriction];
                /* we need only "true" values */
                let result = executeFunctionByName(restriction, window, value)
                if(!result) throw new Error(`${restriction} hatasi!`)
            })
        /** Everything went correct , so we are fine [validation OK!] */
            console.log('Everything is OK!');
            return true;
        } else {
            /* Pattern is not exist ! So we dont need to do anything*/
            console.log('Pattern yok');
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
function executeFunctionByName(functionName, context , arguments ) {   
    return context[functionName].apply(context,[arguments])
};

/**
 * The following functions are related to value limitations
 * @param value is the main element in our proccess.
 */
function IsNumber(value) {
    if (value instanceof Number || typeof value === "number") return true
      else return false;
}

function IsString(value) {
    if (value instanceof String || typeof value === "string") return true
    else return false;    
}

valid("3", {IsNumber:false , IsString:true})