let a = (a, e)=>a.match(/^[0-9a-fA-F]{24}$/) ? a : e.message('"{{#label}}" must be a valid mongo id'), e = (a, e)=>a.length < 8 ? e.message("password must be at least 8 characters") : a.match(/\d/) && a.match(/[a-zA-Z]/) ? a : e.message("password must contain at least 1 letter and 1 number");
export { a as objectId, e as password };
