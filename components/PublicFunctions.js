export default class PublicFunctions {
    static logSomething = (content) => {
        console.log(content)
    }
    
    static uuid() {
        return '_' + Math.random().toString(36).substr(2, 9);
    }
}
