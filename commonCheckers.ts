'use strict'

export class Validator {

    private validatorJs = validator;

    // -------------------------------------------------------------------------
    // Validation Methods: common checkers
    // -------------------------------------------------------------------------
    
    /**
     * Checks if value is defined (!== undefined, !== null).
     */
    isDefined(value: any): boolean {
        return value !== undefined && value !== null;
    }
    
    /**
     * Checks if value matches ("===") the comparison.
     */
    equals(value: any, comparison: any): boolean {
        return value === comparison;
    }
    
    /**
     * Checks if value does not match ("!==") the comparison.
     */
    notEquals(value: any, comparison: any): boolean {
        return value !== comparison;
    }

    /**
     * Checks if given value is empty (=== '', === null, === undefined).
     */
    isEmpty(value: any): boolean {
        return value === "" || value === null || value === undefined;
    }
    
    /**
     * Checks if given value is not empty (!== '', !== null, !== undefined).
     */
    isNotEmpty(value: any): boolean {
        return value !== "" && value !== null && value !== undefined;
    }
    
    /**
     * Checks if given value is in a array of allowed values.
     */
    isIn(value: any, possibleValues: any[]): boolean {
        return !(possibleValues instanceof Array) || possibleValues.some(possibleValue => possibleValue === value);
    }
    
    /**
     * Checks if given value not in a array of allowed values.
     */
    isNotIn(value: any, possibleValues: any[]): boolean {
        return !(possibleValues instanceof Array) || !possibleValues.some(possibleValue => possibleValue === value);
    }
    
    // -------------------------------------------------------------------------
    // Validation Methods: type checkers
    // -------------------------------------------------------------------------
    
    /**
     * Checks if a given value is a real boolean.
     */
    isBoolean(value: any): boolean {
        return value instanceof Boolean || typeof value === "boolean";
    }
    
    /**
     * Checks if a given value is a real date.
     */
    isDate(value: any): boolean {
        return value instanceof Date && !isNaN(value.getTime());
    }
    
    /**
     * Checks if a given value is a real string.
     */
    isString(value: any): boolean {
        return value instanceof String || typeof value === "string";
    }
    
    /**
     * Checks if a given value is a ISOString date.
     */
    isDateString(value: any): boolean {
        const regex = /^\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|\+[0-2]\d(?:\:[0-5]\d)?)?$/g;
        return this.isString(value) && regex.test(value);
    }
    
    /**
     * Checks if a given value is an array
     */
    isArray(value: any): boolean {
        return value instanceof Array;
    }
    
    /**
     * Checks if a given value is an enum
     */
    isEnum(value: any, entity: any): boolean {
        const enumValues = Object.keys(entity)
            .map(k => entity[k]);
            return enumValues.indexOf(value) >= 0;
        }
        
        /**
         * Checks if a given value is a number.
         */
    isNumber(value: any, options: IsNumberOptions = {}): boolean {
        if (value === Infinity || value === -Infinity) {
            return options.allowInfinity;
        }
        
        if (Number.isNaN(value)) {
            return options.allowNaN;
        }
        
        return Number.isFinite(value);
    }
    
    /**
     * Checks if value is an integer.
     */
    isInt(val: number): boolean {
        return Number.isInteger(val);
    }
    
    // -------------------------------------------------------------------------
    // Validation Methods: number checkers
    // -------------------------------------------------------------------------
    
    /**
     * Checks if value is a number that's divisible by another.
     */
    isDivisibleBy(value: number, num: number): boolean {
        return  typeof value === "number" &&
        typeof num === "number" &&
        this.validatorJs.isDivisibleBy(String(value), num);
    }
    
    /**
     * Checks if the value is a positive number.
     */
    isPositive(value: number): boolean {
        return typeof value === "number" && value > 0;
    }
    
    /**
     * Checks if the value is a negative number.
     */
    isNegative(value: number): boolean {
        return typeof value === "number" && value < 0;
    }
    
    /**
     * Checks if the first number is greater than or equal to the second.
     */
    min(num: number, min: number): boolean {
        return typeof num === "number" && typeof min === "number" && num >= min;
    }
    
    /**
     * Checks if the first number is less than or equal to the second.
     */
    max(num: number, max: number): boolean {
        return typeof num === "number" && typeof max === "number" && num <= max;
    }
    
    // -------------------------------------------------------------------------
    // Validation Methods: date checkers
    // -------------------------------------------------------------------------
    
    /**
     * Checks if the value is a date that's after the specified date.
     */
    minDate(date: Date, minDate: Date): boolean {
        return date && date.getTime() >= minDate.getTime();
    }
    
    /**
     * Checks if the value is a date that's before the specified date.
     */
    maxDate(date: Date, maxDate: Date): boolean {
        return date && date.getTime() <= maxDate.getTime();
    }
    
    // -------------------------------------------------------------------------
    // Validation Methods: string-as-type checkers
    // -------------------------------------------------------------------------
    
    /**
     * Checks if a string is a boolean.
     * If given value is not a string, then it returns false.
     */
    isBooleanString(value: string): boolean {
        return typeof value === "string" && this.validatorJs.isBoolean(value);
    }
    
    /**
     * Checks if the string is numeric.
     * If given value is not a string, then it returns false.
     */
    isNumberString(value: string, options?: ValidatorJS.IsNumericOptions): boolean {
        return typeof value === "string" && this.validatorJs.isNumeric(value, options);
    }
    
    // -------------------------------------------------------------------------
    // Validation Methods: string checkers
    // -------------------------------------------------------------------------
    
    /**
     * Checks if the string contains the seed.
     * If given value is not a string, then it returns false.
     */
    contains(value: string, seed: string): boolean {
        return typeof value === "string" && this.validatorJs.contains(value, seed);
    }
    
    /**
     * Checks if the string does not contain the seed.
     * If given value is not a string, then it returns false.
     */
    notContains(value: string, seed: string): boolean {
        return typeof value === "string" && !this.validatorJs.contains(value, seed);
    }
    
    /**
     * Checks if the string contains only letters (a-zA-Z).
     * If given value is not a string, then it returns false.
     */
    isAlpha(value: string, locale?: ValidatorJS.AlphaLocale): boolean {
        return typeof value === "string" && this.validatorJs.isAlpha(value, locale);
    }
    
    /**
     * Checks if the string contains only letters and numbers.
     * If given value is not a string, then it returns false.
     */
    isAlphanumeric(value: string, locale?: ValidatorJS.AlphanumericLocale): boolean {
        return typeof value === "string" && this.validatorJs.isAlphanumeric(value, locale);
    }
    
    /**
     * Checks if the string is a valid decimal.
     * If given value is not a string, then it returns false.
     */
    isDecimal(value: string, options?: ValidatorJS.IsDecimalOptions): boolean {
        return typeof value === "string" && this.validatorJs.isDecimal(value, options);
    }
    
    
    /**
     * Checks if the string contains ASCII chars only.
     * If given value is not a string, then it returns false.
     */
    isAscii(value: string): boolean {
        return typeof value === "string" && this.validatorJs.isAscii(value);
    }
    
    /**
     * Checks if a string is base64 encoded.
     * If given value is not a string, then it returns false.
     */
    isBase64(value: string): boolean {
        return typeof value === "string" && this.validatorJs.isBase64(value);
    }
    
    /**
     * Checks if the string's length (in bytes) falls in a range.
     * If given value is not a string, then it returns false.
     */
    isByteLength(value: string, min: number, max?: number): boolean {
        return typeof value === "string" && this.validatorJs.isByteLength(value, min, max);
    }
    
    /**
     * Checks if the string is a credit card.
     * If given value is not a string, then it returns false.
     */
    isCreditCard(value: string): boolean {
        return typeof value === "string" && this.validatorJs.isCreditCard(value);
    }

    /**
     * Checks if the string is a valid currency amount.
     * If given value is not a string, then it returns false.
     */
    isCurrency(value: string, options?: ValidatorJS.IsCurrencyOptions): boolean {
        return typeof value === "string" && this.validatorJs.isCurrency(value, options);
    }
    
    /**
     * Checks if the string is an email.
     * If given value is not a string, then it returns false.
     */
    isEmail(value: string, options?: ValidatorJS.IsEmailOptions): boolean {
        return typeof value === "string" && this.validatorJs.isEmail(value, options);
    }
    
    /**
     * Checks if the string is a fully qualified domain name (e.g. domain.com).
     * If given value is not a string, then it returns false.
     */
    isFQDN(value: string, options?: ValidatorJS.IsFQDNOptions): boolean {
        return typeof value === "string" && this.validatorJs.isFQDN(value, options);
    }
    
    /**
     * Checks if the string contains any full-width chars.
     * If given value is not a string, then it returns false.
     */
    isFullWidth(value: string): boolean {
        return typeof value === "string" && this.validatorJs.isFullWidth(value);
    }
    
    /**
     * Checks if the string contains any half-width chars.
     * If given value is not a string, then it returns false.
     */
    isHalfWidth(value: string): boolean {
        return typeof value === "string" && this.validatorJs.isHalfWidth(value);
    }
    
    /**
     * Checks if the string contains variable-width chars.
     * If given value is not a string, then it returns false.
     */
    isVariableWidth(value: string): boolean {
        return typeof value === "string" && this.validatorJs.isVariableWidth(value);
    }

    /**
     * Checks if the string is a hexadecimal color.
     * If given value is not a string, then it returns false.
     */
    isHexColor(value: string): boolean {
        return typeof value === "string" && this.validatorJs.isHexColor(value);
    }
    
    /**
     * Checks if the string is a hexadecimal number.
     * If given value is not a string, then it returns false.
     */
    isHexadecimal(value: string): boolean {
        return typeof value === "string" && this.validatorJs.isHexadecimal(value);
    }
    
    /**
     * Checks if the string is an IP (version 4 or 6).
     * If given value is not a string, then it returns false.
     */
    isIP(value: string, version?: number): boolean {
        return typeof value === "string" && this.validatorJs.isIP(value, version);
    }
    
    /**
     * Check if the string is a valid port number.
     */
    isPort(value: string): boolean {
        return this.validatorJs.isPort(value);
    }
    
    /**
     * Checks if the string is an ISBN (version 10 or 13).
     * If given value is not a string, then it returns false.
     */
    isISBN(value: string, version?: number): boolean {
        return typeof value === "string" && this.validatorJs.isISBN(value, version);
    }
    
    /**
     * Checks if the string is an ISIN (stock/security identifier).
     * If given value is not a string, then it returns false.
     */
    isISIN(value: string): boolean {
        return typeof value === "string" && this.validatorJs.isISIN(value);
    }
    
    /**
     * Checks if the string is a valid ISO 8601 date.
     * If given value is not a string, then it returns false.
     */
    isISO8601(value: string): boolean {
        return typeof value === "string" && this.validatorJs.isISO8601(value);
    }
    
    /**
     * Checks if the string is valid JSON (note: uses JSON.parse).
     * If given value is not a string, then it returns false.
     */
    isJSON(value: string): boolean {
        return typeof value === "string" && this.validatorJs.isJSON(value);
    }
    
    /**
     * Checks if the string is lowercase.
     * If given value is not a string, then it returns false.
     */
    isLowercase(value: string): boolean {
        return typeof value === "string" && this.validatorJs.isLowercase(value);
    }
    
    /**
     * Checks if the string is a mobile phone number (locale is one of ['zh-CN', 'zh-TW', 'en-ZA', 'en-AU', 'en-HK',
     * 'pt-PT', 'fr-FR', 'el-GR', 'en-GB', 'en-US', 'en-ZM', 'ru-RU', 'nb-NO', 'nn-NO', 'vi-VN', 'en-NZ']).
     * If given value is not a string, then it returns false.
     */
    isMobilePhone(value: string, locale: ValidatorJS.MobilePhoneLocale): boolean {
        return typeof value === "string" && this.validatorJs.isMobilePhone(value, locale);
    }
    
    /**
     * Checks if the string is a valid phone number.
     * @param value the potential phone number string to test
     * @param {string} region 2 characters uppercase country code (e.g. DE, US, CH).
     * If users must enter the intl. prefix (e.g. +41), then you may pass "ZZ" or null as region.
     * See [google-libphonenumber, metadata.js:countryCodeToRegionCodeMap on github]{@link https://github.com/ruimarinho/google-libphonenumber/blob/1e46138878cff479aafe2ce62175c6c49cb58720/src/metadata.js#L33}
     */
    isPhoneNumber(value: string, region: string): boolean {
        try {
            const phoneNum = this.libPhoneNumber.phoneUtil.parseAndKeepRawInput(value, region);
            return this.libPhoneNumber.phoneUtil.isValidNumber(phoneNum);
        } catch (error) {
            // logging?
            return false;
        }
    }
    
    /**
     * Check if the string is a valid [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) officially assigned country code.
     */
    isISO31661Alpha2(value: string): boolean {
        return typeof value === "string" && this.validatorJs.isISO31661Alpha2(value);
    }
    
    /**
     * Check if the string is a valid [ISO 3166-1 alpha-3](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3) officially assigned country code.
     */
    isISO31661Alpha3(value: string): boolean {
        return typeof value === "string" && this.validatorJs.isISO31661Alpha3(value);
    }
    
    /**
     * Checks if the string is a valid hex-encoded representation of a MongoDB ObjectId.
     * If given value is not a string, then it returns false.
     */
    isMongoId(value: string): boolean {
        return typeof value === "string" && this.validatorJs.isMongoId(value);
    }
    
    /**
     * Checks if the string contains one or more multibyte chars.
     * If given value is not a string, then it returns false.
     */
    isMultibyte(value: string): boolean {
        return typeof value === "string" && this.validatorJs.isMultibyte(value);
    }
    
    /**
     * Checks if the string contains any surrogate pairs chars.
     * If given value is not a string, then it returns false.
     */
    isSurrogatePair(value: string): boolean {
        return typeof value === "string" && this.validatorJs.isSurrogatePair(value);
    }
    
    /**
     * Checks if the string is an url.
     * If given value is not a string, then it returns false.
     */
    isURL(value: string, options?: ValidatorJS.IsURLOptions): boolean {
        return typeof value === "string" && this.validatorJs.isURL(value, options);
    }
    
    /**
     * Checks if the string is a UUID (version 3, 4 or 5).
     * If given value is not a string, then it returns false.
     */
    isUUID(value: string, version?: "3"|"4"|"5"): boolean {
        return typeof value === "string" && this.validatorJs.isUUID(value, version);
    }
    
    /**
     * Checks if the string is uppercase.
     * If given value is not a string, then it returns false.
     */
    isUppercase(value: string): boolean {
        return typeof value === "string" && this.validatorJs.isUppercase(value);
    }
    
    /**
     * Checks if the string's length falls in a range. Note: this function takes into account surrogate pairs.
     * If given value is not a string, then it returns false.
     */
    length(value: string, min: number, max?: number): boolean {
        return typeof value === "string" && this.validatorJs.isLength(value, min, max);
    }
    
    /**
     * Checks if the string's length is not less than given number. Note: this function takes into account surrogate pairs.
     * If given value is not a string, then it returns false.
     */
    minLength(value: string, min: number) {
        return typeof value === "string" && this.length(value, min);
    }
    
    /**
     * Checks if the string's length is not more than given number. Note: this function takes into account surrogate pairs.
     * If given value is not a string, then it returns false.
     */
    maxLength(value: string, max: number) {
        return typeof value === "string" && this.length(value, 0, max);
    }
    
    /**
     * Checks if string matches the pattern. Either matches('foo', /foo/i) or matches('foo', 'foo', 'i').
     * If given value is not a string, then it returns false.
     */
    matches(value: string, pattern: RegExp, modifiers?: string): boolean {
        return typeof value === "string" && this.validatorJs.matches(value, pattern, modifiers);
    }
    
    /**
     * Checks if the string represents a time without a given timezone in the format HH:MM (military)
     * If the given value does not match the pattern HH:MM, then it returns false.
     */
    isMilitaryTime(value: string): boolean {
        return this.matches(value, /^([01]\d|2[0-3]):?([0-5]\d)$/);
    }
    
    // -------------------------------------------------------------------------
    // Validation Methods: array checkers
    // -------------------------------------------------------------------------
    
    /**
     * Checks if array contains all values from the given array of values.
     * If null or undefined is given then this function returns false.
     */
    arrayContains(array: any[], values: any[]) {
        if (!(array instanceof Array))
        return false;
        
        return !array || values.every(value => array.indexOf(value) !== -1);
    }
    
    /**
     * Checks if array does not contain any of the given values.
     * If null or undefined is given then this function returns false.
     */
    arrayNotContains(array: any[], values: any[]) {
        if (!(array instanceof Array))
        return false;
        
        return !array || values.every(value => array.indexOf(value) === -1);
    }
    
    /**
     * Checks if given array is not empty.
     * If null or undefined is given then this function returns false.
     */
    arrayNotEmpty(array: any[]) {
        if (!(array instanceof Array))
        return false;
        
        return array instanceof Array && array.length > 0;
    }
    
    /**
     * Checks if array's length is as minimal this number.
     * If null or undefined is given then this function returns false.
     */
    arrayMinSize(array: any[], min: number) {
        if (!(array instanceof Array))
        return false;
        
        return array instanceof Array && array.length >= min;
    }

    /**
     * Checks if array's length is as maximal this number.
     * If null or undefined is given then this function returns false.
     */
    arrayMaxSize(array: any[], max: number) {
        if (!(array instanceof Array))
        return false;
        
        return array instanceof Array && array.length <= max;
    }
    
    /**
     * Checks if all array's values are unique. Comparison for objects is reference-based.
     * If null or undefined is given then this function returns false.
     */
    arrayUnique(array: any[]) {
        if (!(array instanceof Array))
        return false;
        
        const uniqueItems = array.filter((a, b, c) => c.indexOf(a) === b);
        return array.length === uniqueItems.length;
    }
    
    /**
     * Checks if the value is an instance of the specified object.
     */
    isInstance(object: any, targetTypeConstructor: new (...args: any[]) => any) {
        return targetTypeConstructor
        && typeof targetTypeConstructor === "function"
        && object instanceof targetTypeConstructor;
    }
    
}
